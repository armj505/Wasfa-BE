const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const localStrategy = new LocalStrategy(
  // Check username and password in the database and return the user if it matches
  { usernameField: "username" },
  async (username, password, done) => {
    try {
      const user = await User.findOne({
        // this lets user to authenticate using either email or username
        $or: [{ username: username }, { email: username }],
      });
      if (!user) return { message: "Username or Password are not found" };
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (!passwordsMatch) return done(null, false);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      // exp is a predefined registered claim in JWT tokens
      if (Date.now() / 1000 < payload.exp) {
        const user = await User.findById(payload._id);

        if (!user) done(null, false);
        return done(null, user); // added return here. If not added, it might not work.
      }
      return done(null, false);
    } catch (error) {
      return done(error);
    }
  }
);

module.exports = { localStrategy, jwtStrategy };
