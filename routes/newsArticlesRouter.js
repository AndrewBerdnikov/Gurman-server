const Router = require('express');
const router = new Router();
const newsArticlesController = require('../controllers/newsArticlesController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addNews', authMiddleware, newsArticlesController.postNews); //Добавление новости
router.post('/addArticles', authMiddleware, newsArticlesController.postArticles); //Добавление статьи
router.get('/getNews', newsArticlesController.getNews); //Получение новостей
router.get('/getArticles', newsArticlesController.getArticles); //Получение новостей
router.get('/getOneNews/:title', newsArticlesController.getOneNews); //Получение одной новости
router.get('/getOneArticles/:title', newsArticlesController.getOneArticles); //Получение одной статьи
router.delete('/deleteNews/:title', authMiddleware, newsArticlesController.deleteNews); //Удаление новости
router.delete('/deleteArticles/:title', authMiddleware, newsArticlesController.deleteArticles); //Удаление статьи

module.exports = router;