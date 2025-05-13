const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');
const groupRouter = require('./routes/groupRouter');
const invitationRouter = require('./routes/invitationRouter');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// app.use(cors());
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(helmet());

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again after an hour.',
});
app.use('/api', limiter);

app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/group', groupRouter);
app.use('/api/v1/invite', invitationRouter);

app.use(globalErrorHandler);

module.exports = app;
