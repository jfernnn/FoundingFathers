const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // a user has logged in with OAuth...
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