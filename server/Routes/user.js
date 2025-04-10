const express = require('express');
const router = express.Router();
const passport = require("passport");  
const {register} = require('../controllers/userController');

router.post('/register',register);
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);  
        }

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });  
        }

        req.login(user, (err) => {  // Establish a session after successful login
            if (err) {
                return next(err);  // Handle errors during session creation
            }

            // Send a successful response along with user data
            return res.json({
                success: true,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin,  // Send isAdmin to the frontend
                },
            });
        });
    })(req, res, next);  // Call authenticate middleware manually
});


router.post("/logout", (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.json({ success: true, message: "Logged out successfully" });
    });
});

router.get("/status", (req, res) => {
    console.log("Session check - isAuthenticated:", req.isAuthenticated());
    console.log("User from session:", req.user);
    if (req.isAuthenticated()) {
        res.json({ isAuthenticated: true, user: req.user });
    } else {
        res.status(401).json({ isAuthenticated: false });
    }
});

module.exports = router;
