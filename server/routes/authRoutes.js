const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { validateRegister, validateLogin } = require("../validators/authValidator");
const { registerUser, loginUser, getProfile, updateProfile, changePassword } = require("../controllers/authController");

router.get("/", (req, res) => res.json({ success: true, message: "Authentication Route Working" }));
router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);
module.exports = router;

