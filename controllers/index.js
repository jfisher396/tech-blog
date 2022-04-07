const express = require("express");
const router = express.Router();
const userRoutes = require('./api/user-routes');
const postRoutes = require('./api/post-routes');
const commentRoutes = require('./api/comment-routes');

router.use("/api/users", userRoutes);
router.use("/api/posts", postRoutes);
router.use("/api/comments", commentRoutes)

module.exports = router;