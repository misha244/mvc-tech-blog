const { Post, User, Comment } = require("../../models");

const renderHome = async (req, res) => {
  try {
    const { isLoggedIn } = req.session;
    const postData = await Post.findAll({
      include: [{ model: User }, { model: Comment }],
    });
    const posts = postData.map((post) => {
      return post.get({ plain: true });
    });
    const sortedPosts = posts.reverse();

    res.render("home", { isLoggedIn, sortedPosts });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to render" });
  }
};

const renderPost = async (req, res) => {
  try {
    const { isLoggedIn, username } = req.session;

    const { id } = req.params;

    const postData = await Post.findOne({
      where: { id },
      include: [{ model: User }, { model: Comment, include: User }],
    });

    const postObj = postData.get({ plain: true });

    res.render("post", { isLoggedIn, username, postObj });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to render" });
  }
};

const renderLogin = (req, res) => {
  try {
    res.render("login", {
      layout: "login",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to render" });
  }
};

const renderSignup = (req, res) => {
  try {
    res.render("signup", {
      layout: "signup",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to render" });
  }
};

module.exports = { renderHome, renderPost, renderLogin, renderSignup };
