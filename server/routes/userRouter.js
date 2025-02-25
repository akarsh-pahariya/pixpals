const express = require('express');
const { register, login } = require('../controllers/authController');

const Router = express.Router();

Router.route('/').get(login).post(register);

module.exports = Router;
