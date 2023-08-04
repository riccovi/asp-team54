const Comment = require('../models/Comment');
const Service = require('../models/Service');

class UserService {
   

    static async  buildUserStructure(data) {
        let users = [];
        let currentUserId = -1;
        let currentUser = null;
    
        for (let row of data) {
            if (row.userId !== currentUserId) {
                currentUserId = row.userId;
                // Create a new user
                currentUser = {
                    id: row.userId,
                    username: row.username,
                    email: row.email,
                    role: row.role,
                    profile_picture: row.profile_picture,
                    projects: [],
                };
                users.push(currentUser); // Add the new user to the users array
            }
    
            // If the row contains project data, add it to the current user's projects
            if (row.title && row.description && row.project_picture && row.projectId) {
                let project = {
                    id: row.projectId,
                    title: row.title,
                    description: row.description,
                    project_picture: row.project_picture,
                    likes: row.likes,
                    comments: [],
                };
    
                // Fetch comments for the project and add them to the project
               
                let comments = await Comment.findByProjectId(row.projectId);
               
                
                if (comments) {
                comments = comments.map(comment => {
                    return {
                        ...comment,
                        user_id: comment.user_id // Add the user id to the comment
                    };
                });
                project.comments = comments;
            }
                currentUser.projects.push(project);
            }
        }
        return users;
    }
}

module.exports = UserService;