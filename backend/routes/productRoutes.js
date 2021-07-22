import express from 'express';
import * as productController from '../controller/productController.js';
const Router = express.Router();

Router.route('/').get(productController.fetchProducts);
Router.route('/:id').get(productController.fetchProductById);

export default Router;
