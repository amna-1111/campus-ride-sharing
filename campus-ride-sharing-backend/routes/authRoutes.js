const express = require("express");
const router = express.Router();
const {
  register,
  login,
  changePassword,
  getUserById
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/change-password", protect, changePassword);
router.get("/user/:id", getUserById);

module.exports = router;
