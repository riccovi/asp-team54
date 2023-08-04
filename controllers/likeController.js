const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth'); 
const Like = require('../models/Like'); 

// Endpoint to handle the like action. Protected by the checkAuth middleware
router.post("/:id/like", checkAuth, async (req, res, next) => {
  const projectId = req.params.id;
  const userId = req.session.user.id;

  try {
    const result = await Like.toggleLike(projectId, userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
