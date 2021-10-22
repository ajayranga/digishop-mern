import asyncHandler from 'express-async-handler';
import Product from '../database/productSchema.js';

export const fetchProducts = asyncHandler(async (req, res) => {
   const products = await Product.find({});
   res.status(200).json(products);
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

export const deleteProductById = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const product = await Product.findById(id);
   if (product) {
      await product.remove();
      res.status(200).json({ message: 'Product Removed' });
   } else {
      res.status(404);
      throw new Error('Product not found');
   }
});

export const createProduct = asyncHandler(async (req, res) => {
   try {
      const product = new Product({
         name: 'Sample Name',
         price: 0,
         user: req.user._id,
         image: '/images/sample.jpg',
         brand: 'Sample Brand',
         category: 'sample',
         countInStock: 0,
         numReviews: 0,
         description: 'sample',
      });
      const createProduct = await product.save();
      res.status(201).json(createProduct);
   } catch (error) {
      res.status(404);
      throw new Error(error);
   }
});

export const updateProduct = asyncHandler(async (req, res) => {
   const product = Product.findById(req.params.id);
   if (product) {
      product.name = req.body.name && req.body.name;
      product.price = req.body.price && req.body.price;
      product.image = req.body.image && req.body.image;
      product.brand = req.body.brand && req.body.brand;
      product.category = req.body.category && req.body.category;
      product.countInStock = req.body.countInStock && req.body.countInStock;
      product.numReviews = req.body.numReviews && req.body.numReviews;
      product.description = req.body.description && req.body.description;

      const updatedProduct = await product.save();
      res.status(201).json(updatedProduct);
   } else {
      res.status(404);
      throw new Error('Product not found');
   }
});
