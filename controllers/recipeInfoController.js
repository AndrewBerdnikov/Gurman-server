const RecipeInfoModel = require('../models/RecipeInfoModel');
const ApiError = require('../error/ApiError');

class RecipeInfoController {
    async postMainInfo(req, res, next) {
        try {
            const {recipeId, kitchen, categories, time_of_day, holiday} = req.body;

            let mainInfo = new RecipeInfoModel({recipeId, kitchen, categories, time_of_day, holiday});

            mainInfo = await mainInfo.addMainInfo(recipeId, kitchen, categories, time_of_day, holiday);

            res.status(200).json({message: "Успешно добавили main-info"});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в добавлении main-info"));
        }
    }

    async postFastInfo(req, res, next) {
        try {
            const {recipeId, recipeFor, preparation, cookingTime} = req.body;

            let fastInfo = new RecipeInfoModel({recipeId, recipeFor, preparation, cookingTime});

            fastInfo = await fastInfo.addFastInfo(recipeId, recipeFor, preparation, cookingTime);

            res.status(200).json({message: "Успешно добавили fast-info"});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в добавлении fast-info"));
        }
    }

    async postProducts(req, res, next) {
        try {
            const {name} = req.body;

            let product = new RecipeInfoModel();

            product = await product.addProducts(name);

            res.status(200).json({message: "Добавлен новый продукт"});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в добавлении продукта"));
        }
    }

    async postStructure(req, res, next) {
        try {
            const {recipeId, productsId, value} = req.body;

            const [product_id, _] = await RecipeInfoModel.getProductsIdByName(productsId);
            console.log(product_id);

            let structure = new RecipeInfoModel();

            structure = await structure.addStructure(recipeId, product_id[0].id, value);

            res.status(200).json({message: "Структура успешно добавлена"});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в добавлении структуры"));
        }
    }

    async postSteps(req, res, next) {
        try {
            const {recipeId, img, steps} = req.body;

            let step = new RecipeInfoModel();

            step = await step.addSteps(recipeId, img, steps);

            res.status(200).json({message: "Шаг успешно добавлен"});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в добавлении шага"));
        }
    }

    async getMainInfo(req, res, next) {
        try {
            const {recipeId} = req.query;

            const [mainInfo, _] = await RecipeInfoModel.getMainInfo(recipeId);

            res.status(200).json(mainInfo);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении main-info"));
        }
    }

    async getFastInfo(req, res, next) {
        try {
            const {recipeId} = req.query;

            const [fastInfo, _] = await RecipeInfoModel.getFastInfo(recipeId);

            res.status(200).json(fastInfo);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении fast-info"));
        }
    }

    async getProducts(req, res, next) {
        try {
            const {productsId} = req.query;

            const [products, _] = await RecipeInfoModel.getProducts(productsId);

            res.status(200).json(products);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest('Ошибка в получении products'));
        }
    }

    async getStructure(req, res, next) {
        try {
            const {recipeId} = req.query;

            const [structure, _] = await RecipeInfoModel.getStructure(recipeId);

            res.status(200).json(structure);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении структуры"));
        }
    }

    async getSteps(req, res, next) {
        try {
            const {recipeId} = req.query;

            const [steps, _] = await RecipeInfoModel.getSteps(recipeId);

            res.status(200).json(steps);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении шагов"));
        }
    }

    async getRecipeByCategories(req, res, next) {
        try {
            const {categories} = req.body;

            const [recipesId, _] = await RecipeInfoModel.getRecipeByCategories(categories);

            res.status(200).json(recipesId);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении рецепта по категории"))
        }
    }

    async getRecipeByKitchen(req, res, next) {
        try {
            const {kitchen} = req.body;

            const [recipeId, _] = await RecipeInfoModel.getRecipeByKitchen(kitchen);

            res.status(200).json(recipeId);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении рецепта по кухне"));
        }
    }

    async getRecipeByTime(req, res, next) {
        try {
            const {time} = req.body;
            
            const [recipeId, _] = await RecipeInfoModel.getRecipeByTime(time);

            res.status(200).json(recipeId);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении рецепта по времени"));
        }
    }

    async getRecipeByTimeOfDay(req, res, next) {
        try {
            const {timeOfDay} = req.body;

            const [recipeId, _] = await RecipeInfoModel.getRecipeByTimeOfDay(timeOfDay);

            res.status(200).json(recipeId);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении рецепта по времени дня"));
        }
    }

    async  getRecipeByHoliday(req, res, next) {
        try {
            const {holiday} = req.body;

            const [recipeId, _] = await RecipeInfoModel.getRecipeByHoliday(holiday);

            res.status(200).json(recipeId)
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении рецепта по празднику"));
        }
    }

    async  getRecipeByProduct(req, res, next) {
        try {
            const {productId} = req.query;

            const [recipeId, _] = await RecipeInfoModel.getRecipeByProduct(productId);

            res.status(200).json(recipeId);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в получении рецепта по продукту"));
        }
    }
}

module.exports = new RecipeInfoController();