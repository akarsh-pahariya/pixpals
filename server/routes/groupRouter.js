const express = require('express');
const {
  createGroup,
  getGroupDetails,
} = require('../controllers/groupController');
const { protect } = require('../middlewares/authMiddleware');
const imageRouter = require('./imageRouter');

const Router = express.Router();

Router.route('/').get(protect, getGroupDetails);
Router.route('/').post(protect, createGroup);

Router.use('/:groupId/image', imageRouter);

module.exports = Router;
