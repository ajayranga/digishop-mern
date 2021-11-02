import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Name is required"],
      minLength: 4,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: [true, "Email Must be Unique"],
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
userSchema.methods.matchPass = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};
userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);
  next();
});
const User = mongoose.model("User", userSchema);

export default User;
