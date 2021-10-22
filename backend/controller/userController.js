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

export const getUserProfile = asyncHandler(async (req, res) => {
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

export const updateProfileByAdmin = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id);
   if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role ? req.body.role : user.role;
      const updatedUser = await user.save();
      res.status(200).json({
         _id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         role: updatedUser.role,
      });
   } else {
      res.status(404);
      throw new Error('User Not found');
   }
});

export const getAllUsers = asyncHandler(async (req, res) => {
   try {
      const allUsers = await User.find();
      res.status(201).json(allUsers);
   } catch (error) {
      res.status(404);
      throw new Error(error.message);
   }
});

export const getUserById = asyncHandler(async (req, res) => {
   try {
      const users = await User.findById(req.params.id).select('-password');
      if (user) res.status(201).json(users);
      else res.status(404);
      throw new Error('No user Found');
   } catch (error) {
      res.status(404);
      throw new Error(error.message);
   }
});

export const deleteUser = asyncHandler(async (req, res) => {
   try {
      const users = await User.findById(req.params.id);
      users.remove();
      res.status(201).json({ message: 'User Removed' });
   } catch (error) {
      res.status(404);
      throw new Error(error.message);
   }
});
