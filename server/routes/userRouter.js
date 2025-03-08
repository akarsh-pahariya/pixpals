const express = require('express');
const {
  register,
  login,
  verifyUser,
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { declineGroupInvite } = require('../controllers/userController');

const Router = express.Router();

Router.route('/').get(protect, verifyUser);
Router.route('/login').post(login);
Router.route('/register').post(register);

module.exports = Router;
