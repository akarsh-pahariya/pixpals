const express = require('express');
const {
  register,
  login,
  verifyUser,
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/multerMiddleware');
const { updateUser } = require('../controllers/userController');

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

module.exports = Router;
