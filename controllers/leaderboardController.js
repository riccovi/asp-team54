// Import required modules
const express = require('express');
const Service = require('../models/Service');
const UserService = require('../services/userService');
const Follow = require('../models/Follow'); // <-- Import the Follow model

const router = express.Router(); // Create a new Express Router



// Handles fetching leaderboard data and rendering the leaderboard view
router.get('/', async (req, res, next) => {
    try {
        const data = await Service.getLeaderboard(); 
        const users = await UserService.buildUserStructure(data); 
        const topUsers = await Service.getTopUsers();
        
        const loggedInUserId = req.session && req.session.user ? req.session.user.id: null;
        
        // Map each user with their following status 
        if (Array.isArray(users)) {
          for (const user of topUsers) {
            user.isFollowing = await Follow.isFollowing(loggedInUserId, user.userId);
            
        }
      } else {
          console.error('Users is not an array:', users);
      }
        const currentUser = req.session.user ? req.session.user : null;
        res.render('leaderboard', { users, topUsers, loggedInUserId,currentUser });
    } catch (err) {
        next(err);
    }
});


async function followUser(req, res, next) {
  console.log("Inside followUser function");
  try {
        const followerId = req.session && req.session.user ? req.session.user.id : null;
        const userIdToFollow = req.params.userId;
        
        await Follow.toggleFollow(followerId, userIdToFollow); 
        res.redirect('back'); 
    } catch (err) {
        next(err);
    }
}

async function unfollowUser(req, res, next) {
  console.log("Inside unfollowUser function");
    try {
        const followerId = req.session && req.session.user ? req.session.user.id : null;
        const userIdToUnfollow = req.params.userId;
        
        // Check if following
        if (await Follow.isFollowing(followerId, userIdToUnfollow)) {
            await Follow.toggleFollow(followerId, userIdToUnfollow);
        }

        res.redirect('back'); 
    } catch (err) {
        next(err);
    }
}

module.exports = router;
