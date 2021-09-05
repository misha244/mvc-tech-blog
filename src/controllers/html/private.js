const { User, Post, Comment } = require("../../models");

const renderDashboard = async (req, res) => {
  try {
    const { userId, firstName, lastName } = req.session;

    const postData = await Post.findAll({
      where: { user_id: userId },
      include: [{ model: User }, { model: Comment }],
    });

    const posts = postData.map((post) => {
      const newPost = post.get({ plain: true });

      return newPost;
    });

    return res.render("dashboard", {
      layout: "dashboard",
      firstName,
      lastName,
      posts,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Failed to render" });
  }
};

const renderCreatePost = (req, res) => {
  try {
    const { firstName } = req.session;
    res.render("create-post", { layout: "dashboard", firstName });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to render" });
  }
};

const renderEditPost = async (req, res) => {
  try {
    const { firstName, userId } = req.session;
    const { id } = req.params;

    const data = await Post.findOne({ where: { id, user_id: userId } });

    if (!data) {
      return res.redirect("/dashboard");
    }

    const post = data.get({ plain: true });

    res.render("edit-post", { layout: "dashboard", firstName, post });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to render" });
  }
};

const renderEditComment = async (req, res) => {
  try {
    const { firstName, userId } = req.session;
    const { id } = req.params;

    const data = await Comment.findOne({ where: { id, user_id: userId } });

    if (!data) {
      return res.redirect("/");
    }

    const comment = data.get({ plain: true });

    res.render("edit-comment", { layout: "main", firstName, comment });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to render" });
  }
};

module.exports = {
  renderDashboard,
  renderCreatePost,
  renderEditPost,
  renderEditComment,
};
