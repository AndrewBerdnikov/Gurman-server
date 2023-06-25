const ApiError = require('../error/ApiError');
const RecipeModel = require('../models/RecipeModel');
const FavoritesModel = require('../models/FavoritesModel');

class FavoritesController {
    async postFavorites(req, res, next) {
        try {
            const {userId, recipeId} = req.body;
            if(!userId || !recipeId) {
                return next(ApiError.badRequest("id пользователя или id рецепта не найдены"));
            }

            let favoritesPost = new FavoritesModel(userId, recipeId);

            let favoritesPostCheck = await FavoritesModel.getOneFavorites(userId, recipeId);
            if(favoritesPostCheck[0].length > 0) {
                return next(ApiError.badRequest("Рецепт есть в избранном"));
            }

            favoritesPost = await favoritesPost.createFavorites();

            res.status(200).json({message: "Рецепт добавлен в избранное"});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в добавлении избранного"));
        }
    }

    async getFavorites(req, res, next) {
        try {
            let resultFavorites = {};
            const {userId} = req.query;

            let favorites = await FavoritesModel.getAllFavorites(userId);
            // if(favorites[0].length == 0) {
            //     return next(ApiError.badRequest("Избранные не найдены"));
            // }  

            // console.log(favorites[0])

            // favorites[0].map((recipeId) => {
            //     RecipeModel.getRecipeById(recipeId.recipe_id).then(data => console.log(data[0]));    
            // })

            res.json(favorites[0]);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении избрнных"));
        }
    }

    async deleteFavorites(req, res, next) {
        try {
            const {userId, recipeId} = req.body;
            if(!userId || !recipeId) {
                return next(ApiError.badRequest("Не указан id пользователя или id рецепта"));
            }

            let favoritesPostCheck = await FavoritesModel.getOneFavorites(userId, recipeId);
            if(favoritesPostCheck[0].length > 0) {
                return next(ApiError.badRequest("Рецепта нет в избранном"));
            }

            const [recipe, _] = await FavoritesModel.deleteFavorites(userId, recipeId);

            res.json({message: "Рецепт успешно удален из избранного"});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в удалении избранного"));
        }
    }
}

module.exports = new FavoritesController();