import express from 'express';
import { registerUser, loginUser, logoutUser, getMe } from '../controllers/auth.controllers.js';
import authUser from '../middleware/auth.middleware.js';

const authRouter = express.Router();


/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * 
 **/ 
authRouter.post('/register', registerUser );

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * 
 **/ 
authRouter.post('/login', loginUser );


/**
 * @route GET /api/auth/logout
 * @desc Logout a user by blacklisting the token
 * 
 **/ 
authRouter.get('/logout', logoutUser );

/**
 * @route GET /api/auth/get-me
 * @desc Get the currently logged-in user's information
 * 
 **/ 
// Change authController.authUser to just authUser
authRouter.get('/get-me', authUser, getMe );

 



export default authRouter;

