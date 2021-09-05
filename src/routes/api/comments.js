const { Router } = require("express");

const router = Router();

const auth = require("../../middlewares/auth");
const {
  createComment,
  updateComment,
  deleteComment,
} = require("../../controllers/api/comments");

router.post("/", auth, createComment);
router.put("/:id", auth, updateComment);
router.delete("/:id", auth, deleteComment);

module.exports = router;
