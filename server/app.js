const express = require('express');
const cors = require('cors');
const imageGroupingRouter = require('./routes/imageGroupingRouter');
const userRouter = require('./routes/userRouter');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/image-grouping', imageGroupingRouter);

app.use(globalErrorHandler);

module.exports = app;
