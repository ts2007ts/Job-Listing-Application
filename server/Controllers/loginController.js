const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });
const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createError, handleError } = require('../Errors/error');

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user)
            return next(handleError(createError(401, 'Email is not correct'), req, res, next));

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            return next(handleError(createError(401, 'Password is not correct'), req, res, next));

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '2d'
            }

        );

        user.token = token;
        await user.save();

        const { password: pass, confirmPassword: cPass, ...others } = user._doc;
        return res.status(200).json({
            ...others,
            token,
            message: "Login was successful"
        });
    } catch (error) {
        return next(handleError(createError(500, 'Internal Server Error'), req, res, next));
    }
};