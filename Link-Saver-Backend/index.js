import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import bcrypt from 'bcryptjs';
import userRoute from './routes/user.route.js';
import linkRoute from './routes/link.route.js';

dotenv.config({});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const corsOptions = {
    origin:'https://link-saver-auto-summary-xi.vercel.app',//This will allow request from any origin
    method:['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
};

app.use(cors(corsOptions));


app.use("/api/v1/user", userRoute);
app.use("/api/v1/link", linkRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`)});
