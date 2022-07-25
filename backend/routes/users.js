const express = require("express");
const { login, signUp, logout } = require("../controllers/auth.controller");
const { getMe, getUser, publicProfile } = require("../controllers/user.controller");
const { protect } = require("../middlewares/isLogin");

const router = express.Router();

// Auth System
router.post("/signup", signUp);
router.post("/login", login);

router.get("/profile/:id", publicProfile);

//  User Profile
router.use(protect);

router.get("/me", getMe, getUser);
router.get("/me/logout", logout);

module.exports = router;
