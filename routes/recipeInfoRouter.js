const Router = require('express');
const router = new Router();
const recipeInfoController = require('../controllers/recipeInfoController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/postMainInfo', authMiddleware, recipeInfoController.postMainInfo); //Добавление main_info
router.post('/postFastInfo', authMiddleware, recipeInfoController.postFastInfo); //Добавление fast_info
router.post('/postProducts', authMiddleware, recipeInfoController.postProducts); //Добавление products
router.post('/postStructure', authMiddleware, recipeInfoController.postStructure); //Добавление structure
router.post('/postSteps', authMiddleware, recipeInfoController.postSteps); //Добавление steps

router.get('/getMainInfo', recipeInfoController.getMainInfo); //Получение main_info
router.get('/getFastInfo', recipeInfoController.getFastInfo); //Получение одного fast_info
router.get('/getProducts', recipeInfoController.getProducts); //Получениe products
router.get('/getStructure', recipeInfoController.getStructure); //Получение structure
router.get('/getSteps', recipeInfoController.getSteps); //Получение steps
router.get('/getRecipeByCategories', recipeInfoController.getRecipeByCategories); //Получение рецепта по категории
router.get('/getRecipeByKitchen', recipeInfoController.getRecipeByKitchen); //Получение рецепта по кухне
router.get('/getRecipeByTime', recipeInfoController.getRecipeByTime); //Получение рецепта по времени готовки
router.get('/getRecipeByTimeOfDay', recipeInfoController.getRecipeByTimeOfDay); //Получение рецепта по времени дня (обед, ужин)
router.get('/getRecipeByHoliday', recipeInfoController.getRecipeByHoliday); //Получение рецепта на праздники
router.get('/getRecipeByProduct', recipeInfoController.getRecipeByProduct); //Получение рецепта по продуктам 

module.exports = router;