const db = require('../db');

class FavoritesModel {
    constructor(userId, recipeId) {
        this.userId = userId;
        this.recipeId = recipeId;
    }

    async createFavorites() {
        let sql = `INSERT INTO favorites(
            user_id,
            recipe_id
        )
        VALUE (
            '${this.userId}',
            '${this.recipeId}'
            )
        `;

        const newFavorites = await db.query(sql);

        return newFavorites;
    }

    static getAllFavorites(userId) {
        let sql = `SELECT recipe_id FROM favorites WHERE user_id = '${userId}';`;

        return db.query(sql);
    }

    static getOneFavorites(userId, recipeId) {
        let sql = `SELECT * FROM favorites WHERE user_id = ${userId} AND recipe_id = ${recipeId};`;

        return db.query(sql);
    }

    static deleteFavorites(userId, recipeId) {
        let sql = `DELETE FROM favorites WHERE user_id = ${userId} AND recipe_id = ${recipeId};`;

        return db.query(sql);
    }
}

module.exports = FavoritesModel;