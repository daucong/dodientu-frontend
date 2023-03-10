import http from "../http-common";
import TokenService from "./refresh-token";
import swal from "sweetalert";
const setup = (store) => {
    http.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
                // config.headers["x-access-token"] = token; // for Node.js Express back-end
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    http.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;

            if (originalConfig.url !== "/auth/v1/signin" && err.response) {
                // Access Token was expired
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const rs = await http.post("/auth/v1/refreshtoken", {
                            refreshToken: TokenService.getLocalRefreshToken(),
                        });

                        const { accessToken } = rs.data;

                        store.dispatch('auth/refreshToken', accessToken);
                        TokenService.updateLocalAccessToken(accessToken);

                        return http(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
                if (err.response.status === 403 || err.response.status === 500){
                    TokenService.setUser(null)
                    swal({
                        text: this.$t('message.swal.tokenExpires'),
                        icon: this.$t('message.swal.icon.warning'),
                        timer: 5000,
                    })
                    window.location.assign("http://localhost:8081/login")
                }
            }
            return Promise.reject(err);
        }
    );
};

export default setup;