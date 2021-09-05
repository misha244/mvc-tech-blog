const { Post, User, Comment } = require("../../models");

const getAllPosts = async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }, { model: Comment }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Failed to get all posts" });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id, {
      include: [{ model: User }, { model: Comment }],
    });

    if (!post) {
      return res.status(404).json({ error: "Post does not exist" });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Failed to get post" });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const { userId } = req.session;

    if (!userId) {
      return res.status(404).json({ error: "User is not logged in" });
    }

    if (!title || !body) {
      return res.status(404).json({ error: "Unable to add a post" });
    }

    const newPost = await Post.create({
      title,
      body,
      user_id: userId,
    });

    if (!newPost) {
      return res.status(404).json({ error: "Unable to add a post" });
    }

    res.status(200).json({ success: "Post added successfully." });
  } catch (error) {
    console.log(`[ERROR]: ${error.message}`);
    res.status(500).json({
      error: "Failed to create a post",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const { userId } = req.session;
    const { id } = req.params;

    const post = { title, body };

    if (!userId) {
      return res.status(404).json({ error: "User is not logged in" });
    }

    if (!title || !body) {
      return res.status(404).json({ error: "Unable to update post" });
    }

    const [updatedPost] = await Post.update(post, { where: { id } });

    if (!updatedPost) {
      return res.status(404).json({ error: "Post does not exist" });
    }

    res.status(200).json({ success: "Post updated successfully." });
  } catch (error) {
    console.log(`[ERROR]: ${error.message}`);
    res.status(500).json({
      error: "Failed to create a post",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Post.destroy({
      where: {
        id,
      },
    });

    if (!data) {
      return res.status(404).json({ error: "Post does not exist" });
    }

    return res.status(200).json({ success: "Delete successful" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Failed to delete post" });
  }
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
