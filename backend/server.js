import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import './utils/dbConnect.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.get('/', (req, res) => {
   return res.send('API is running');
});

app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);

app.use((req, res, next) => {
   const error = new Error(`Not Found -${req.originalUrl}`);
   res.status(404);
   next(error);
});

app.use((err, req, res, next) => {
   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
   console.log(err);
   res.status(statusCode);
   res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
   });
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
   console.log(
      `Backend running in ${process.env.NODE_ENV} environment on port ${port}`
   )
);
