const Router = require('express');
const router = new Router();
const favoritesController = require('../controllers/favoritesController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addFavorites', authMiddleware, favoritesController.postFavorites); //Добавление избранного
router.get('/getFavorites', favoritesController.getFavorites); //Получение любимых
router.delete('/deleteFavorites/:name', authMiddleware, favoritesController.deleteFavorites); //Удаление любимых

module.exports = router;