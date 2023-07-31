const db = require('../db.js');
const bcrypt = require('bcrypt');



class User {
    static findAll(callback) {
        db.all('SELECT * FROM users', [], (err, rows) => {
            callback(err, rows);
        });
    }

    static create(name, callback) {
        db.run('INSERT INTO users(name) VALUES(?)', name, function(err) {
            callback(err, this.lastID);
        });
    }

    static getProjects(userId, callback) {
        const sql = "SELECT * FROM Projects WHERE user_id = ?";
        db.all(sql, [userId], callback);
      }
}

module.exports = User;
