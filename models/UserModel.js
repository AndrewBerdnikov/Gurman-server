const db = require('../db');

class UserModel {
    constructor({name, password, email, img, role}) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.img = img;
        this.role = role;
    }

    async createUser() {
        let sql = `INSERT INTO user (
            name,
            password,
            email
        )
        VALUES (
            '${this.name}',
            '${this.password}',
            '${this.email}'
        )
        `;

        const newUser = await db.query(sql);

        return newUser;
    }

    static findOne(email) {
        let sql = `SELECT * FROM user WHERE email = '${email}';`;

        return db.query(sql);
    }

    static findUserById(userId) {
        const sql = `SELECT * FROM user WHERE id = ${userId};`;

        return db.query(sql);
    }
}

module.exports = UserModel;