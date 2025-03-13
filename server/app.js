const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const groupRouter = require('./routes/groupRouter');
const invitationRouter = require('./routes/invitationRouter');
const globalErrorHandler = require('./controllers/errorController');
const cookieParser = require('cookie-parser');

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/group', groupRouter);
app.use('/api/v1/invite', invitationRouter);

app.use(globalErrorHandler);

module.exports = app;
