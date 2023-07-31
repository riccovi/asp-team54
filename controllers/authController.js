const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./pixelPulseDB.sqlite3');

exports.signup = (req, res, next) => {
  // Extract data from the form
  let username = req.body.username;
  let email = req.body.email;
  let role = req.body.role;

  // Handle file upload
  //let profile_picture = req.file ? req.file.path : null;
  let profile_picture = req.file ? req.file.path.replace(/\\/g, '/') : null;


  const saltRounds = 10; // Define the number of rounds to use for bcrypt hashing

  // Hash password using bcrypt
  bcrypt.hash(req.body.password, saltRounds, function(err, hashedPassword) {
    if (err) {
      return next(err);
    }

    // Prepare SQL insert statement
    let sql = "INSERT INTO users (username, email, password, role, profile_picture) VALUES (?, ?, ?, ?, ?)";

    // Execute SQL query
    db.run(sql, [username, email, hashedPassword, role, profile_picture], function(err) {
      if(err) {
        return next(err);
      } else {
        res.redirect("/login");
      }
    });
  });
}

exports.login = (req, res) => {
  // Get form data
  let email = req.body.email;
  
  // Prepare SQL select statement
  let sql = "SELECT * FROM users WHERE email = ?";
  
  // Execute query
  db.get(sql, [email], function(err, user) {
    if(err) {
      res.status(500).send('Error during login.');
    } else {
      if(user){
        // User exists
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if(err) {
            res.status(500).send('Error during password comparison.');
            return;
          }
          if(result){
            // User login successful
            req.session.user = user;  // Create user session
            res.redirect("/profile");

          } else {
            // Password is incorrect
            res.status(401).send('Incorrect password.');
          }
        });
      } else {
        // User does not exist
        res.status(404).send('User not found.');
      }
    }
  });
}

  // Route for logging out
  exports.logout = function(req, res) {
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        res.redirect('/');
      }
    });
  };