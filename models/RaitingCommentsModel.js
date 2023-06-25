const db = require('../db');

class RaitingCommentsModel {
    constructor(userId, recipeId) {
        this.userId = userId;
        this.recipeId = recipeId;
    }

    async addComment(comment) {
        let sql = `INSERT INTO raiting_comment(
            user_id,
            recipe_id,
            comment
         ) VALUE (
             '${this.userId}',
             '${this.recipeId}',
             '${comment}'
         )
         `;
 
         return db.query(sql);
    }

    async addRaiting(raiting) {
        let sql = `INSERT INTO raiting_comments(
            user_id,
            recipe_id,
            raiting
         ) VALUE (
             '${this.userId}',
             '${this.recipeId}',
             '${raiting}'
         )
         `;

        return db.query(sql);
    }

    static getComments(recipeId) {
        let sql = `SELECT * FROM raiting_comment WHERE recipe_id = ${recipeId};`;

        return db.query(sql);
    }

    static getRaiting(recipeId) {
        let sql = `SELECT raiting FROM raiting_comment WHERE recipe_id = ${recipeId};`;

        return db.query(sql);
    }

    static findUserIdForComment(userId, recipeId) {
        let sql = `SELECT comment FROM raiting_comment WHERE user_id = ${userId} AND recipe_id = ${recipeId};`;

        return db.query(sql);
    }

    static findUserIdForRaiting(userId, recipeId) {
        let sql = `SELECT raiting FROM raiting_comment WHERE user_id = ${userId} AND recipe_id = ${recipeId};`;

        return db.query(sql);
    }
}

module.exports = RaitingCommentsModel;