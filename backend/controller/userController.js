import asyncHandler from 'express-async-handler';
import User from '../database/userSchema.js';
import generateToken from '../utils/generateToken.js';

export const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   if (!email || !password) {
      res.status(400);
      throw new Error('Email and password are required');
   } else {
      const user = await User.findOne({ email });
      if (user) {
         if (await user.matchPass(password)) {
            res.status(200).json({
               _id: user._id,
               name: user.name,
               email: user.email,
               role: user.role,
               token: await generateToken(user._id),
            });
         } else {
            res.status(401);
            throw new Error('Incorrect password');
         }
      } else {
         res.status(401);
         throw new Error(`No user exist with email ${email}`);
      }
   }
});

export const getUserPorfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);
   if (user) {
      res.status(200).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         role: user.role,
      });
   } else {
      res.status(404);
      throw new Error('User Not found');
   }
});

export const signUp = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;
   if (!email || !password || !name) {
      res.status(400);
      throw new Error('Name, Email and password are required');
   } else {
      const userExist = await User.findOne({ email });
      if (userExist) {
         res.status(400);
         throw new Error('Email Already registered');
      } else {
         try {
            const newUser = new User({ name, email, password });
            const userData = await newUser.save();
            res.status(201).json({
               _id: userData._id,
               name: userData.name,
               email: userData.email,
               role: userData.role,
               token: await generateToken(userData._id),
            });
         } catch (error) {
            console.log(error);
            res.status(400);
            throw new Error('Invalid details');
         }
      }
   }
});

export const updateProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);
   if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) user.password = req.body.password;
      const updatedUser = await user.save();
      res.status(200).json({
         _id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         role: updatedUser.role,
         token: await generateToken(updatedUser._id),
      });
   } else {
      res.status(404);
      throw new Error('User Not found');
   }
});
