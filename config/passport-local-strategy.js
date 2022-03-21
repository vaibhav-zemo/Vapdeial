const passport = require('passport');

const Localstrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new Localstrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log("Error while finding user ---> Passport");
                return done(err);
            }

            if (!user || user.password != password) {
                console.log("Invalid Username/password");
                return done(null, false);
            }

            return done(null, user);
        });
    }
));


passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/user/sign_in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}


passport.serializeUser(function (user, done) {
    done(null, user.id);
});


passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("Error while finding user ---> Passport");
            return done(err);
        }

        return done(null, user);
    })
});

module.exports = passport;


