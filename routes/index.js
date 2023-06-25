const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const newsArticlesRouter = require('./newsArticlesRouter');
const favoritesRouter = require('./favoritesRouter');
const raitingCommentsRouter = require('./raitingCommentRouter');
const recipeInfoRouter = require('./recipeInfoRouter');
const recipeRouter = require('./recipeRouter');
const tvShowRouter = require('./tvShowRouter');
const videoRecipeRouter = require('./VideoRecipeRouter');

router.use('/user', userRouter); //Маршрут для пользователя
router.use('/news-articles', newsArticlesRouter); //Маршрут для статей-новостей
router.use('/raiting-comment', raitingCommentsRouter); //Маршрут для комментариев-рейтинга
router.use('/favorites', favoritesRouter); //Маршрут для избранных
router.use('/recipe', recipeRouter); //Маршрут для рецептов
router.use('/video-recipe', videoRecipeRouter); //Маршрут для видеорецептов
router.use('/tv-show', tvShowRouter); //Маршрут для передач
router.use('/recipe-info', recipeInfoRouter); //Маршрут для информации о рецептах

module.exports = router;