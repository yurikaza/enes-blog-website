const express = require("express");
const { createPost, likePost, watchPost, sendImage, getAll } = require("../controllers/post.controller");
const { admin } = require("../middlewares/isAdmin");
const { protect } = require("../middlewares/isLogin");

const router = express.Router();

router.use(protect);
router.post("/likePost/:id", likePost);
router.get("/seePost/:id", watchPost);
router.get("/getAll", getAll);

// Type Blog Post
//router.use(admin);
router.post("/createPost", createPost);
router.post("/sendImage", sendImage);

module.exports = router;
