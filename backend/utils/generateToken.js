import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = async (_id) => {
   return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
export default generateToken;
