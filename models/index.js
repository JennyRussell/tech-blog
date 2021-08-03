const BlogPost = require("./BlogPost");

const User = require("./User");


User.hasMany(BlogPost, {
 foreignKey: "user_id",

});

BlogPost.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { BlogPost, User };