const express = require('express');
const {
  register,
  login,
  verifyUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/multerMiddleware');
const {
  updateUser,
  changePassword,
  logout,
} = require('../controllers/userController');

const Router = express.Router();

Router.route('/')
  .get(protect, verifyUser)
  .patch(protect, (req, res, next) => {
    upload.single('profilePhoto')(req, res, (err) => {
      if (err) {
        return next(err);
      }
      updateUser(req, res, next);
    });
  });
Router.route('/login').post(login);
Router.route('/register').post(register);
Router.route('/changePassword').post(protect, changePassword);
Router.route('/forgot-password').post(forgotPassword);
Router.route('/reset-password/:token').post(resetPassword);
Router.route('/logout').get(protect, logout);

module.exports = Router;
