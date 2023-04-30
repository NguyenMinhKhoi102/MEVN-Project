import createApiClient from "./api.service";

class CustomerService {
    constructor(baseUrl = "/api/customer") {
        this.api = createApiClient(baseUrl);
    }
    async signUp(data) {
        return (await this.api.post("/signup", data)).data;
    }
    async signIn(data) {
        return (await this.api.post("/signin", data)).data;
    }
    async signOut() {
        return (await this.api.post("/signout")).data;
    }
    async findAll() {
        return (await this.api.get("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
}

export default new CustomerService;