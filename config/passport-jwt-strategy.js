const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env = require('./enviroment');

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_screat,
}

passport.use(new JWTStrategy(opts,function (jwtPayLoad,done) {
    User.findById(jwtPayLoad._id,function (err,user) {
        if (err) {console.log("Error in finding user form JWT");return;}

        if (user) {
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })
}));

module.exports = passport;