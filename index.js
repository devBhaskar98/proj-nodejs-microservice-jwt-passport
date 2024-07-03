const express = require("express"),
  app = express(),
  authRoute = require("./routes/authRoute"),
  postRoute = require("./routes/postRoute"),
  auth = require('./middleware/auth.js')(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  User = require("./models/user"),
  bodyParser = require("body-parser");
  const session = require('express-session');

mongoose.connect("mongodb://127.0.0.1/sampledb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 
// Set up session middleware
app.use(session({
  secret: 'your-secret-key', // Replace with your own secret key
  resave: false, // Forces the session to be saved back to the session store
  saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
  cookie: { secure: false } // Set to true if using https
}));

app.use(auth.initialize());
// Passport Config
passport.use(new localStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(authRoute);
app.use(postRoute);

app.listen(3001, () => {
  console.log("Server Started at 3001");
});
