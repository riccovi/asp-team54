const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./pixelPulseDB.sqlite3');

exports.getLeaderboard = function(req, res, next) {
  // Fetch users and projects from the database
  let sql = `SELECT Users.id, Users.username, Users.email, Users.role, Projects.title, Projects.description, Projects.project_picture 
             FROM Users 
             LEFT JOIN Projects ON Users.id = Projects.user_id`;

  db.all(sql, function(err, data) {
    if (err) {
      return next(err);
    } else {
      // Creating an array of users, where each user is an object containing an array of their projects
      let users = [];
      let currentUserId = -1;
      let currentUser = null;

      data.forEach((row) => {
        if (row.id !== currentUserId) {
          currentUserId = row.id;
          currentUser = {
            id: row.id,
            username: row.username,
            email: row.email,
            role: row.role,
            projects: [],
          };
          users.push(currentUser);
        }

        // Check if the user has a project, if so, add it to their projects array
        if (row.title && row.description && row.project_picture) {
          currentUser.projects.push([row.title, row.description, row.project_picture]);
        }
      });

      res.render('leaderboard', { users: users });
    }
  });
};




exports.getPublicProfile = function(req, res, next) {
  // Get the username from the URL parameters
  const username = req.params.username;

  // Fetch user and their projects from the database
  let sql = `SELECT Users.id, Users.username, Users.email, Users.role, Users.profile_picture, Users.created_at, Projects.title, Projects.description, Projects.project_picture 
             FROM Users 
             LEFT JOIN Projects ON Users.id = Projects.user_id
             WHERE Users.username = ?`;

  db.all(sql, [username], function(err, data) {
    if (err) {
      return next(err);
    } else {
      // If no data was returned, then the user does not exist
      if (data.length === 0) {
        return res.status(404).send('User not found');
      }

      // Organizing data for the user and their projects
      let user = {
        id: data[0].id,
        username: data[0].username,
        email: data[0].email,
        role: data[0].role,
        profile_picture: data[0].profile_picture,
        created_at: data[0].created_at,
        projects: []
      };

      data.forEach(row => {
        // Check if the user has a project, if so, add it to their projects array
        if (row.title && row.description && row.project_picture) {
          user.projects.push({
            title: row.title,
            description: row.description,
            project_picture: row.project_picture
          });
        }
      });

      res.render('publicProfile', { user: user });
    }
  });
};

