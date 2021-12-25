const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const compression = require('compression');

const reportRouter = require('./routes/reportRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(
	helmet({
		contentSecurityPolicy: false,
	})
);

// Logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(
	hpp({
		whitelist: [
			'cmdtyID'
		],
	})
);

app.use(compression());

// 3) ROUTES
app.use('/reports', reportRouter);

/* app.all('*', (req, res, next) => {
	next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler); */

module.exports = app;
