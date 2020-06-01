const passport = require('passport');
const User = require('../models/user');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ googleId: profile.id }, function(err, user){
        if(err) return cb(err);
        if(user) {
            return cb(null, user);
        }
        else {
            var newUser = new User({
                googleId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName
            });
            newUser.save(function(){
                if(err) return cb(err);
                return cb(null, newUser);
            })
        }
    })
  }
));

passport.serializeUser(function(user, done){
    return done(null, user._id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        return done(err, user);
    });
});