
const express = require('express');
const { Sequelize, Model, DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'mysql',
});

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  { sequelize, modelName: 'user' }
);

class Project extends Model {}
Project.init(
  {
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    code: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  { sequelize, modelName: 'project' }
);

class Comment extends Model {}
Comment.init(
  {
    user_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  { sequelize, modelName: 'comment' }
);

class Like extends Model {}
Like.init(
  {
    user_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
  },
  { sequelize, modelName: 'like' }
);

class Badge extends Model {}
Badge.init(
  {
    user_id: DataTypes.INTEGER,
    badge_type: DataTypes.STRING,
    created_at: DataTypes.DATE,
  },
  { sequelize, modelName: 'badge' }
);

class JobPosting extends Model {}
JobPosting.init(
  {
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  { sequelize, modelName: 'job_posting' }
);

User.hasMany(Project, { foreignKey: 'user_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });
User.hasMany(Like, { foreignKey: 'user_id' });
User.hasMany(Badge, { foreignKey: 'user_id' });
User.hasMany(JobPosting, { foreignKey: 'user_id' });

Project.belongsTo(User, { foreignKey: 'user_id' });
Project.hasMany(Comment, { foreignKey: 'project_id' });
Project.hasMany(Like, { foreignKey: 'project_id' });

Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(Project, { foreignKey: 'project_id' });

Like.belongsTo(User, { foreignKey: 'user_id' });
Like.belongsTo(Project, { foreignKey: 'project_id' });

Badge.belongsTo(User, { foreignKey: 'user_id' });

JobPosting.belongsTo(User, { foreignKey: 'user_id' });

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get('/projects', async (req, res) => {
  const projects = await Project.findAll();
  res.json(projects);
});

app.post('/projects', async (req, res) => {
  const { user_id, title, description, code } = req.body;

  try {
    const project = await Project.create({
      user_id,
      title,
      description,
      code,
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.post('/projects', async (req, res) => {
  const { user_id, title, description, code } = req.body;

  try {
    const project = await Project.create({
      user_id,
      title,
      description,
      code,
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
