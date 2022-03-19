const passport = require('passport');

const Localstrategy = require('passport-local').Strategy;

const user = require('../models/user');

passport.use(new Localstrategy({
    usernameField: email
},
    function (email, password, done) {
        user.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log("Error while finding user ---> Passport");
                return done(err);
            }

            if (!user || user.password != password) {
                console.log("Invalid Username/password");
                return done(null, false);
            }

            return done(null, user);
        })
    }
));



passport.serializeUser(function (user, done) {
    return done(null, user.id);
});


passport.deserializeUser(function (id, done) {
    user.findById(id, function (err, user) {
        if (err) {
            console.log("Error while finding user ---> Passport");
            return done(err);
        }

        return done(null,user);
    })
});

module.exports = passport;


