const Router = require('express');
const router = new Router();
const videoRecipeController = require('../controllers/videoRecipeController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addVideoRecipe', authMiddleware, videoRecipeController.postVideoRecipe); //Добавление рецепта
router.get('/getVideoRecipes', videoRecipeController.getVideoRecipes) //Получение рецептов
router.get('/getOneVideoRecipe/:title', videoRecipeController.getVideoRecipeByTitle); //Получение одного рецепта
router.get('/getVideoRecipeById', videoRecipeController.getVideoRecipeById); //Получении рецепта по id
router.delete('/deleteVideoRecipe/:title', authMiddleware, videoRecipeController.deleteVideoRecipe) //Удаление рецепта

module.exports = router;