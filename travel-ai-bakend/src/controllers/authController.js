const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../repositories/userRepository');
const _Response = require('../utils/_Response');
const { ResponseCode } = require('../constants/ResponseCode');
const User = require('../models/userModel');

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await findUserByEmail(email);
    if (user) {
      return _Response.send(res, {
        status: ResponseCode.CONFLICT,
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    await newUser.save();

    return _Response.send(res, {
      status: ResponseCode.SUCCESS,
      message: 'User registered successfully',
      data: { userId: newUser._id },
    });
  } catch (error) {
    return _Response.send(res, {
      status: ResponseCode.INTERNAL_ERROR,
      message: 'Failed to register user',
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return _Response.send(res, {
        status: ResponseCode.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return _Response.send(res, {
      status: ResponseCode.SUCCESS,
      message: 'Login successful',
      data: { token },
    });
  } catch (error) {
    return _Response.send(res, {
      status: ResponseCode.INTERNAL_ERROR,
      message: 'Failed to login',
      error: error.message,
    });
  }
};

module.exports = { register, login };
