const { ObjectId } = require("mongodb");
const bcrypt = require('bcryptjs');

class AdminService {
    constructor(client) {
        this.Admin = client.db().collection("admin");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API 
    extractAdminData(payload) {
        const admin = {
            username: payload.username,
            password: bcrypt.hashSync(payload.password, 8),
        }
        // Loại bỏ những trường không không được định nghĩa
        Object.keys(admin).forEach(
            (key) => admin[key] === undefined && delete admin[key]
        );
        return admin;
    }

    async signUp(payload) {
        const admin = this.extractAdminData(payload);
        return await this.Admin.insertOne(admin);
    }

    async findByUsername(username) {
        return await this.Admin.findOne({ username: username });
    }

    async signIn(payload) {
        const admin = await this.findByUsername(payload.username);

        if (!admin)
            return admin;

        const passwordIsValid = bcrypt.compareSync(payload.password, admin.password);

        if (passwordIsValid)
            return admin;
        return passwordIsValid;
    }

    async addToken(id, token) {

        const result = await this.Admin.updateOne(
            { _id: new ObjectId(id) },
            { $set: { token: token } }
        );
        return result.modifiedCount > 0;
    }

    async deleteToken(id, token) {
        const result = await this.Admin.updateOne(
            { _id: new ObjectId(id), token: token },
            { $unset: { token: 1 } }
        );
        return result.modifiedCount > 0;
    }
}
module.exports = AdminService;