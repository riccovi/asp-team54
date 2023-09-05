// searchController.js

const Service = require('../models/Service');
const UserService = require('../services/userService');

async function searchUsers(req, res, next) {
    const searchTerm = req.query.searchTerm ? req.query.searchTerm.toLowerCase() : '';
    try {
        const data = await Service.getLeaderboard();
        const filteredUsers = await UserService.buildUserStructure(data);  // Assuming you have a method to get all users
        const currentUser = req.session.user ? req.session.user : null;
        const users = filteredUsers.filter(user => {
            return user.username.toLowerCase().includes(searchTerm) || 
                   user.projects.some(project => project.title.toLowerCase().includes(searchTerm));
        });
        
        res.json({ users, currentUser});
    } catch (err) {
        err.message = 'Error while searching users';
        next(err);
    }
}
module.exports = {
    searchUsers
};
