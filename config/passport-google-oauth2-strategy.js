const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const user  = require('../models/user');
const User = require('../models/user');
const env = require('./enviroment');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:env.google_clientID,
    clientSecret:env.google_clientSecret,
    callbackURL:env.google_callbackURL,

    },function (accessToken,refreshToken,profile,done) {
        // find user
        User.findOne({email:profile.emails[0].value}).exec(function (err,user) {
            if (err) {
                console.log("Error in google Strategy passport",err);
                return;
            }
            
            console.log(profile);

            if (user) {
                // if found, set this user as req.user
                return done(null,user);
            }
            else{
                // if not found, create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function (err,user) {
                    if(err){
                        console.log("Error in creating user google strategy-passport",err);
                        return;
                    }

                    return done(null,user);
                })
            }
        });
    }

));

module.exports = passport;