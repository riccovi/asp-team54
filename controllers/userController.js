// Import bcrypt for password hashing
const bcrypt = require('bcrypt');
const User = require('../models/User');

const saltRounds = 10;

// User signup
async function signup(req, res, next) {
  const { username, email, password, role } = req.body;
  const profile_picture = req.file ? req.file.path.replace(/\\/g, '/') : undefined;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    await User.createUser({ username, email, password: hashedPassword, role, profile_picture });

    res.redirect("/login");
  } catch (err) {
    err.message = 'Error while creating the user';
    next(err); 
  }
}

// User login
async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    // Fetch user
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Validate password
    const result = await bcrypt.compare(password, user.password);

    if (!result) {
    
      return res.redirect("/login");
      
    }

    // Create session
    req.session.user = user;
    currentUser =req.session.user;
    res.redirect("/profile");
  } catch (err) {
    err.message = 'Error while fetching the user';
    next(err); 
  }
}

// User logout
async function logout(req, res, next) {
  try {
    // Destroy session
    await new Promise((resolve, reject) => {
      req.session.destroy(err => {
        if (err) reject(err);
        resolve();
      });
    });

    res.redirect('/');
  } catch (err) {
    err.message = 'Error while logging the user out';
    next(err); 
  }
}

async function updateProfile(req, res, next) {
  const { username, email, role } = req.body;  
  const profile_picture = req.file ? req.file.path.replace(/\\/g, '/') : undefined;
  const userId = req.session.user.id;

  try {
    await User.updateUserProfile(userId, username, email, profile_picture, role);
    if (username) req.session.user.username = username;
    if (email) req.session.user.email = email;
    if (role) req.session.user.role = role;
    if (profile_picture) req.session.user.profile_picture = profile_picture;
    
    res.redirect("/profile");
  } catch (err) {
    err.message = 'Error while updating the user profile';
    next(err); 
  }
}

module.exports = {
  signup,
  login,
  logout,
  updateProfile
};