// Import required modules and middleware
const express = require('express');
const router = express.Router();
const multer = require('multer');

const Profile = require('../models/Profile'); // Profile model
const Follow = require('../models/Follow'); 
const uploadController = require('../controllers/uploadController');
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/checkAuth');




// Constants
const PROFILE_VIEW = 'profile';
const PUBLIC_PROFILE_VIEW = 'publicProfile';

// Define routes
router.get('/profile', renderProfilePage); // Route for the main profile page
router.get('/public-profile/:username', fetchPublicProfile); // Route for fetching a public profile
router.post('/update', checkAuth, uploadController.uploadSingle('profile_picture'), userController.updateProfile); // Route for updating a profile
;
// Function for rendering the main profile page
async function renderProfilePage(req, res, next) {
  try {
    const projects = await Profile.getProfile(req.session.user.id);
    res.render(PROFILE_VIEW, { user: req.session.user, projects });
  } catch (err) {
    next(err);
  }
}

// Function for fetching a public profile
async function fetchPublicProfile(req, res, next) {
  const username = req.params.username;

  // Check for a logged-in user. If there isn't one, set loggedInUserId to null.
  const loggedInUserId = req.session.user ? req.session.user.id : null;

  try {
      const data = await Profile.getPublicProfile(username);
      if (!data.length) {
          res.status(404).send('User not found');
          return;
      }
      let user = {
          id: data[0].userId,
          username: data[0].username,
          email: data[0].email,
          role: data[0].role,
          profile_picture: data[0].profile_picture,
          created_at: data[0].created_at,
          projects: buildUserProjectsData(data),
          isFollowing: await Follow.isFollowing(loggedInUserId, data[0].userId)
      };

      // Pass both the user and loggedInUserId to the view
      res.render(PUBLIC_PROFILE_VIEW, { user, loggedInUserId });
  } catch (err) {
      next(err);
  }
}

function buildUserProjectsData(data) {
  let projects = [];
  data.forEach(row => {
    if (row.title && row.description && row.project_picture && row.projectId) {
      projects.push({
        id: row.projectId,
        title: row.title,
        description: row.description,
        project_picture: row.project_picture,
        likes: row.likes,
      });
    }
  });
  return projects;
}

// Export the router
module.exports = router;
