const db = require('../Db.js');

class Comment {
    static async create(userId, projectId, content) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Comments (user_id, project_id, content) VALUES (?, ?, ?)';
            db.run(query, [userId, projectId, content], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    static async findByProjectId(projectId) {
        return new Promise((resolve, reject) => {
            const query = `
                
                SELECT Comments.*, Users.id as user_id, Users.username, Users.profile_picture 
 
                FROM Comments 
                JOIN Users ON Comments.user_id = Users.id 
                WHERE project_id = ?`;
            db.all(query, [projectId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    

    // delete comment
    static async delete(userId, commentId) {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM Comments 
                WHERE id = ? AND user_id = ?`;
            db.run(query, [commentId, userId], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }
}

module.exports = Comment;
