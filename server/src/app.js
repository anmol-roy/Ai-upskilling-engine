const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this for form data
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}))

// require all the routes here
const authRouter = require('./routes/auth.routes.js');
const interviewRouter = require('./routes/intervew.routes.js');
// using all the routes here
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

module.exports = app;
