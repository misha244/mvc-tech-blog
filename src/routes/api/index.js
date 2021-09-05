const { Router } = require("express");

const blogPostRoutes = require("./blog-posts");
const commentsRoutes = require("./comments");

const router = Router();

router.use("/posts", blogPostRoutes);
router.use("/comments", commentsRoutes);

module.exports = router;
