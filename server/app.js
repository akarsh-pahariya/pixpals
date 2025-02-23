const express = require('express');
const cors = require('cors');
const imageGroupingRouter = require('./routes/imageGroupingRouter');

const app = express();

app.use(cors());

app.use('/api/v1/image-grouping', imageGroupingRouter);

module.exports = app;
