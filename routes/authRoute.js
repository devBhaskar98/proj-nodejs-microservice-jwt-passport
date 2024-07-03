import User from '../models/user.js'; // Adjust the path to where your User model is located
import express from 'express';
import passport from 'passport';
import {login, register, logout} from '../controllers/authController.js'; // Adjust the path to your authController

const router = express.Router();

router.post("/login", passport.authenticate("local") ,  login)
router.post("/register", register)

// Logout route handler
// Logout route handler
router.get('/logout', passport.authenticate("local"), logout);
  

export default router;