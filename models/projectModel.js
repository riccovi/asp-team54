const { sequelize, DataTypes } = require('sequelize');


const Project = sequelize.define('Project', {
  projectTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectPicture: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
});

module.exports = Project;