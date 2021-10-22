import mongoose from 'mongoose';
import { reviewSchema } from './reviewSchema.js';
const productSchema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User',
      },
      name: {
         type: String,
         trim: true,
         lowercase: true,
         required: [true, 'Name is required'],
         minLength: 4,
      },
      image: {
         type: String,
         trim: true,
         required: [true, 'Image is required'],
      },
      brand: {
         type: String,
         trim: true,
         required: [true, 'Email is required'],
      },
      description: {
         type: String,
         trim: true,
      },
      category: {
         type: String,
         trim: true,
      },
      price: {
         type: Number,
         required: true,
         default: 0,
      },
      rating: {
         type: Number,
         required: true,
         default: 0,
      },
      reviews: [reviewSchema],
      numReviews: {
         type: Number,
         default: 0,
      },
      countInStock: {
         type: Number,
         default: 0,
      },
   },
   { timestamps: true },
   {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
   }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
