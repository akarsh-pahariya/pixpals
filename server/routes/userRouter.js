const express = require('express');
const { register } = require('../controllers/userController');

const Router = express.Router();

Router.route('/').post(register);

module.exports = Router;
