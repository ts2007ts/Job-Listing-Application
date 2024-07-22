const express = require('express');
const registerController = require('../Controllers/registerController');
const loginController = require('../Controllers/loginController');

const router = express.Router();

// router.param('id', moviesController.checkId);

router.route('/register').post(registerController.registerUser);
router.route('/login').post(loginController.loginUser);


module.exports = router;