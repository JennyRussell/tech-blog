
const blog = require("./blog.json");
const users = require("./users.json");
const sequelize = require("../config/connection");
const User = require("../models/User");
const BlogPost = require("../models/BlogPost");


const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    
    await User.bulkCreate(users, {
      individualHooks: true,
      returning: true,
    });
    
    await BlogPost.bulkCreate(blog, {
      individualHooks: true,
      returning: true,
    });


    process.exit(0);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

seedDatabase();