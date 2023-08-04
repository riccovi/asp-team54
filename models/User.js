const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./pixelPulseDB.sqlite3');

const Project = require('./Project');


class User {
    // Fetch a user based on the given id
    static async findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM Users WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    // Fetch a user based on the given email
    static async findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM Users WHERE email = ?', [email], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    // Fetch a user based on the given username
    static async findByUsername(username) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM Users WHERE username = ?', [username], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    // Create a new user with the given user data
    static async createUser(userData) {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO Users (username, email, password, role, profile_picture) VALUES (?, ?, ?, ?, ?)', 
                   [userData.username, userData.email, userData.password, userData.role, userData.profile_picture], function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    }

    static async updateUserProfile(userId, username, email, profilePicture, role) {  // Add 'email' here
        return new Promise((resolve, reject) => {
          let sql = 'UPDATE Users SET username = ?, email = ?, profile_picture = ?, role = ? WHERE id = ?';  // Update SQL query to set 'email'
          db.run(sql, [username, email, profilePicture, role, userId], function(err) {  // Pass 'email' to the query
            if (err) reject(err);
            else resolve(this.changes);
          });
        });
    }
    

      


}



module.exports = User;
