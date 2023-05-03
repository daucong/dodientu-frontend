import http from "../http-common";

class CategoryService {
    list() {
        return http.get("/dodientu/v1/category");
    }

    addCategory(data) {
        return http.post("/dodientu/v1/category", data);
    }

    findCategoryById(id) {
        return http.get("/dodientu/v1/category" + `/${id}`);
    }

    deleteCategory(id) {
        return http.delete("/dodientu/v1/category" + `/${id}`);
    }
}

export default new CategoryService();
