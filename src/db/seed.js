const sequelize = require("../config/connection");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

const users = require("./users.json");
const posts = require("./posts.json");
const comments = require("./comments.json");

const seed = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(users);

  console.log("Seeded users");

  await Post.bulkCreate(posts);

  console.log("Seeded posts");

  await Comment.bulkCreate(comments);

  console.log("Seeded comments");

  process.exit(0);
};

seed();
