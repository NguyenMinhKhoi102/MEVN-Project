import createApiClient from "./api.service";

class ProductService {
    constructor(baseUrl = "/api/product") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post("/", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })).data;
    }
    async all() {
        return (await this.api.get("/")).data;
    }
    async update(id, data) {
        return (await this.api.patch(`/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new ProductService;