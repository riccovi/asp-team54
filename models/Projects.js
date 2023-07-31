const db = require('../db.js');

class Project {
    // Get all projects
    static findAll(callback) {
        db.all('SELECT * FROM Projects', [], (err, rows) => {
            // Returns all rows from the Projects table
            callback(err, rows);
        });
    }

    // Get a single project by its id
    static findById(id, callback) {
        db.get('SELECT * FROM Projects WHERE id = ?', [id], (err, row) => {
            // Returns the project with the specified id
            callback(err, row);
        });
    }

    // Create a new project
    static create(data, callback) {
        const { user_id, title, description, code, project_image } = data;
        db.run(
            'INSERT INTO Projects(user_id, title, description, code, project_picture) VALUES(?, ?, ?, ?, ?)',
            [user_id, title, description, code, project_image],
            function(err) {
                // Returns the id of the newly created project
                callback(err, this.lastID);
            }
        );
    }

    // Update an existing project
    static update(id, data, callback) {
        const { user_id, title, description, code, project_image } = data;
        db.run(
            'UPDATE Projects SET user_id = ?, title = ?, description = ?, code = ?, project_image = ? WHERE id = ?',
            [user_id, title, description, code, project_image, id],
            function(err) {
                // Returns the number of rows changed
                callback(err, this.changes);
            }
        );
    }

    // Delete a project
    static delete(id, callback) {
        db.run('DELETE FROM Projects WHERE id = ?', [id], function(err) {
            // Returns the number of rows deleted
            callback(err, this.changes);
        });
    }
}

module.exports = Project;
