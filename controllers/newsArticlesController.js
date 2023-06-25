const NewsArticlesModel = require('../models/NewsArticlesModel');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class NewsArticlesController {
    async postNews(req, res, next) {
        try {
            const {userId, title, info, news_articles, generatedd} = req.body;
            const img = req.files.img;

            if(!img) {
                return next(ApiError.badRequest('Файл изображения не найден'));
            }

            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));


            let news = new NewsArticlesModel({userId, title, img: fileName, info, news_articles, generatedd});

            news = await news.createNewsOrActicles();

            res.status(200).json({message: "Успешно добавили новость"});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении новости"));
        }
    }

    async postArticles(req, res, next) {
        try {
            const {userId, title, info, news_articles, generatedd} = req.body;
            const img = req.files.img;
           
            if(!img) {
                return next(ApiError.badRequest('Файл изображения не найден'));
            }

            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            let articles = new NewsArticlesModel({userId, title, img: fileName, info, news_articles, generatedd});

            articles = await articles.createNewsOrActicles();

            res.status(200).json({message: "Успешно добавили статью"});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в добавлении статьи"));
        }
    }

    async getNews(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 1000;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const [news, _] = await NewsArticlesModel.getNewsArticles(1);
        
            const resultsNews = {}

            if(endIndex < news.length) {
                resultsNews.next = {
                    page: page + 1,
                    limit: limit
                }
            }
            
            if(startIndex > 0) {
                resultsNews.previous = {
                    page: page - 1,
                    limit: limit
                }
            }

            resultsNews.results = news.slice(startIndex, endIndex);


            res.status(200).json(resultsNews);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении новостей"))
        }
    }

    async getArticles(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 1000;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const [articles, _] = await NewsArticlesModel.getNewsArticles(0);

            const resultsArticles = {}

            if(endIndex < articles.length) {
                resultsArticles.next = {
                    page: page + 1,
                    limit: limit
                }
            }
            
            if(startIndex > 0) {
                resultsArticles.previous = {
                    page: page - 1,
                    limit: limit
                }
            }

            resultsArticles.results = articles.slice(startIndex, endIndex);
            
            res.status(200).json(resultsArticles);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении статей"));
        }
    }

    async getOneNews(req, res, next) {
        try {
            const newsTitle = req.params.title; 

            const [news, _] = await NewsArticlesModel.getNewsArticlesByTitle(1, newsTitle);

            res.status(200).json(news);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении новости"))
        }
    }

    async getOneArticles(req, res, next) {
        try {
            const articleTitle = req.params.title;

            const [article, _] = await NewsArticlesModel.getNewsArticlesByTitle(0, articleTitle);

            res.status(200).json(article);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении статьи"));
        }
    }

    async deleteNews(req, res, next) {
        try {
            const newsTitle =  req.params.title;

            const [news, _] = await NewsArticlesModel.deleteNewsArticles(1, newsTitle);

            res.status(200).json({message: "Новость успешно удалена"});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в удалении новости"));
        }
    }

    async deleteArticles(req, res, next) {
        try {
            const articleTitle = req.params.title;

            const [article, _] = await NewsArticlesModel.deleteNewsArticles(0, articleTitle);

            res.status(200).json({message: "Статья успешно удалена"});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в удалении статьи"));
        }
    }
}

module.exports = new NewsArticlesController();