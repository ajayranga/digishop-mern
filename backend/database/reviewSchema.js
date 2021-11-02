import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Name is required"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      required: [true, "Email is required"],
    },
    comment: {
      type: String,
      trim: true,
      required: [true, "Comment is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User field  is required"],
    },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Review = mongoose.model("Review", reviewSchema);
