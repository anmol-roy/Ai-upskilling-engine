const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();



async function registerUser(req, res) {
    const { username, email, password } = req.body;

     if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const isUserExist = await userModel.findOne({ 
        $or: [
            { email },
            { username }
        ]

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

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }


}

async function loginUser(req, res) {
    const { email, password } = req.body;

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
    res.status(200).json({ message: 'Login successful', 
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
        token
     });
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
}



module.exports = {
    registerUser,
    loginUser
};