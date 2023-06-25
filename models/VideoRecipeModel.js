const db = require('../db');

class VideoRecipeModel {
    constructor({userId, title, video, description, generatedd}) {
        this.userId = userId;
        this.title = title;
        this.img = '';
        this.video = video;
        this.description = description;
        this.generatedd = generatedd;
    }

    async createVideoRecipe() {
        let sql = `INSERT INTO recipe (
            user_id,
            title,
            img,
            video,
            description,
            generatedd
        )
        VALUE (
            '${this.userId}',
            '${this.title}',
            '${this.img}',
            '${this.video}',
            '${this.description}',
            '${this.generatedd}'
        )
        `;

        const newRecipe= db.query(sql);

        return newRecipe;
    }

    static getAllVideoRecipe() {
        const sql = `SELECT * FROM recipe WHERE video != '';`;

        return db.query(sql);
    }

    static getVideoRecipeByTitle(title) {
        const sql = `SELECT * FROM recipe WHERE title = '${title}' AND video != '';`;

        return db.query(sql);
    }

    static getVideoRecipeById(recipeId) {
        const sql = `SELECT * FROM recipe WHERE id = '${recipeId}' AND video != '';`;

        return db.query(sql);
    }

    static getVideoRecipeByDate(date) {
        const sql = `SELECT * FROM recipe WHERE generatedd <= '${date}' AND video != '';`;

        return db.query(sql);
    }

    static deleteVideoRecipeByTitle(title) {
        const sql = `DELETE FROM recipe WHERE title = '${title}' AND video != '';`;

        return db.query(sql);
    }
}

module.exports = VideoRecipeModel;