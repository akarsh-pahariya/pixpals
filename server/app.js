const express = require('express');
const cors = require('cors');
const imageGroupingRouter = require('./routes/imageGroupingRouter');
const userRouter = require('./routes/userRouter');
const groupRouter = require('./routes/groupRouter');
const globalErrorHandler = require('./controllers/errorController');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/group', groupRouter);
app.use('/api/v1/image-grouping', imageGroupingRouter);

app.use(globalErrorHandler);

module.exports = app;
