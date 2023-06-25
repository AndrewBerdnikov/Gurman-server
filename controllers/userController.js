require('dotenv').config();
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const FavoritesModel = require('../models/FavoritesModel');

const generateJwt = (id, name, email, role) => {
    return jwt.sign({id, name, email, role}, process.env.SECRET_KEY);
}

class UserController {
    async registration(req, res, next) {
        try {
            const {name, password, email, role} = req.body;
            if(!email || !password) {
                return next(ApiError.badRequest("Неверная почта или пароль"));
            }

            const hashPassword = await bcrypt.hash(password, 5);

            let user = new UserModel({name, password: hashPassword, email, role});
            user = await user.createUser();
            let [userInfo, _] = await UserModel.findOne(email);

            let favorites = new FavoritesModel({userId: user[0].id});

            let token = generateJwt(userInfo[0].id, name, email, userInfo[0].role);

            res.status(200).json({token});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка при регистрации пользователя"));
        }
    }

    
    async login(req, res, next) {
        try {
            const {email, password} = req.body;

            let [user, _] = await UserModel.findOne(email);
            if(user.length == 0) {
                return next(ApiError.badRequest("Пользователя не существует"));
            }

            let comparePassword = bcrypt.compareSync(password, user[0].password);
            if(!comparePassword) {
                return next(ApiError.badRequest("Неверная почта или пароль"));
            }

            const token = generateJwt(user[0].id, user[0].name, user[0].email, user[0].role);

            res.status(200).json({token});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка при логине"));
        }
    }

    
    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.name, req.user.email, req.user.role);

            res.status(200).json({token});
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest("Ошибка в проверке"));
        }
    }

    async getUserById(req, res, next) {
        try {
            const {userId} = req.query;

            const [user, _] = await UserModel.findUserById(userId);

            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            next(ApiError.badRequest('Потльзователь не найден'));
        }
    }
}

module.exports = new UserController();