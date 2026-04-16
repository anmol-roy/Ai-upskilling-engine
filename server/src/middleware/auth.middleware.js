import jwt from 'jsonwebtoken';
import Blacklist from '../models/blacklist.modal.js';

async function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }   
    
    // Check if token is blacklisted
    const isBlacklisted = await Blacklist.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Token is invalid' });
    }
    
    try {
        // Verify token and attach decoded user to request
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // ✅ This is what getMe controller expects
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export default authUser;