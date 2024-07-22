const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const { createError, handleError } = require('../Errors/error');

const verifyToken = async (req, res, next) => {
    const testToken = req.headers.authorization;

    let token;

    if (testToken && testToken.startsWith('bearer')) {
        token = testToken.split(' ')[1];
    }

    if (!token) {
        return next(handleError(createError(403, 'No token provided'), req, res, next));
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(decoded.id);

        if (!user || user.token !== token) {
            return next(handleError(createError(401, 'Unauthorized'), req, res, next));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(handleError(createError(401, 'Unauthorized'), req, res, next));
    }
};

module.exports = verifyToken;