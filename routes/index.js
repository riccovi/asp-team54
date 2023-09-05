// Import required modules
const express = require('express');

 
// Express router creation
const router = express.Router();

// Importing controllers

const uploadController = require('../controllers/uploadController');
const projectController = require('../controllers/projectController');
const userController = require('../controllers/userController');
const likeController = require('../controllers/likeController');
const followController = require('../controllers/followController');
const commentController = require('../controllers/commentController');

const searchController = require('../controllers/searchController');

const profileController = require('../controllers/profileController'); 

const exploreController = require('../controllers/exploreController');
const leaderboardController = require('../controllers/leaderboardController');

// Importing middleware
const checkAuth = require('../middleware/checkAuth');
const Follow = require('../models/Follow');


// Routes
// router.get('/', (req, res) => res.render("index"));

// Home page, currently copied and pasted the leaderboards code into here, needs refactoring
const Service = require('../models/Service');
const UserService = require('../services/userService');

router.get('/', async (req, res, next) => {
    try {
        const data = await Service.getLeaderboard(); // Fetch leaderboard data
        const users = await UserService.buildUserStructure(data); // Build user data for the leaderboard
        const topUsers = await Service.getTopUsers();
        const currentUser = req.session.user ? req.session.user : null;
        res.render('index', { users, topUsers,currentUser });
    } catch (err) {
        next(err); // On error, pass to error handling middleware
    }
});


router.get("/signup", (req, res) => res.render("signup"));  // Signup page
router.get("/login", (req, res) => res.render("login"));  // Login page
router.get("/about", (req, res) => res.render("about"));
router.get("/help", (req, res) => res.render("help"));
router.get("/creators", (req, res) => res.render("creators"));
router.get("/privacy_policy", (req, res) => res.render("privacyPolicy"));
router.get("/terms_of_service", (req, res) => res.render("termsOfService"));
router.get('/logout', userController.logout);  // Logout route

router.get('/search', searchController.searchUsers);
router.get("/upload", checkAuth, (req, res) => res.render('projectUpload'));  // Upload form page
//router.get("/upload", projectController);
//router.get("/upload", checkAuth, projectController.renderUploadPage); // Upload form page



// Routes with included middleware and controllers
router.post("/signup", uploadController.uploadSingle('profile_picture'), userController.signup);  // Signup route (registering, profile picture upload)
router.post("/login", userController.login);  // Login route (authentication)


router.use('/explore', exploreController);   // Explore page
router.use('/project', projectController);  // Routes starting with '/project'
router.use('/likes', likeController);  // 
router.use('/comments', commentController);  //
router.use(profileController)
router.use('/leaderboard', leaderboardController);
router.use('/follow', followController);



module.exports = router;  // Exporting router for usage in other files
