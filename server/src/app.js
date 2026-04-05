const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}))

// require all the routes here
const authRouter = require('./routes/auth.routes.js');
// using all the routes here
app.use('/api/auth', authRouter);

module.exports = app;
