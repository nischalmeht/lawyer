const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

class Authentication {
    static isAuthenticated = (async (req, res, next) => {        
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json('Login first to access this resource.')
           
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
           
            req.user = await User.findById(decoded.id);
            next();
        } catch (error) {
            res.status(400).json('Login first to access this resource.')
            next()
            // return next(new ErrorHandler('Invalid or expired token.', 400));
        }
    });

    static isAuthorized = (...roles) => {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                res.status(403).json(`Role (${req.user.role}) is not allowed to access this resource.`)
                // return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource.`, 403));
            }
            next();
        };
    };
}

module.exports = Authentication;