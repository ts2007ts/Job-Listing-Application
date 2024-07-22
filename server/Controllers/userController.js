const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });
const User = require('../Models/userModel');



exports.forgetPassword = async (req, res, next) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }
};

