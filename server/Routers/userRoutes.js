const express = require('express');
const userController = require('../Controllers/userController');


const router = express.Router();

// router.param('id', moviesController.checkId);

router.route('/change-password').post(userController.forgetPassword);


module.exports = router;