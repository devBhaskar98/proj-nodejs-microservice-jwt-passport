import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../models/user.js'; // Adjust the path to where your User model is located
import cfg from '../config.js'; // Adjust the path to your config

const { ExtractJwt, Strategy } = passportJWT;

const params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('jwt')
};

const auth = () => {
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
    initialize() {
      return passport.initialize();
    },
    authenticate() {
      return passport.authenticate('jwt', cfg.jwtSession);
    }
  };
};

export default auth();
