import http from "../http-common";

class DoDienTuService {
    list(entity,params) {
        return http.get("/dodientu/v1"+`/${entity}`,{ params: params });
    }

    findByID(entity,params,id) {
        return http.get("/dodientu/v1"+`/${entity}` + `/${id}`,{ params: params });
    }

    add(entity,data) {
        return http.post("/dodientu/v1"+`/${entity}`, data);
    }

    findByParentId(entity,parent,params,id) {
        return http.get("/dodientu/v1"+`/${entity}`+`/${parent}`+`/${id}`);
    }

    delete(entity,id) {
        return http.delete("/dodientu/v1"+`/${entity}` + `/${id}`);
    }
}

export default new DoDienTuService();
