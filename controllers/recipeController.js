const RecipeModel = require('../models/RecipeModel');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class RecipeController {
    async postRecipe(req, res, next) {
       try {
            const {userId, title, video, description, generatedd} = req.body;
            const img = req.files.img;

            if(!img) {
                return next(ApiError.badRequest('Файл изображения не найден'));
            }

            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            let recipe = new RecipeModel({userId, title, img: fileName, video, description, generatedd});

            recipe = await recipe.createRecipe();

            res.status(201).json({recipe});
       } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в добавлении рецепта"));
       } 
    }

    async getRecipes(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 1000;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            let [recipe, _] = await RecipeModel.getAllRecipe();

            const resultsRecipe = {}

            if(endIndex < recipe.length) {
                resultsRecipe.next = {
                    page: page + 1,
                    limit: limit
                }
            }
            
            if(startIndex > 0) {
                resultsRecipe.previous = {
                    page: page - 1,
                    limit: limit
                }
            }

            resultsRecipe.results = recipe.slice(startIndex, endIndex);

            resultsRecipe.totalCount = recipe.length;

            res.status(200).json(resultsRecipe);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении рецептов"))
        } 
    }

    async getRecipeByTitle(req, res, next) {
        try {
            const recipeTitle = req.params.title;

            const [recipe, _] = await RecipeModel.getRecipeByTitle(recipeTitle);

            res.status(200).json(recipe);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении рецепта по названию"));
        } 
    }

    async getRecipeById(req, res, next) {
        try {
            const {recipeId} = req.query;

            const [recipe, _] = await RecipeModel.getRecipeById(recipeId);

            res.status(200).json(recipe);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении рецепта по id"));
        }
    }

    async getRecipeForFavorites(req, res, next) {
        try {
            
        } catch (error) {
            
        }
    }

    async deleteRecipe(req, res, next) {
        try {
            const recipeTitle = req.params.title;

            const recipe = await RecipeModel.deleteRecipeByTitle(recipeTitle);

            res.status(200).json({message: "Рецепт успешно удален"})
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в удалении рецепта"));
        } 
     }
}

module.exports = new RecipeController();