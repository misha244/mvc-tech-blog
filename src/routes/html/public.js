const { Router } = require("express");

const router = Router();

const {
  renderHome,
  renderPost,
  renderLogin,
  renderSignup,
} = require("../../controllers/html/public");

router.get("/login", renderLogin);
router.get("/signup", renderSignup);
router.get("/posts/:id", renderPost);
router.get("/", renderHome);

module.exports = router;
