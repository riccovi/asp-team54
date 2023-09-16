const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./pixelPulseDB.sqlite3');

//add Like class with toogle likes method
class Like {
    static async getLikesCount(projectId) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT COUNT(*) AS likesCount FROM Likes WHERE project_id = ?";
            db.get(sql, [projectId], (err, row) => {
                if (err) reject(err);
                else resolve(row.likesCount);
            });
        });
    }

    static async toggleLike(projectId, userId) {
            return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Likes WHERE user_id = ? AND project_id = ?";
            db.get(sql, [userId, projectId], (err, row) => {
                if (err) {
                reject(err);
                } else {
                if (row) {
                    // User has already liked the project, remove the like
                    const deleteSql = "DELETE FROM Likes WHERE user_id = ? AND project_id = ?";
                    db.run(deleteSql, [userId, projectId], function (err) {
                    if (err) reject(err);
                    else {
                        // After removing the like, get the updated likes count and resolve the promise
                        Like.getLikesCount(projectId).then((likesCount) => {
                        resolve({ liked: false, likesCount });
                        }).catch(reject);
                    }
                    });
                } else {
                    // User has not liked the project, add the like
                    const insertSql = "INSERT INTO Likes (user_id, project_id) VALUES (?, ?)";
                    db.run(insertSql, [userId, projectId], function (err) {
                    if (err) reject(err);
                    else {
                        // After adding the like, get the updated likes count and resolve the promise
                        Like.getLikesCount(projectId).then((likesCount) => {
                        resolve({ liked: true, likesCount });
                        }).catch(reject);
                    }
                    });
                }
                }
            });
        });
    }
    static async isLiking(projectId, userId) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Likes WHERE project_id = ? AND user_id = ? ";

            db.get(sql, [projectId, userId], (err, row) => {
                if (err) reject(err);
                else resolve(!!row);  // Convert to boolean: true if row exists, false otherwise
            });
        });
    }
    
}

module.exports = Like;