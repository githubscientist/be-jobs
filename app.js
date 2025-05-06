const express = require('express');
const authRouter = require('./routes/authRoutes');
const logger = require('./utils/logger');
const cookieParser = require('cookie-parser');
const errorRoute = require('./utils/errorRoute');
const userRouter = require('./routes/userRoutes');
const fileRouter = require('./routes/fileRoutes');

const app = express();

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to log requests
app.use(logger);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/files', fileRouter);

// Middleware to handle 404 errors
app.use(errorRoute);

module.exports = app;