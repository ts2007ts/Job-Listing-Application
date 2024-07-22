const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });
const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const { createError, handleError } = require('../Errors/error');


exports.registerUser = async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return next(handleError(createError(400, 'Username already exists! Login Instead'), req, res, next));
    }

    if (password !== confirmPassword) {
      return next(handleError(createError(400, 'Passwords do not match!'), req, res, next));
    }

    if (password.length < 8 || confirmPassword.length < 8) {
      return next(handleError(createError(400, 'Passwords length must be 8 chars minimum'), req, res, next));
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return next(createError(400, 'User email already exists! Login Instead'));
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({ username, email, password: hashedPassword });
    await user.save({ runValidators: true });

    res.status(201).json({
      message: 'User created successfully',
    });
  } catch (error) {
    res.status(500).json(error);
  }
};