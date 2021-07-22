import express from 'express';
import * as userController from '../controller/userController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';
const Router = express.Router();

Router.route('/login').post(userController.authUser);
Router.route('/profile').get(
   authMiddleware.protect,
   userController.getUserPorfile
);
Router.route('/').post(userController.signUp);
Router.route('/profile').put(
   authMiddleware.protect,
   userController.updateProfile
);

export default Router;
