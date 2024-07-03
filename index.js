// const express = require("express"),
//   app = express(),
//   authRoute = require("./routes/authRoute"),
//   postRoute = require("./routes/postRoute"),
//   auth = require('./middleware/auth.js')(),
//   mongoose = require("mongoose"),
//   passport = require("passport"),
//   localStrategy = require("passport-local"),
//   User = require("./models/user"),
//   bodyParser = require("body-parser");
//   const session = require('express-session');


import express from 'express';
import authRoute from './routes/authRoute.js';
import postRoute from './routes/postRoute.js';
import {auth} from './middleware/auth.js';
import mongoose from 'mongoose';
import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/user.js';
import bodyParser from 'body-parser';
import session from 'express-session';

import { Strategy as LocalStrategy } from 'passport-local'; 

const app = new express();

mongoose.connect("mongodb://127.0.0.1/sampledb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 
// Set up session middleware
app.use(session({
  secret: 'nodejspass', // Replace with your own secret key
  resave: false, // Forces the session to be saved back to the session store
  saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
  cookie: { secure: false } // Set to true if using https
}));

app.use(auth.initialize());
app.use(passport.initialize());
app.use(passport.session());

// Passport Config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(authRoute);
app.use(postRoute);

app.listen(3001, () => {
  console.log("Server Started at 3001");
});
