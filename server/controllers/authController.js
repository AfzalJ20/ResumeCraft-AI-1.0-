const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email, profileImage: user.profileImage, createdAt: user.createdAt });
const issueToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ success: false, message: "Email already registered" });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
    return res.status(201).json({ success: true, message: "User registered successfully", token: issueToken(user._id), user: publicUser(user) });
  } catch (error) { return res.status(500).json({ success: false, message: "Server Error" }); }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ success: false, message: "Invalid email or password" });
    return res.status(200).json({ success: true, message: "Login successful", token: issueToken(user._id), user: publicUser(user) });
  } catch (error) { return res.status(500).json({ success: false, message: "Server Error" }); }
};

exports.getProfile = async (req, res) => {
  try { const user = await User.findById(req.user.id).select("-password"); return res.json({ success: true, user }); }
  catch (error) { return res.status(500).json({ success: false, message: "Server Error" }); }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, profileImage } = req.body;
    if (!name || !email) return res.status(400).json({ success: false, message: "Name and email are required" });
    const existing = await User.findOne({ email, _id: { $ne: req.user.id } });
    if (existing) return res.status(400).json({ success: false, message: "Email already registered" });
    const user = await User.findByIdAndUpdate(req.user.id, { name, email, profileImage: profileImage || "" }, { new: true, runValidators: true });
    return res.json({ success: true, message: "Profile updated", user: publicUser(user) });
  } catch (error) { return res.status(500).json({ success: false, message: "Server Error" }); }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) return res.status(400).json({ success: false, message: "New password must be at least 6 characters" });
    const user = await User.findById(req.user.id);
    if (!(await bcrypt.compare(currentPassword || "", user.password))) return res.status(400).json({ success: false, message: "Current password is incorrect" });
    user.password = await bcrypt.hash(newPassword, 10); await user.save();
    return res.json({ success: true, message: "Password updated successfully" });
  } catch (error) { return res.status(500).json({ success: false, message: "Server Error" }); }
};

