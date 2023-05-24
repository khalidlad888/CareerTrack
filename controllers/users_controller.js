// import User model
const User = require('../models/user');

//Rendering the sign-in and sign-up pages
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    };
    return res.render('user_sign_up', {
        title: " | Sign-Up"
    });
};
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    };
    return res.render('user_sign_in', {
        title: " | Sign-In"
    });
};

//get the sign up data from sign up form action
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    try {
        User.findOne({ email: req.body.email }).then((user) => {
            if (!user) {
                let user = User.create(req.body);
                return res.redirect('/users/sign-in');
            } else {
                return res.redirect('back');
            }
        })
    } catch (err) {
        console.log("Error in creating user", err);
    };
};

//get the sign-in data and create a session for the user
module.exports.createSession = function (req, res) {
    return res.redirect('/');
};

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(err, "Error in logging out");
        };

        return res.redirect('/');
    });
};