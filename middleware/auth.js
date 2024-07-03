const passport = require('passport');
var passportJWT = require("passport-jwt");
const User = require('../models/user'); // Adjust the path to where your User model is located
const cfg = require('../config.js'); // Adjust the path to your config

var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("jwt")
};
module.exports = function() {
  const strategy = new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user) {
        return done(new Error('UserNotFound'), null);
      } else if (payload.expire <= Date.now()) {
        return done(new Error('TokenExpired'), null);
      } else {
        return done(null, user);
      }
    } catch (err) {
      return done(err, null);
    }
  });

  passport.use(strategy);

  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate('jwt', cfg.jwtSession);
    }
  };
};
