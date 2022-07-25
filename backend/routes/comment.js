const express = require("express");
const { createComment, replyComment } = require("../controllers/comment.controller");
const { protect } = require("../middlewares/isLogin");

const router = express.Router();

// Type Blog Post
router.use(protect);
router.post("/createComment/:id", createComment);
router.post("/replyComment/:id/:comment", replyComment);

module.exports = router;
