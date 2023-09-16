// Import required modules and middleware
const express = require('express');
const router = express.Router();
const uploadController = require('./uploadController'); // controller for file uploads
const checkAuth = require('../middleware/checkAuth');  // middleware for authentication
const errorMiddleware = require('../middleware/errorMiddleware'); // middleware for error handling
const Project = require('../models/Project'); // Project model
const Comment = require('../models/Comment'); // Comment model
const Like = require('../models/Like'); // Like model
const commentController = require('./commentController'); // controller for comments

const likeController = require('./likeController'); // controller for likes

// Constants
const PROJECT_VIEW = 'project';

// Apply error handling middleware
router.use(errorMiddleware);

// Define routes
router.get('/', renderProjectPage); // Route for the main project page
router.get('/:id', fetchProjectById); // Route for fetching a specific project by id
router.post("/upload", checkAuth, uploadController.uploadSingle('project_picture'), uploadProject); // Route for uploading a new project
router.delete("/:id", checkAuth, deleteProject); // Route for deleting a project
router.use('/:id/comments', commentController); // Use commentController for comment related routes
router.use('/:id/likes', likeController); // Use likeController for like related routes

router.post("/:id", checkAuth, uploadController.uploadSingle('project_picture'), editProject);

//router.get("/upload", checkAuth, renderUploadPage);

router.get('/:id/edit', checkAuth, renderProjectEditPage); // Route for rendering the edit page of a project



// Function for rendering the main project page
async function renderProjectPage(req, res) {
  res.render(PROJECT_VIEW);
}

// Function for fetching a specific project by its id
async function fetchProjectById(req, res, next) {
  const projectId = req.params.id;

  try {
    let project = await Project.findById(projectId);
    // If the project is not found, throw an error
    if (!project) throw new Error('Project not found');

    // Escape the code before rendering it
    project.code = escapeCode(project.code);

    // Fetch comments for the project
    const comments = await Comment.findByProjectId(projectId);
  
    // If there are comments, add them to the project
    if (comments && comments.length > 0) project.latest_comments = comments;
    const currentUser = req.session.user ? req.session.user : null;
    if (currentUser) {
        var isLiking = await Like.isLiking(projectId,currentUser.id);
        
    } else {
        var isLiking = false;
    };
    // Render the project with the fetched details and the current session
    res.render(PROJECT_VIEW, { project, session: req.session , currentUser, isLiking});
  } catch(err) {
    next(err);
  }
}
 
// Function to escape the code before rendering it
function escapeCode(code) {
  return code ? Buffer.from(code).toString('base64') : code;
}

// Function for uploading a new project
async function uploadProject(req, res, next) {
  const { title, description, code } = req.body;
  const project_picture = req.file ? req.file.path : null;
  const user_id = req.session.user.id;
  const tags = req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [];

  try {
    await Project.createProject({user_id, title, description, code, project_picture, tags});
    res.redirect("/profile");
  } catch(err) {
    next(err);
  }
}

// Function for deleting a project
async function deleteProject(req, res, next) {
  const projectId = req.params.id;
  const userId = req.session.user.id;

  try {
    // Delete the project. If the project is not found or the user doesn't own it, return an error.
    const changes = await Project.deleteProjectById(projectId, userId);
    if (changes === 0) {
      return res.status(404).json({ message: "Project not found or you don't own this project." });
    }
    // If the project is successfully deleted, return a success message
    return res.json({ message: "Project deleted successfully." });
  } catch(err) {
    next(err);
  }
}

// Function for editing a project
// Function for editing a project
async function editProject(req, res, next) {
  const { title, description, code } = req.body;
  const user_id = req.session.user.id;
  const id = req.params.id;
  const tags = req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [];

  try {
    let projectData = { title, description, code, id, user_id, tags };

    if (req.file) {
      projectData.project_picture = req.file.path;
    }

    const changes = await Project.editProjectById(projectData);
    if (changes === 0) {
      return res.status(404).json({ message: "Project not found or you don't own this project." });
    }
    res.redirect("/profile");
  } catch(err) {
    next(err);
  }
}




async function renderProjectEditPage(req, res, next) {
  const projectId = req.params.id;

  try {
    let project = await Project.findById(projectId);
    // If the project is not found, throw an error
    if (!project) throw new Error('Project not found');

    // Escape the code before rendering it
    project.code = escapeCode(project.code);

    // Render the project with the fetched details and the current session
    res.render('projectEdit', { project, session: req.session , currentUser: req.session.user });
  } catch(err) {
    next(err);
  }
}








// Export the router
module.exports = router;
