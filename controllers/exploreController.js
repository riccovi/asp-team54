// Importing required modules and middleware
const express = require('express');
const router = express.Router();

// Import required modules
const Comment = require('../models/Comment');
//const Explore = require('../models/Explore');
const Service = require('../models/Service');
const UserService = require('../services/userService');

// Render the explore page
router.get('/', async (req, res, next) => {
    try {
        const data = await Service.getDataWithEntities(); // Fetch  data 
        const tags = await Service.getTags();
        const users = await UserService.buildUserStructure(data); // Build user data structure
        res.render('explore', { tags,users, currentUser: req.session.user });

    } catch (err) {
        next(err); // On error, pass to error handling middleware
    }
});

module.exports = router;
