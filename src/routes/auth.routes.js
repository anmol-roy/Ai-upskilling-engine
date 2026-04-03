const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controllers');
const authUser = require('../middleware/auth.middleware');


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


/**
 * @route GET /api/auth/logout
 * @desc Logout a user by blacklisting the token
 * 
 **/ 
authRouter.get('/logout', authController.logoutUser );

/**
 * @route GET /api/auth/get-me
 * @desc Get the currently logged-in user's information
 * 
 **/ 
// Change authController.authUser to just authUser
authRouter.get('/get-me', authUser, authController.getMe );

 



module.exports = authRouter;

