const express = require('express');
const imageGroupingRouter = require('./routes/imageGroupingRouter');

const app = express();

app.use('/api/v1/image-grouping', imageGroupingRouter);

module.exports = app;
