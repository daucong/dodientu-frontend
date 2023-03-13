import http from "../http-common";

class UserService {
    list() {
        return http.get("/user/v1");
    }

    addUser(data) {
        return http.post("/user/v1", data);
    }

    findUserById(id) {
        return http.get("/user/v1" + `/${id}`);
    }

    deleteUser(id) {
        return http.delete("/user/v1" + `/${id}`);
    }

    updateUserPassword(data) {
        return http.post("/user/v1/password", data);
    }

    recharge(data) {
        return http.post("/user/v1/checkRecharge", data);
    }

    payment(data) {
        return http.post("/user/v1/payment", data);
    }

    payPost(data) {
        return http.post("/user/v1/payPost", data);
    }

    plushPost(data) {
        return http.post("/user/v1/plushPost", data);
    }
}

export default new UserService();
