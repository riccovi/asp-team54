const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth'); 
const Follow = require('../models/Follow'); 

// Endpoint to handle the follow action. Protected by the checkAuth middleware
router.post("/:userId/follow", checkAuth, async (req, res, next) => {
  const targetUserid = req.params.userId;
  const followerUserid = req.session.user.id;
  console.log(followerUserid,targetUserid)
  try {
    const result = await Follow.toggleFollow(followerUserid,targetUserid);
    res.redirect('back'); 
  } catch (err) {
    next(err);
  }
});

// Endpoint to get followers of a user
router.get("/:userId/followers", checkAuth, async (req, res, next) => {
  const userId = req.params.userId;
  
  try {
    const followers = await Follow.getFollowers(userId);
    res.json(followers);
  } catch (err) {
    next(err);
  }
});

// Endpoint to get users that a specific user is following
router.get("/:userId/follow/:following_id", checkAuth, async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const following = await Follow.getFollowing(userId);
    res.json(following);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
