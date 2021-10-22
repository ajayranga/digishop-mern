import express, { Route } from 'express';
import * as userController from '../controller/userController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';
const Router = express.Router();

Router.route('/login').post(userController.authUser);
Router.route('/profile').get(
   authMiddleware.protect,
   userController.getUserProfile
);
Router.route('/').post(userController.signUp);
Router.route('/').get(
   authMiddleware.protect,
   authMiddleware.isAdmin,
   userController.getAllUsers
);
Router.route('/profile').put(
   authMiddleware.protect,
   userController.updateProfile
);
Router.route('/:id').delete(
   authMiddleware.protect,
   authMiddleware.isAdmin,
   userController.deleteUser
);
Router.route('/:id').get(
   authMiddleware.protect,
   authMiddleware.isAdmin,
   userController.getUserById
);
Router.route('/:id').put(
   authMiddleware.protect,
   authMiddleware.isAdmin,
   userController.updateProfileByAdmin
);

export default Router;
