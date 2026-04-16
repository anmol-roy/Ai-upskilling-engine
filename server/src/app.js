import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRouter from './routes/auth.routes.js';
import interviewRouter from './routes/intervew.routes.js';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this for form data
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}))

// using all the routes here
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

export default app;
