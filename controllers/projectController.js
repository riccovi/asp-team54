const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const uploadController = require('./uploadController');

const db = new sqlite3.Database('./pixelPulseDB.sqlite3');

// Route for the project page
router.get('/', (req, res) => {
  res.render('project');
});

// Route for the specific project page
router.get('/:id', (req, res, next) => {
  const projectId = req.params.id;
  const sql = "SELECT * FROM Projects WHERE id = ?";
  db.get(sql, [projectId], (err, project) => {
    if (err) {
      return next(err);
    }
    if (project) {
      project.code = escapeCode(project.code);
      res.render('project', { project: project });
    } else {
      res.status(404).send('Project not found');
    }
  });
});

// Add this function to escape special characters in the code
function escapeCode(code) {
  // JSON.stringify will handle all necessary escaping
  let escapedCode = JSON.stringify(code);
  // Now remove the leading and trailing double quote added by JSON.stringify
  return escapedCode.substring(1, escapedCode.length - 1);
}

module.exports = router;
