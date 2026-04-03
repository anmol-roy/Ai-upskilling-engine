const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Blacklist = require('../models/blacklist.modal');



async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const isUserExist = await userModel.findOne({ 
            $or: [{ email }, { username }]
        });

        if (isUserExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword
        });

        // 1. Save FIRST
        await newUser.save();

        // 2. Generate token ONLY after successful save
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
}



async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Move validation to the TOP
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return res.status(200).json({ 
            message: 'Login successful', 
            user: { id: user._id, username: user.username, email: user.email },
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
}

async function logoutUser(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    await Blacklist.create({ token });
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logout successful' });
}

async function getMe(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: 'User details fetched successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

    



module.exports = {
    registerUser,

    loginUser,
    logoutUser,
    getMe
};