const TvShowModel = require('../models/TvShowModel');
const ApiError = require('../error/ApiError');

class TvShowController {
    async postShow(req, res, next) {
        try {
            const {userId, title, img, info, generatedd} = req.body;

            let tvShow = new TvShowModel({userId, title, img, info, generatedd});

            tvShow = await tvShow.createTvShow();
            
            res.status(200).json({message: "Шоу успешно добавлено"});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в добавлении шоу"))
        }
    }

    async getShow(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 1000;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const [tvShow, _] = await TvShowModel.getTvShow();

            const resultsTvShow = {}

            if(endIndex < tvShow.length) {
                resultsTvShow.next = {
                    page: page + 1,
                    limit: limit
                }
            }
            
            if(startIndex > 0) {
                resultsTvShow.previous = {
                    page: page - 1,
                    limit: limit
                }
            }

            resultsTvShow.results = tvShow.slice(startIndex, endIndex);

            res.status(200).json(resultsTvShow);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении шоу"))
        }
    }

    async getOneShow(req, res, next) {
        try {
            const tvShowTitle = req.params.title;

            const [tvShow, _] = await TvShowModel.findTvShowByTitle(tvShowTitle);

            res.status(200).json(tvShow);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении шоу по названию"))
        }
    }

    async deleteShow(req, res, next) {
        try {
            const tvShowTitle = req.params.title;

            const tvShow = await TvShowModel.deleteShow(tvShowTitle);

            res.status(200).json({message: "Шоу успешно удалено"});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в удалении шоу"));
        }
    }
}

module.exports = new TvShowController();