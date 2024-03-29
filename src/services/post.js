import http from "../http-common";

class PostService {
    userURL = 'http://localhost:8080/api/user/v1/';

    list(params) {
        return http.get("/dodientu/v1/post", {params: params});
    }

    listAdmin(params) {
        return http.get("/dodientu/v1/post/admin", {params: params});
    }

    getAllByUserId(params) {
        return http.get("/dodientu/v1/post/user", {params: params});
    }

    findByID(params, id) {
        return http.get("/dodientu/v1/post" + `/${id}`, {params: params});
    }

    findByTitle(title) {
        return http.get("/dodientu/v1/post/detail?title="+ title);
    }

    add(data) {
        return http.post("/dodientu/v1/post", data);
    }

    approve(params, id) {
        return http.get("/dodientu/v1/post/approve" + `/${id}`, {params: params});
    }

    addImage(data) {
        return http.post("/dodientu/v1/postimage", data);
    }

    delete(id) {
        return http.delete("/dodientu/v1/post" + `/${id}`);
    }

    getUserSurplus(params) {
        return http.get("/dodientu/v1/post/user/surplus", {params: params});
    }

    quantityByProvince(id) {
        return http.get("/dodientu/v1/post/quantity-byprovince/" + id);
    }

    countAccess(id) {
        return http.post("/dodientu/v1/post/countAccess", id);
    }

    subtractCheckout(data) {
        return http.post("/dodientu/v1/post/subtractCheckout", data);
    }

    plusCheckout(data) {
        return http.post("/dodientu/v1/post/plusCheckout", data);
    }

    countPostByMount() {
        return http.get("/dodientu/v1/post/post-by-mounth");
    }

    countPostByProvince() {
        return http.get("/dodientu/v1/post/post-by-province");
    }

    countPostByCategory() {
        return http.get("/dodientu/v1/post/post-by-category");
    }

    findByReportToDuyet() {
        return http.get("/dodientu/v1/post/reportToDuyet");
    }

}

export default new PostService();
