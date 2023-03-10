import http from "../http-common";

class TypeUserService {
    list() {
        return http.get("/user/v1/bank");
    }

    addBank(data) {
        return http.post("/user/v1/bank", data);
    }

    findBankById(id) {
        return http.get("/user/v1/bank" + `/${id}`);
    }

    deleteBank(id) {
        return http.delete("/user/v1/bank" + `/${id}`);
    }
}

export default new TypeUserService();
