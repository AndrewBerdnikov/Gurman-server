const db = require('../db');

class RecipeModel {
    constructor({userId, title, img, description, generatedd}) {
        this.userId = userId;
        this.title = title;
        this.img = img;
        this.video = '';
        this.description = description;
        this.generatedd = generatedd;
    }

    async createRecipe() {
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

    static getAllRecipe() {
        const sql = `SELECT * FROM recipe WHERE img != '';`;

        return db.query(sql);
    }

    static getRecipeByTitle(title) {
        const sql = `SELECT * FROM recipe WHERE title = '${title}' AND img != '';`;

        return db.query(sql);
    }

    static getRecipeById(recipeId) {
        const sql = `SELECT * FROM recipe WHERE id = '${recipeId}' AND img != '';`;

        return db.query(sql);
    }

    static getRecipeByDate(date) {
        const sql = `SELECT * FROM recipe WHERE generatedd <= '${date}' AND img != '';`;

        return db.query(sql);
    }

    static deleteRecipeByTitle(title) {
        const sql = `DELETE FROM recipe WHERE title = '${title}' AND img != '';`;

        return db.query(sql);
    }
}

module.exports = RecipeModel;