const Router = require('express');
const router = new Router();
const raitingCommentsController = require('../controllers/raitingCommentsController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addRaiting', authMiddleware, raitingCommentsController.postRaiting); //Запостить рейтинг
router.post('/addComment', authMiddleware, raitingCommentsController.postComment); //Запостить коммент
router.get('/getRaiting', raitingCommentsController.getRaiting); //Получить рейтинг
router.get('/getComments', raitingCommentsController.getComments); //Получить комментарии

module.exports = router;