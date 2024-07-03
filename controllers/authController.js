var express = require("express"),
  User = require("../models/user"),
  config = require("../config.js"),
  jwt = require("jwt-simple");

  exports.login = async function (req, res) {
    console.log("Logged In");
  
    try {
      const user = await User.findOne({ username: req.body.username });
  
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed. User not found.' });
      }
  
      const payload = {
        id: user.id,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
      };
      const token = jwt.encode(payload, config.jwtSecret);
  
      return res.json({ token: token });
    } catch (err) {
      console.error('Error Happened In auth /token Route', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
exports.register = function (req, res) {
  User.register(
    new User({ name: req.body.name, username: req.body.username }),
    req.body.password,
    function (err, msg) {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Successful" });
      }
    }
  );
};
