const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//registering a user

//actual route  /api/users/     http://localhost:5000/api/users

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    //if user already exists

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already Exists' });
      }

      user = {
        name,
        email,
        password,
      };

      // var h1= 65;
      // var obj={
      //     h1
      // };
      // obj={
      //     h1:65
      // }

      // Encrypt password with bcrypt

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      const newUser = new User(user);

      await newUser.save();

      const payload = {
        user: {
          id: newUser._id,
        },
      };

      const jwtSecret = config.get('JWT_SECRET');
      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            return res.json({ token });
          }
        }
      );
    } catch (err) {
      console.error(err);
      return res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
