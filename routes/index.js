// Import required modules
const express = require('express'); // Express for routing
const router = express.Router(); // Create a new Express router
const sqlite3 = require('sqlite3').verbose(); // SQLite for database operations
const authController = require('../controllers/authController');
const uploadController = require('../controllers/uploadController');
const projectController = require('../controllers/projectController'); // Import the projectController
const userController = require('../controllers/userController');

// Initialize SQLite database
const db = new sqlite3.Database('./pixelPulseDB.sqlite3');

// Route for the home page
router.get('/', (req, res) => {
  res.render("index");
});

// Route for the explore page
router.get('/explore', (req, res) => {
  res.render("explore");
});

// Route for the signup page
router.get("/signup", function(req, res) {
  res.render("signup");
});

// Signup POST route to handle user registration with profile picture upload
router.post("/signup", uploadController.uploadSingle('profile_picture'), authController.signup);

// Route for the login page
router.get("/login", function(req, res) {
  res.render("login");
});

// Login POST route to handle user login
router.post("/login", authController.login);

// Route for the profile page
router.get('/profile', function(req, res, next) {
  // Check if user is logged in
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    // Fetch projects from the database for the logged-in user
    let sql = "SELECT * FROM Projects WHERE user_id = ?";
    db.all(sql, [req.session.user.id], function(err, projects) {
      if (err) {
        return next(err);
      } else {
        res.render('profile', { user: req.session.user, projects: projects });
      }
    });
  }
});

// Route for logging out
router.get('/logout', authController.logout);

// Route for the upload page
router.get("/upload", function(req, res) {
  res.render("projectUpload");
});

// Route for uploading a new project
router.post("/upload", uploadController.uploadSingle('project_picture'), function(req, res, next) {
  // Extract data from the form
  let title = req.body.title;
  let description = req.body.description;
  let code = req.body.code;

  // Handle file upload
  let project_picture = req.file ? req.file.path : null;

  // Check if user is logged in
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    // Get user_id from session
    let user_id = req.session.user.id;

    // Prepare SQL insert statement
    let sql = "INSERT INTO Projects (user_id, title, description, code, project_picture) VALUES (?, ?, ?, ?, ?)";

    // Execute SQL query
    db.run(sql, [user_id, title, description, code, project_picture], function(err) {
      if (err) {
        return next(err);
      } else {
        res.redirect("/profile");
      }
    });
  }
});

// Use the projectController for any routes starting with '/project'
router.use('/project', projectController);

// Route for the leaderboard page
router.get('/leaderboard', userController.getLeaderboard);

//Public profile
// Route for the public profile page
router.get('/public-profile/:username', userController.getPublicProfile);





// Export router to use in other files
module.exports = router;
