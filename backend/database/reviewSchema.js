import mongoose from 'mongoose';

export const reviewSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         trim: true,
         lowercase: true,
         required: [true, 'Name is required'],
      },
      rating: {
         type: Number,
         default: 0,
         required: [true, 'Email is required'],
      },
      comment: {
         type: String,
         trim: true,
      },
   },
   { timestamps: true },
   {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
   }
);

export const Review = mongoose.model('Review', reviewSchema);
