const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });
const User = require('../Models/userModel');
const { handleError, createError } = require('../Errors/error');

exports.logoutUser = async (req, res, next) => {
    const { id } = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, { token: null });
        if (!user) {
            return next(handleError(createError(404, 'User not found'), req, res, next));
        }

        return res.status(200).json({ message: 'logged out successfully' });
    } catch (error) {
        return next(handleError(createError(500, 'Internal server error'), req, res, next));
    }
};