import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './database/userSchema.js';
import Product from './database/productSchema.js';
import Order from './database/orderSchema.js';

import './utils/dbConnect.js';

dotenv.config();

const importData = async () => {
   try {
      await Order.deleteMany();
      await Product.deleteMany();
      await User.deleteMany();

      const createdUsers = await User.insertMany(users);
      const adminUser = createdUsers[0]._id;
      const sampleProducts = products.map((product) => {
         return { ...product, user: adminUser };
      });
      await Product.insertMany(sampleProducts);
      console.log('Data imported!!!!!!!!!!');
      process.exit();
   } catch (err) {
      console.error(err);
      process.exit();
   }
};
const destroyData = async () => {
   try {
      await Order.deleteMany();
      await Product.deleteMany();
      await User.deleteMany();
      console.log('Data deleted!!!!!!!!!!');
      process.exit();
   } catch (err) {
      console.error(err);
      process.exit();
   }
};
if (process.argv[2] === '-d') destroyData();
else importData();
