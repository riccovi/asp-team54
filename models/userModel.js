const { sequelize, DataTypes } = require('sequelize');

const UserRole = {
    Student: "student",
    Recruiter: "recruiter",
    
  };

const User = sequelize.define('users', {
    username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
     type: DataTypes.STRING, enum: Object.values(UserRole), required: true 
    },
});

module.exports = User;
