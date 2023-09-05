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
                else {
                    const projectId = this.lastID;
    
                    // Assuming tags are sent as an array of tag names in projectData
                    if (projectData.tags && projectData.tags.length) {
                        // For simplicity, I'm going to use a naive approach here. In a real-world scenario, you'd probably want to check if tags already exist.
                        let insertTagPromises = projectData.tags.map(tagName => {
                            return new Promise((resolve, reject) => {
                                const insertTagSql = "INSERT OR IGNORE INTO Tags (name) VALUES (?)";  // The IGNORE keyword allows the query to continue if the tag already exists.
                                db.run(insertTagSql, [tagName], function(err) {
                                    if (err) reject(err);
                                    else resolve(this.lastID);
                                });
                            });
                        });
    
                        Promise.all(insertTagPromises).then(tagIds => {
                            let insertProjectTagPromises = tagIds.map(tagId => {
                                return new Promise((resolve, reject) => {
                                    const insertProjectTagSql = "INSERT INTO Project_Tags (project_id, tag_id) VALUES (?, ?)";
                                    db.run(insertProjectTagSql, [projectId, tagId], function(err) {
                                        if (err) reject(err);
                                        else resolve();
                                    });
                                });
                            });
    
                            Promise.all(insertProjectTagPromises).then(() => {
                                resolve(projectId);  // Return the projectId after all tags are inserted.
                            });
                        });
                    } else {
                        resolve(projectId);  // No tags to add.
                    }
                }
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
    
                const sqlTags = `SELECT Tags.name FROM Tags 
                JOIN Project_Tags ON Tags.id = Project_Tags.tag_id 
                WHERE Project_Tags.project_id = ?`;

                db.all(sql, [id], (err, rows) => {
                    if (err) return reject(err);
        
                    const row = rows[0];  // Assuming you want the first result
                    if (!row) {
                        return resolve(null); // or reject, depending on your case if no project is found
                    }
        
                    // Next, get the tags
                    db.all(sqlTags, [id], (err, tags) => {
                        if (err) return reject(err);
        
                        row.tags = tags.map(tag => tag.name);  // Convert the tags result into a simple array of tag names
                        resolve(row);
                    });
        });
    });
    }
    

    static async deleteProjectById(id, userId) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM Projects WHERE id = ? AND user_id = ?";
            db.run(sql, [id, userId], function(err) {
                if (err) reject(err);
                else {
                    // Remove associated tags from Project_Tags table after the project has been deleted
                    const deleteTagsSQL = `DELETE FROM Project_Tags WHERE project_id = ?`;
                    db.run(deleteTagsSQL, [id], function(err) {
                        if (err) reject(err);
                        else resolve(this.changes);
                    });
                }
            });
        });
    }

    static async editProjectById(projectData) {
        return new Promise(async (resolve, reject) => {
            const { title, description, code, id, user_id, project_picture, tags } = projectData;
    
            let sql = `UPDATE Projects SET title = ?, description = ?, code = ? WHERE id = ? AND user_id = ?`;
            let values = [title, description, code, id, user_id];
    
            if (project_picture !== undefined) {
                // If project_picture is present in projectData, include it in the update.
                sql = `UPDATE Projects SET title = ?, description = ?, code = ?, project_picture = ? WHERE id = ? AND user_id = ?`;
                values.push(project_picture);
            }
    
            db.run(sql, values, async function(err) {
                if (err) reject(err);
                else {
                    if (tags && tags.length) {
                        // Remove old tags for this project
                        const deleteOldTagsSQL = `DELETE FROM Project_Tags WHERE project_id = ?`;
                        db.run(deleteOldTagsSQL, [id], function(err) {
                            if (err) reject(err);
                            else {
                                // Add new tags for this project
                                let insertTagPromises = tags.map(tagName => {
                                    return new Promise((resolve, reject) => {
                                        const insertTagSql = "INSERT OR IGNORE INTO Tags (name) VALUES (?)";
                                        db.run(insertTagSql, [tagName], function(err) {
                                            if (err) reject(err);
                                            else resolve(this.lastID);
                                        });
                                    });
                                });
    
                                Promise.all(insertTagPromises).then(tagIds => {
                                    let insertProjectTagPromises = tagIds.map(tagId => {
                                        return new Promise((resolve, reject) => {
                                            const insertProjectTagSql = "INSERT INTO Project_Tags (project_id, tag_id) VALUES (?, ?)";
                                            db.run(insertProjectTagSql, [id, tagId], function(err) {
                                                if (err) reject(err);
                                                else resolve();
                                            });
                                        });
                                    });
    
                                    Promise.all(insertProjectTagPromises).then(() => {
                                        resolve(this.changes);
                                    });
                                });
                            }
                        });
                    } else {
                        resolve(this.changes);
                    }
                }
            });
        });
    }
    
    
    
  

}

module.exports = Project;
