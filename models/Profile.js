const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./pixelPulseDB.sqlite3');

class Profile {
    static async getPublicProfile(username) {
        return new Promise((resolve, reject) => {
            let sql = `
            SELECT
                Users.id AS userId, Users.username, Users.email, Users.role, Users.profile_picture, Users.created_at,
                Projects.id AS projectId, Projects.title, Projects.description, Projects.project_picture, 
                COUNT(DISTINCT Likes.id) as likes,
                GROUP_CONCAT(Tags.name) AS tags
            FROM Users
            LEFT JOIN Projects ON Users.id = Projects.user_id
            LEFT JOIN Likes ON Projects.id = Likes.project_id
            LEFT JOIN ProjectTags ON Projects.id = ProjectTags.project_id
            LEFT JOIN Tags ON ProjectTags.tag_id = Tags.id
            WHERE Users.username = ?
            GROUP BY Projects.id;`;

            db.all(sql, [username], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    static async getProfile(userId) {
        return new Promise(async (resolve, reject) => {
            const sql = `
                SELECT Projects.*, COUNT(Likes.id) as likes
                FROM Projects 
                LEFT JOIN Likes ON Projects.id = Likes.project_id
                WHERE Projects.user_id = ?
                GROUP BY Projects.id`;
            db.all(sql, [userId], async (err, rows) => {
                if (err) reject(err);
                else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = Profile;
