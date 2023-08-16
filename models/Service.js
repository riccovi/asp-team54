const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./pixelPulseDB.sqlite3');
const Follow = require('../models/Follow');

class Service {
    static async getDataWithEntities() {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT 
                Users.id AS userId, Users.username, Users.email, Users.role, Users.profile_picture,
                Projects.id AS projectId, Projects.title, Projects.description, Projects.project_picture,
                COALESCE((SELECT COUNT(*) FROM Likes WHERE Likes.project_id = Projects.id), 0) as likes
                FROM Users 
                LEFT JOIN Projects ON Users.id = Projects.user_id
                ORDER BY Users.id; `;
            db.all(sql, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }


    static async getLeaderboard() {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT 
                Users.id AS userId, Users.username, Users.email, Users.role, Users.profile_picture,
                Projects.id AS projectId, Projects.title, Projects.description, Projects.project_picture,
                COALESCE((SELECT COUNT(*) FROM Likes WHERE Likes.project_id = Projects.id), 0) as likes
                FROM Users 
                LEFT JOIN Projects ON Users.id = Projects.user_id
                ORDER BY Users.id; `;
            db.all(sql, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
    
   // Leaderboard Get Top Users by likes on their projects
   static async getTopUsers() {
    return new Promise((resolve, reject) => {
        let sql = `
            SELECT 
            Users.id AS userId, Users.username, Users.email, Users.role, Users.profile_picture,
            COUNT(DISTINCT Projects.id) AS projectCount,
            (SELECT COUNT(*) FROM Likes JOIN Projects ON Likes.project_id = Projects.id WHERE Projects.user_id = Users.id) as likes,
            (SELECT COUNT(*) FROM Comments JOIN Projects ON Comments.project_id = Projects.id WHERE Projects.user_id = Users.id) as comments
            FROM Users 
            LEFT JOIN Projects ON Users.id = Projects.user_id
            GROUP BY Users.id
            ORDER BY likes DESC; `;
        db.all(sql, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
         
        });
    });
}




}




module.exports = Service;