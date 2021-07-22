import asyncHandler from 'express-async-handler';
import Product from '../database/productSchema.js';

export const fetchProducts = asyncHandler(async (req, res) => {
   const products = await Product.find({});
   res.json(products);
});

export const fetchProductById = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const product = await Product.findById(id);
   if (product) res.status(200).json(product);
   else {
      res.status(404);
      throw new Error('Product not found');
   }
});
