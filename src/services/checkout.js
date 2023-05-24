import http from "../http-common";

class checkoutService {

    listDetail(params) {
        return http.get("/dodientu/v1/checkout/detail", {params: params});
    }

    list() {
        return http.get("/dodientu/v1/checkout");
    }

    findByID(id) {
        return http.get("/dodientu/v1/checkout" + `/${id}`);
    }

    add(data) {
        return http.post("/dodientu/v1/checkout", data);
    }

    addDetail(data) {
        return http.post("/dodientu/v1/checkout/detail", data);
    }

    delete(id) {
        return http.delete("/dodientu/v1/checkout" + `/${id}`);
    }

    deleteDetail(id) {
        return http.delete("/dodientu/v1/checkout/detail" + `/${id}`);
    }

    setStatus(data) {
        return http.post("/dodientu/v1/checkout/setStatus", data);
    }

    findByIdDetail(id) {
        return http.get("/dodientu/v1/checkout/detailId/" + `/${id}`);
    }
}

export default new checkoutService();
