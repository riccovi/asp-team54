// Load the express module
const express = require('express');

// Initialize the express application
const app = express();

// Load the body-parser module for handling HTTP POST requests
const bodyParser = require('body-parser');

// Load the dotenv module for handling environment variables
require('dotenv').config();

// Set up the express app to use bodyParser.urlencoded
// This allows us to parse the body of POST requests, that are sent in urlencoded format
app.use(bodyParser.urlencoded({ extended: true }));

// Load the main router file under the routes directory
// This file contains all the routes for our application
require("./routes/main")(app);

// Set up express app to serve static files from the 'public' directory
// This is where our client-side javascript, css, images etc. are stored
app.use(express.static('public'));

// Set up express app to use EJS (Embedded JavaScript) as the view engine
// This allows us to write HTML templates with embedded JavaScript
app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");
app.engine('html', require('ejs').renderFile);

// Load the MySQL module for database connectivity
const mysql = require('mysql');

// Create a connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database : process.env.DB_NAME
});

// Attempt to connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log("Connected to database");
});

// Set the connection object to be globally available
global.db = db;

// Define the port to listen for incoming requests
const port = 1823;

// Set the app to listen on the defined port
app.listen(port, () => console.log(`PixelPulse app listening on port ${port}!`));
