const Comment = require('../models/Comment');
const checkAuth = require('../middleware/checkAuth'); 

const router = require('express').Router();

router.post("/:id/comment", checkAuth, async (req, res, next) => {
  const projectId = req.params.id;
  const userId = req.session.user.id;
  const content = req.body.content;
 
  try {
    const result = await Comment.create(userId, projectId, content);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/comment/:commentId", checkAuth, async (req, res, next) => {

  const commentId = req.params.commentId;
  const userId = req.session.user.id;

  try {
    const result = await Comment.delete(userId, commentId);
    if (result > 0) {
        res.json({message: "Comment deleted"});
    } else {
        // Check if the comment exists at all
        const commentExists = await Comment.findById(commentId);
        if (commentExists) {
          res.status(403).json({message: "Unauthorized to delete this comment"});
        } else {
          res.status(404).json({message: "Comment not found"});
        }
    }
  } catch (err) {
      next(err);
  }
});


module.exports = router;
