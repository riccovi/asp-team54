const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./pixelPulseDB.sqlite3');

class Follow {
    // Method to check if UserA follows UserB
    static async isFollowing(userId, followingId) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Follows WHERE follower_id = ? AND following_id = ?";
            db.get(sql, [userId, followingId], (err, row) => {
                if (err) reject(err);
                else resolve(!!row);  // Convert to boolean: true if row exists, false otherwise
            });
        });
    }

    // Method to toggle follow/unfollow status
    static async toggleFollow(userId, followingId) {
        return new Promise((resolve, reject) => {
            Follow.isFollowing(userId, followingId).then(isFollowing => {
                if (isFollowing) {
                    // User is already following, so unfollow
                    const deleteSql = "DELETE FROM Follows WHERE follower_id = ? AND following_id = ?";
                    db.run(deleteSql, [userId, followingId], err => {
                        if (err) reject(err);
                        else resolve({ following: false });
                    });
                } else {
                    // User is not following, so follow
                    const insertSql = "INSERT INTO Follows (follower_id, following_id) VALUES (?, ?)";
                    db.run(insertSql, [userId, followingId], err => {
                        if (err) reject(err);
                        else resolve({ following: true });
                    });
                }
            }).catch(reject);
        });
    }

    // Method to get count of followers for a user
    static async getFollowersCount(userId) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT COUNT(*) AS followersCount FROM Follows WHERE following_id = ?";
            db.get(sql, [userId], (err, row) => {
                if (err) reject(err);
                else resolve(row.followersCount);
            });
        });
    }

    // Method to get count of users a user is following
    static async getFollowingCount(userId) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT COUNT(*) AS followingCount FROM Follows WHERE follower_id = ?";
            db.get(sql, [userId], (err, row) => {
                if (err) reject(err);
                else resolve(row.followingCount);
            });
        });
    }
}

module.exports = Follow;
