// Import necessary modules
const bcrypt = require('bcrypt');

// The main.js file of PixelPulse
module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index.html");
  });

  // Signup route
  app.get("/signup", function(req, res) {
    res.render("signup.html");
  });

  app.post("/signup", function(req, res) {
    // Get form data
    let username = req.body.username;
    let email = req.body.email;
    let role = req.body.role;
    
    // Validate data here

    // Hash password
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function(err, hashedPassword) {
      if (err) {
        res.status(500).send('Error in password hashing.');
        return;
      }
      
      // Prepare SQL insert statement
      let sql = "INSERT INTO users (username, email, password, role) VALUES ?";
      let values = [
          [username, email, hashedPassword, role]
      ];
      
      // Execute query
      db.query(sql, [values], function(err, result) {
        if(err) {
          // Handle error
          res.status(500).send('Error in user registration.');
        } else {
          // User registered successfully
          res.status(200).send('User registration successful.');
        }
      });
    });
  });

  // Login route
  app.get("/login", function(req, res) {
    res.render("login.html");
  });

  app.post("/login", function(req, res) {
    // Get form data
    let email = req.body.email;
    
    // Prepare SQL select statement
    let sql = "SELECT * FROM users WHERE email = ?";
    
    // Execute query
    db.query(sql, [email], function(err, results) {
      if(err) {
        // Handle error
        res.status(500).send('Error during login.');
      } else {
        if(results.length > 0){
          // User exists
          bcrypt.compare(req.body.password, results[0].password, function(err, result) {
            if(err) {
              res.status(500).send('Error during password comparison.');
              return;
            }
            if(result){
              // User login successful
              res.render("profile.html", { user: results[0] })
              //res.status(200).send('User login successful.');

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
  });


 // Profile route
  // Profile route
app.get("/profile/:id", function(req, res) {
  const userId = req.params.id;

  // Prepare SQL select statement
  let sql = "SELECT * FROM users WHERE id = ?";

  // Execute query
  db.query(sql, [userId], function(err, results) {
    if(err) {
      // Handle error
      res.status(500).send('Error during fetching user data.');
    } else {
      if(results.length > 0) {
        // User exists, render profile page with user data
        res.render("profile.html", { user: results[0] });
      } else {
        // User does not exist
        res.status(404).send('User not found.');
      }
    }
  });
});





}
