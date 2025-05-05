const express = require('express');
const router = express.Router();
const passport = require("passport");  
const {register} = require('../controllers/userController');

router.post('/register',register);
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        req.login(user, (err) => {
            if (err) return next(err);

            // ✅ Ensure session is saved before sending the response
            req.session.save((err) => {
                if (err) return next(err);

                return res.json({
                    success: true,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        isAdmin: user.isAdmin,
                    },
                });
            });
        });
    })(req, res, next);
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
