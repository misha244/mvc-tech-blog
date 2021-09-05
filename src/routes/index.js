const { Router } = require("express");

const apiRoutes = require("./api");
const htmlRoutes = require("./html");
const authRoutes = require("./auth");

const router = Router();

router.use("/auth", authRoutes);
router.use("/api", apiRoutes);
router.use("/", htmlRoutes);

module.exports = router;
