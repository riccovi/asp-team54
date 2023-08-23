// Import required modules
const express = require('express');

 
// Express router creation
const router = express.Router();

// Importing controllers

const uploadController = require('../controllers/uploadController');
const projectController = require('../controllers/projectController');
const userController = require('../controllers/userController');
const likeController = require('../controllers/likeController');

const profileController = require('../controllers/profileController'); 

const exploreController = require('../controllers/exploreController');
const leaderboardController = require('../controllers/leaderboardController');
const commentController = require('../controllers/commentController');
// Importing middleware
const checkAuth = require('../middleware/checkAuth');


// Routes
// router.get('/', (req, res) => res.render("index"));

// Home page, currently copied and pasted the leaderboards code into here, needs refactoring
const Service = require('../models/Service');
const UserService = require('../services/userService');

router.get('/', async (req, res, next) => {
    try {
        const data = await Service.getLeaderboard(); // Fetch leaderboard data
        const users = UserService.buildUserStructure(data); // Build user data for the leaderboard
        const topUsers = await Service.getTopUsers();
        
        res.render('index', { users, topUsers });
    } catch (err) {
        next(err); // On error, pass to error handling middleware
    }
});


router.get("/signup", (req, res) => res.render("signup"));  // Signup page
router.get("/login", (req, res) => res.render("login"));  // Login page
router.get("/about", (req, res) => res.render("about"));
router.get('/logout', userController.logout);  // Logout route

router.get("/upload", checkAuth, (req, res) => res.render('projectUpload'));  // Upload form page
//router.get("/upload", projectController);
//router.get("/upload", checkAuth, projectController.renderUploadPage); // Upload form page



// Routes with included middleware and controllers
router.post("/signup", uploadController.uploadSingle('profile_picture'), userController.signup);  // Signup route (registering, profile picture upload)
router.post("/login", userController.login);  // Login route (authentication)

// Profile update route (authentication required)


router.use('/explore', exploreController);   // Explore page
router.use('/project', projectController);  // Routes starting with '/project'
router.use('/likes', likeController);  // 
router.use('/comments', commentController);  //
router.use(profileController)
router.use('/leaderboard', leaderboardController);

module.exports = router;  // Exporting router for usage in other files
