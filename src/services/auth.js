import http from "../http-common";
import TokenService from "./refresh-token";

class AuthServices {

    login(user) {
        return http.post("/auth/v1/signin", {
            userName: user.userName,
            password: user.password,
            typeAccount: user.typeAccount
        })
            .then(response => {
                TokenService.setUser(response.data);
                return response.data;
            })
    }

    logout() {
        TokenService.removeUser();
    }

    register(user) {
        return http.post("/auth/v1/signup", {
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            password: user.password,
            typeUser: {id: user.typeUserId}
        });
    }

    sendVerificationMail(data) {
        return http.post("/auth/v1/sendemail", data);
    }

    generateOtp(data){
        return http.post("/auth/v1/generateotp", data)
    }

    processResetPassword(data){
        return http.post("/auth/v1/resetpassword", data)
    }

    createFacebookAuthorization(){
        return http.get("/auth/v1/createFacebookAuthorization")
    }

    createFacebookAccessToken(code){
        return http.get("/auth/v1/facebook?code="+ code)
    }

    loginGoogle(code){
        return http.get("/auth/v1/google?code="+ code)
    }

    countAccess(){
        return http.get("/auth/v1/countAccess")
    }

    showCount(){
        return http.get("/auth/v1/showCount")
    }
}

export default new AuthServices();
