const VideoRecipeModel = require('../models/VideoRecipeModel');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class RecipeController {
    async postVideoRecipe(req, res, next) {
       try {
            const {userId, title, img, video, description, generatedd} = req.body;

            let videoRecipe = new VideoRecipeModel({userId, title, img, video, description, generatedd});

            videoRecipe = await videoRecipe.createVideoRecipe(userId, title, img, video, description, generatedd);

            res.status(200).json({message: "Видеорецепт успешно добавлен"});
       } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в добавлении видеорецепта"));
       } 
    }

    async getVideoRecipes(req, res, next) {
        try {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            let [videoRecipe, _] = await VideoRecipeModel.getAllVideoRecipe();

            const resultsVideoRecipe = {}

            if(endIndex < videoRecipe.length) {
                resultsVideoRecipe.next = {
                    page: page + 1,
                    limit: limit
                }
            }
            
            if(startIndex > 0) {
                resultsVideoRecipe.previous = {
                    page: page - 1,
                    limit: limit
                }
            }

            resultsVideoRecipe.results = videoRecipe;

            res.status(200).json(resultsVideoRecipe);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении видеорецептов"));
        } 
    }

    async getVideoRecipeByTitle(req, res, next) {
        try {
            const videoRecipeTitle = req.params.title;

            const [videoRecipe, _] = await VideoRecipeModel.getVideoRecipeByTitle(videoRecipeTitle);

            res.status(200).json(videoRecipe);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении видеорецепта по названию"));
        } 
    }

    async getVideoRecipeById(req, res, next) {
        try {
            const videoRecipeId  = req.params.id;

            const [videoRecipe, _] = await VideoRecipeModel.getVideoRecipeById(videoRecipeId);

            res.status(200).json(videoRecipe);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении рецепта по id"));
        }
    }

    async deleteVideoRecipe(req, res, next) {
        try {
            const videoRecipeTitle = req.params.title;

            const videoRecipe = await VideoRecipeModel.deleteVideoRecipeByTitle(videoRecipeTitle);

            res.status(200).json({message: "Видеорецепт успешно удален"});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в удалении рецепта"));
        } 
     }
}

module.exports = new RecipeController();