import http from "../http-common";

class CartService {
    list() {
        return http.get("/dodientu/v1/cart");
    }

    findByPostId(data) {
        return http.post("/dodientu/v1/cart/post", data);
    }

    addCart(data) {
        return http.post("/dodientu/v1/cart", data);
    }

    findCartById(id) {
        return http.get("/dodientu/v1/cart" + `/${id}`);
    }

    deleteCart(id) {
        return http.delete("/dodientu/v1/cart" + `/${id}`);
    }
}

export default new CartService();
