const express = require('express');
const authRouter = require('./routes/authRoutes');
const logger = require('./utils/logger');
const cookieParser = require('cookie-parser');
const errorRoute = require('./utils/errorRoute');
const userRouter = require('./routes/userRoutes');
const fileRouter = require('./routes/fileRoutes');
const companyRouter = require('./routes/companyRoutes');
const jobRouter = require('./routes/jobRouter');
const applicationRouter = require('./routes/applicationRoutes');

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
app.use('/api/v1/companies', companyRouter);
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/applications', applicationRouter);

// Middleware to handle 404 errors
app.use(errorRoute);

module.exports = app;