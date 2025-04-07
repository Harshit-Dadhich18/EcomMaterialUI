const express = require('express');
const router = express.Router();
const passport = require("passport");  
const {register} = require('../controllers/userController');

router.post('/register',register);
router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ success: true, user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        isAdmin: req.user.isAdmin,  // Send isAdmin to the frontend
    } });
});

router.post("/logout", (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.json({ success: true, message: "Logged out successfully" });
    });
});

router.get("/status", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ isAuthenticated: true, user: req.user });
    } else {
        res.status(401).json({ isAuthenticated: false });
    }
});

module.exports = router;