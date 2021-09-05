const { Comment } = require("../../models");

const createComment = async (req, res) => {
  try {
    const { message, post_id } = req.body;
    const { userId } = req.session;

    if (!userId) {
      return res.status(404).json({ error: "User is not logged in" });
    }

    if (!message || !post_id) {
      return res.status(404).json({ error: "Unable to add a comment" });
    }

    const newComment = await Comment.create({
      message,
      post_id,
      user_id: userId,
    });

    if (!newComment) {
      return res.status(404).json({ error: "Unable to add a comment" });
    }

    res.status(200).json({ success: "Comment added successfully." });
  } catch (error) {
    console.log(`[ERROR]: ${error.message}`);
    res.status(500).json({
      error: "Failed to create a comment",
    });
  }
};

const updateComment = async (req, res) => {
  try {
    const { message } = req.body;
    const { userId } = req.session;
    const { id } = req.params;

    if (!userId) {
      return res.status(404).json({ error: "User is not logged in" });
    }

    const [updatedComment] = await Comment.update(
      { message },
      { where: { id } }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: "Comment does not exist" });
    }

    res.status(200).json({ success: "Comment updated successfully." });
  } catch (error) {
    console.log(`[ERROR]: ${error.message}`);
    res.status(500).json({
      error: "Failed to update comment",
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Comment.destroy({
      where: {
        id,
      },
    });

    if (!data) {
      return res.status(404).json({ error: "Comment does not exist" });
    }

    return res.status(200).json({ success: "Delete successful" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Failed to delete comment" });
  }
};

module.exports = { createComment, updateComment, deleteComment };
