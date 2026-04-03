const jwt = require('jsonwebtoken');
const Blacklist = require('../models/blacklist.modal.js');
function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }   
    const isBlacklisted = Blacklist.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Token is invalid' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        next();
    });
}

module.exports = authUser;