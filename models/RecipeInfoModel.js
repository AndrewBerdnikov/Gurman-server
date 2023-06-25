const db = require('../db');

class RecipeInfoModel {
    async addMainInfo(recipeId, kitchen, categories, time_of_day, holiday) {
        const sql = `INSERT INTO main_info (
            recipe_id,
            kitchen,
            categories,
            time_of_day,
            holiday
        )
        VALUE (
            '${recipeId}',
            '${kitchen}',
            '${categories}',
            '${time_of_day}',
            '${holiday}'
        )
        `;

        const newMainInfo = db.query(sql);

        return newMainInfo;
    }

    async addFastInfo(recipeId, recipeFor, preparation, cookingTime) {
        const sql = `INSERT INTO fast_info(
            recipe_id,
            recipe_for,
            preparation,
            cooking_time
        )
        VALUE (
            '${recipeId}',
            '${recipeFor}',
            '${preparation}',
            '${cookingTime}'
        )
        `;

        const newFastInfo = db.query(sql);

        return newFastInfo;
    }

    async addProducts(name) {
        const sql = `INSERT INTO products(
            name
        )
        VALUE (
            '${name}'
        )
        `;

        const newProducts = db.query(sql);

        return newProducts;
    }

    async addStructure(recipeId, productsId, value) {
        const sql = `INSERT INTO structure(
            recipe_id,
            products_id,
            value
        )
        VALUE (
            '${recipeId}',
            '${productsId}',
            '${value}'
        )
        `

        const newStructure = db.query(sql);

        return newStructure;
    }

    async addSteps(recipeId, img, steps) {
        const sql = `INSERT INTO steps(
            recipe_id,
            img,
            steps
        )
        VALUE (
            '${recipeId}',
            '${img}',
            '${steps}'
        )
        `

        const newStep = db.query(sql);

        return newStep;
    }

    static getMainInfo(recipeId) {
        const sql = `SELECT * FROM main_info WHERE recipe_id = '${recipeId}';`;

        return db.query(sql);
    }

    static getFastInfo(recipeId) {
        const sql = `SELECT * FROM fast_info WHERE recipe_id = '${recipeId}';`;

        return db.query(sql);
    }

    static getProducts(productsId) {
        const sql = `SELECT * FROM products WHERE id = ${productsId};`;

        return db.query(sql);
    }

    static getProductsIdByName(name) {
        const sql = `SELECT id FROM products WHERE name = '${name}';`;

        return db.query(sql);
    }

    static getStructure(recipeId) {
        const sql = `SELECT * FROM structure WHERE recipe_id = '${recipeId}';`;

        return db.query(sql);
    }

    static getSteps(recipeId) {
        const sql = `SELECT * FROM steps WHERE recipe_id = '${recipeId}';`;

        return db.query(sql);
    }

    static getRecipeByCategories(categories) {
        const sql = `SELECT recipe_id FROM main_info WHERE categories = '${categories}';`;

        return db.query(sql);
    }

    static getRecipeByKitchen(kitchen) {
        const sql = `SELECT recipe_id FROM main_info WHERE categories = '${kitchen}';`;

        return db.query(sql);
    }

    static getRecipeByTime(time) {
        const sql = `SELECT recipe_id FROM fast_info WHERE cooking_time <= '${time}';`;

        return db.query(sql);
    }

    static getRecipeByTimeOfDay(timeOfDay) {
        const sql = `SELECT recipe_id FROM main_info WHERE time_of_day = '${timeOfDay}';`;

        return db.query(sql);
    }

    static getRecipeByHoliday(holiday) {
        const sql = `SELECT recipe_id FROM main_info WHERE holiday= '${holiday}';`;

        return db.query(sql);
    }

    static getRecipeByProduct(product) {
        const sql = `SELECT recipe_id FROM product WHERE name = '${product}';`;

        return db.query(sql);
    }
}

module.exports = RecipeInfoModel;