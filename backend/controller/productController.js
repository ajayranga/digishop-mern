import asyncHandler from "express-async-handler";
import Product from "../database/productSchema.js";
import mongoose from "mongoose";

export const fetchProducts = asyncHandler(async (req, res) => {
  const pageSize = 6;
  const pageNumber = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const counts = await Product.countDocuments(keyword);
  const products = await Product.find(keyword)
    .limit(pageSize)
    .skip(pageSize * (pageNumber - 1));
  res.status(200).json({
    products,
    pages: Math.ceil(counts / pageSize),
    pageSize,
    pageNumber,
  });
});

export const fetchProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) res.status(200).json(product);
  else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const deleteProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    await product.remove();
    res.status(200).json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = new Product({
      name: "Sample Name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.png",
      brand: "Sample Brand",
      category: "sample",
      countInStock: 0,
      numReviews: 0,
      description: "sample",
    });
    const createProduct = await product.save();
    res.status(201).json(createProduct);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = req.body.name && req.body.name;
    product.price = req.body.price && req.body.price;
    product.image = req.body.image && req.body.image;
    product.brand = req.body.brand && req.body.brand;
    product.category = req.body.category && req.body.category;
    product.countInStock = req.body.countInStock && req.body.countInStock;
    product.description = req.body.description && req.body.description;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const addReviewProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { rating, comment } = req.body;
  if (product) {
    const isAlreadyReviewed = product.reviews.find(
      (review) =>
        review.user && review.user._id.toString() === req.user._id.toString()
    );
    if (isAlreadyReviewed) {
      throw new Error("Product already reviewed");
    } else {
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: mongoose.Types.ObjectId(req.user._id),
      };
      console.log(product.reviews, review);
      product.reviews.push(review);
      const updatedProduct = await product.save();
      res.status(201).json({ message: "Review Added" });
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4);
  res.status(200).json(products);
});
