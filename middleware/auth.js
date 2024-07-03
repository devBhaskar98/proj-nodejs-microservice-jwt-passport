// auth.js
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.js'; // Adjust path as per your project structure
import cfg from '../config.js'; // Adjust path as per your project structure

const jwtOptions = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const strategy = new JwtStrategy(jwtOptions, async (payload, done) => {
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

export const auth = {
  initialize: () => passport.initialize(),
  authenticate: () => passport.authenticate('jwt', { session: false })
};

