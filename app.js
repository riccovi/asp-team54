// Import necessary modules
const express = require('express');
const path = require('path');
const createError = require('http-errors');

const session = require('express-session');



// Require routes
const indexRouter = require('./routes/index');

// Create an instance of the Express server
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Session configuration
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
// Middleware to add user to all views
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});


// Middleware to parse JSON and URL-encoded data in HTTP request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');  // Make sure you have a view named 'error' to render
});

// Define the port for our server to listen on
const PORT = process.env.PORT || 3000; // It's better to get the port number from environment variables

// Start the server, listening on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app; // Exporting the app for testing and flexibility
