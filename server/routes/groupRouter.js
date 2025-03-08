const express = require('express');
const {
  createGroup,
  getGroupDetails,
} = require('../controllers/groupController');
const { protect } = require('../middlewares/authMiddleware');

const Router = express.Router();

Router.route('/').get(protect, getGroupDetails);
Router.route('/').post(protect, createGroup);

module.exports = Router;
