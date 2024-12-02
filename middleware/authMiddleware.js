const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminModel');

const jwtAuth = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const admin = await Admin.findById(decoded.id).select('-password');
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found / Unauthorized Access' });
            }
            req.user = admin;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Session expired, please log in again' });
            } else {
                return res.status(401).json({ message: 'Not authorized, token failed' });
            }
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};



// Validate token
const validateToken = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ isValid: false });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ decoded });
    } catch (error) {
        res.status(401).json({ isValid: false });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as admin' });
    }
};

module.exports = {
    jwtAuth, 
    validateToken,
    isAdmin,
};
