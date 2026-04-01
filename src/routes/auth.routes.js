const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controllers');


/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * 
 **/ 
authRouter.post('/register', authController.registerUser );

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * 
 **/ 
authRouter.post('/login', authController.loginUser );





module.exports = authRouter;

