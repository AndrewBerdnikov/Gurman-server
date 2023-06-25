const Router = require('express');
const router = new Router();
const tvShowController = require('../controllers/tvShowController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addShow', authMiddleware, tvShowController.postShow); //Добавление шоу
router.get('/getShows', tvShowController.getShow); //Получение шоу
router.get('/getOneShow/:title', tvShowController.getOneShow); //Получение одного шоу
router.delete('deleteShow/:title', authMiddleware, tvShowController.deleteShow); //Удаление шоу

module.exports = router;