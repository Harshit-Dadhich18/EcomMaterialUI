const EcomUser = require('../models/user.js');

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usrenameCheck = await EcomUser.findOne({ username });
        if (usrenameCheck)
            return res.json({ msg: "Username is already used", status: false })
        const emailCheck = await EcomUser.findOne({ email });
        if (emailCheck)
            return res.json({ msg: "Email already exist", status: false })
        const user = await new EcomUser({ username, email });
        await EcomUser.register(user, password);
        return res.status(201).json({
            msg: "Successfully registered!",
            status: true,
            isAdmin: user.isAdmin,
            // user: { _id, username, email }
        });
    }
    catch (e) {
        console.log("error in user controller ",e.message)
    }
}



// module.exports.login = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await Users.findOne({ username });
//         if (!user)
//             return res.json({ msg: "Incorrect Username or Password", status: false });
//         const isPassword = await user.authenticate(password)
//         if (!isPassword)
//             return res.json({ msg: "Incorrect Username or Password", status: false });
//         delete user.password;
//         return res.json({ status: true, user })
//     }
//     catch (error) {
//         next(error);
//     }
// }

// module.exports.logout = (req, res) => {
//     req.logout(function (err) {
//         if (err) {
//             return next(err)
//         }
//         req.flash('success', 'Goodbye!');
//         res.redirect('/login');
//     })
// }