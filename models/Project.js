const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./pixelPulseDB.sqlite3');

class Project {

    static async createProject(projectData) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO Projects (user_id, title, description, code, project_picture) VALUES (?, ?, ?, ?, ?)";
            db.run(sql, 
                [projectData.user_id, projectData.title, projectData.description, projectData.code, projectData.project_picture], 
                function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    }

    static async findById(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    Projects.*, 
                    Users.profile_picture as user_profile_picture,
                    COUNT(DISTINCT Likes.id) as likes,
                    COUNT(DISTINCT Comments.id) as comments,
                    (
                      SELECT GROUP_CONCAT(content, '|||')
                      FROM (
                        SELECT content
                        FROM Comments
                        WHERE project_id = Projects.id
                        ORDER BY created_at DESC
                        LIMIT 2
                      )
                    ) as latest_comments
                FROM Projects 
                LEFT JOIN Users ON Projects.user_id = Users.id 
                LEFT JOIN Likes ON Projects.id = Likes.project_id
                LEFT JOIN Comments ON Projects.id = Comments.project_id
                WHERE Projects.id = ?
                GROUP BY Projects.id`;
    
            db.get(sql, [id], (err, row) => {
                if (err) reject(err);
                else {
                    if (row) {
                        // Split latest_comments into an array
                        row.latest_comments = row.latest_comments ? row.latest_comments.split('|||') : [];
                    }
                    resolve(row);
                }
            });
        });
    }
    

    static async deleteProjectById(id, userId) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM Projects WHERE id = ? AND user_id = ?";
            db.run(sql, [id, userId], function(err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });
    }

    static async editProjectById(projectData) {
        return new Promise((resolve, reject) => {
            const { title, description, code, id, user_id, project_picture } = projectData;
    
            let sql = `UPDATE Projects SET title = ?, description = ?, code = ? WHERE id = ? AND user_id = ?`;
            let values = [title, description, code, id, user_id];
    
            if (project_picture !== undefined) {
                // If project_picture is present in projectData, include it in the update.
                sql = `UPDATE Projects SET title = ?, description = ?, code = ?, project_picture = ? WHERE id = ? AND user_id = ?`;
                values.push(project_picture);
            }
    
            db.run(sql, values, function(err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });
    }
    
    
  

}

module.exports = Project;
