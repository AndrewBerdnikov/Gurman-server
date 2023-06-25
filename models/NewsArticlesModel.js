const db = require('../db');

class NewsArticlesModel {
    constructor({userId, title, img, info, news_articles, generatedd}) {
        this.userId = userId;
        this.title = title;
        this.img = img;
        this.info = info;
        this.news_articles = news_articles;
        this.generatedd = generatedd;
    }

    async createNewsOrActicles() {
        let sql = `INSERT INTO news_articles(
            user_id,
            title,
            img,
            info,
            news_articles,
            generatedd
        )
        VALUE (
            '${this.userId}',
            '${this.title}',
            '${this.img}',
            '${this.info}',
            '${this.news_articles}',
            '${this.generatedd}'
        )
        `;

        const newNewsArticles = db.query(sql);

        return newNewsArticles;
    }

    static getNewsArticles(check) {
        if (check == true) {
            const sql = `SELECT * FROM news_articles WHERE news_articles = 1;`;

            return db.query(sql);
        }
        const sql = `SELECT * FROM news_articles WHERE news_articles = 0;`;

        return db.query(sql);
    }

    static getNewsArticlesByTitle(check, title) {
        if (check == true) {
            const sql = `SELECT * FROM news_articles WHERE title = '${title}';`;

            return db.query(sql);
        }
        const sql = `SELECT * FROM news_articles WHERE title = '${title}';`;

        return db.query(sql);
    }

    static getNewsArticlesByDate(check, date) {
        if (check == true) {
            const sql = `SELECT * FROM news_aticles WHERE generatedd <= '${date}';`;

            return db.query(sql);
        }
        const sql = `SELECT * FROM news_articles WHERE generatedd = '${date}';`;

        return db.query(sql);
    }

    static deleteNewsArticles(check, title) {
        if (check == true) {
            const sql = `DELETE FROM news_aticles WHERE title = '${title}';`;

            return db.query(sql);
        }
        const sql = `DELETE FROM news_articles WHERE title = '${title}';`;

        return db.query(sql);
    }
}

module.exports = NewsArticlesModel;