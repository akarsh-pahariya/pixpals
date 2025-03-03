const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next(new AppError('Please provide username and password', 400));
    }

    const user = await User.findOne({ username });
    if (!user) {
      return next(new AppError('Incorrect username or password', 401));
    }

    if (!(await user.verifyPassword(password, user.password))) {
      return next(new AppError('Incorrect username or password', 401));
    }

    const token = createToken(user.id);
    res.cookie('jwt', token, {
      secure: true,
      httpOnly: true,
      sameSite: 'None',
    });

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const register = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const user = newUser.toJSON();

    const token = createToken(user.id);
    res.cookie('jwt', token, {
      secure: true,
      httpOnly: true,
      sameSite: 'None',
    });

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const verifyUser = async (req, res, next) => {
  try {
    res.status(201).json({
      status: 'success',
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

module.exports = { register, login, verifyUser };
