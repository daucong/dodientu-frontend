import http from "../http-common";

class TypeUserService {
    list() {
        return http.get("/user/v1/type");
    }

    addTypeUser(data) {
        return http.post("/user/v1/type", data);
    }

    findTypeUserById(id) {
        return http.get("/user/v1/type" + `/${id}`);
    }

    deleteTypeUser(id) {
        return http.delete("/user/v1/type" + `/${id}`);
    }
}

export default new TypeUserService();
