import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
(() => {
   mongoose
      .connect(process.env.MONGO_URI_LOCAL || process.env.MONGO_URI, {
         useNewUrlParser: true,
         useCreateIndex: true,
         useFindAndModify: true,
         useUnifiedTopology: true,
      })
      .then(() => {
         console.log('Successfully connected to MongoDb');
      })
      .catch((err) => {
         console.log(`Error Connecting to MongoDb ${err}`);
      });
})();
