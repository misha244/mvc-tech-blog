const { Router } = require("express");

const router = Router();

const auth = require("../../middlewares/auth");
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../../controllers/api/blog-posts");

router.get("/", getAllPosts);

router.get("/:id", getPost);

router.post("/", auth, createPost);

router.put("/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

module.exports = router;
