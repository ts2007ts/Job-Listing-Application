const express = require('express');
const authController = require('../Controllers/authController');

const router = express.Router();

// router.param('id', moviesController.checkId);

router.route('/logout').post(authController.logoutUser);


module.exports = router;