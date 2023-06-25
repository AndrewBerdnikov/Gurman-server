const db = require('../db');

class TvShowModel {
    constructor({userId, title, img, info, generatedd}) {
        this.userId = userId;
        this.title = title;
        this.img = img;
        this.info = info;
        this.generatedd = generatedd;
    }

    async createTvShow() {
        let sql = `INSERT INTO tv_show(
            user_id,
            title,
            img,
            info,
            generatedd
        )
        VALUE (
            '${this.userId}',
            '${this.title}',
            '${this.img}',
            '${this.info}',
            '${this.generatedd}'
        )
        `;

        const newTvShow = db.query(sql);

        return newTvShow;
    }

    static getTvShow() {
        const sql = `SELECT * FROM tv_show;`;

        return db.query(sql);
    }

    static findTvShowByTitle(title) {
        const sql = `SELECT * FROM tv_show WHERE title = '${title}';`;

        return db.query(sql);
    }

    static findTvShowByDate(date) {
        const sql = `SELECT * FROM tv_show WHERE generatedd <= '${date}';`;

        return db.query(sql);
    }

    static deleteShow(title) {
        const sql = `DELETE FROM tv_show;`;

        return db.query(sql);
    }
}

module.exports = TvShowModel;