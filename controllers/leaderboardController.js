// Import required modules
const express = require('express');
const Service = require('../models/Service');
const UserService = require('../services/userService');

const router = express.Router(); // Create a new Express Router

// Handles fetching leaderboard data and rendering the leaderboard view
router.get('/', async (req, res, next) => {
    try {
        const data = await Service.getLeaderboard(); // Fetch leaderboard data
        const users = UserService.buildUserStructure(data); // Build user data for the leaderboard
        const topUsers = await Service.getTopUsers();
        
        res.render('leaderboard', { users, topUsers });
    } catch (err) {
        next(err); // On error, pass to error handling middleware
    }
});



module.exports = router; // Export the router instead
