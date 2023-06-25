const RaitingCommentsModel = require('../models/RaitingCommentsModel');
const ApiError = require('../error/ApiError');

class RaitingCommentsController {
    async postRaiting(req, res, next) {
        try {
            const {userId, recipeId, raiting} = req.body;

            if(!userId || !recipeId) {
                return next(ApiError.badRequest("Не удалось найти id пользователя или id рецепта"));
            }

            let [checkRaiting, _] = await RaitingCommentsModel.findUserIdForRaiting(userId, recipeId);
            if(checkRaiting.lenght != 0) {
                return next(ApiError.badRequest("Рейтинг не добавлен"));
            }

            let newRaiting = new RaitingCommentsModel(userId, recipeId);
            newRaiting = await newRaiting.addRaiting(raiting);

            res.json({message: "Рейтинг успешно добавлен"});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в добавлении рейтинга"));
        }
    }

    async postComment(req, res, next) {
        try {
            const {userId, recipeId, comment} = req.body;

            if(!userId || !recipeId) {
                return next(ApiError.badRequest("Не удалось найти id пользователя или id рецепта"));
            }

            let[checkComment, _] = await RaitingCommentsModel.findUserIdForComment(userId, recipeId);
            // if(checkComment.lenght != 0) {
            //     return next(ApiError.badRequest("Комментарий к рецепту уже оставлен"));
            // }

            let newComment = new RaitingCommentsModel(userId, recipeId);
            newComment = await newComment.addComment(comment);

            res.status(200).json({message: "Комментарий успешно оставлен"});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в добавлении комментария"));
        }
    }

    async getRaiting(req, res, next) {
        try {
            const {recipeId} = req.query;
            if(!recipeId) {
                return next(ApiError.badRequest("Фильма с таким id не существует"));
            }

            let [allRaiting, _] = await RaitingCommentsModel.getRaiting(recipeId);

            let countRaiting = 0;
            let raiting = 0;

            for(let i = 0; i< allRaiting.length; i++) {
                if(allRaiting[i].raiting == null) continue;
                raiting += allRaiting[i].raiting;
                countRaiting++;
            }
            raiting = raiting / countRaiting;
            
            res.json(raiting);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении рейтинга"));
        }
    }

    async getComments(req, res, next) {
        try {
            const {recipeId} = req.query;
            if(!recipeId) {
                return next(ApiError.badRequest("Фильма с таким id не существует"));
            }

            let [comments, _] = await RaitingCommentsModel.getComments(recipeId);
            // if(comments.length == 0) {
            //     return next('Комментариев нет');
            // } 

            res.json(comments);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении комментариев"))
        }
    }
}

module.exports = new RaitingCommentsController();