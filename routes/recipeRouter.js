const Router = require('express');
const router = new Router();
const recipeController = require('../controllers/recipeController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addRecipe', authMiddleware, recipeController.postRecipe); //Добавление рецепта
router.get('/getRecipes', recipeController.getRecipes) //Получение рецептов
router.get('/getOneRecipe/:title', recipeController.getRecipeByTitle); //Получение одного рецепта
router.get('/getRecipeById', recipeController.getRecipeById); //Получении рецепта по id
router.get('/getRecipeForFavorites', recipeController.getRecipeForFavorites); //Получение избранных рецептов для пользователя
router.delete('/deleteRecipe/:title', authMiddleware, recipeController.deleteRecipe) //Удаление рецепта

module.exports = router;