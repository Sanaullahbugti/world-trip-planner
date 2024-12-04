const User = require('../models/userModel');

const findUserByEmail = async (email) => User.findOne({ email });

const createUser = async (userData) => new User(userData).save();

const updateUserTokens = async (userId, tokenChange) =>
  User.findByIdAndUpdate(
    userId,
    { $inc: { tokens: tokenChange } },
    { new: true }
  );

module.exports = { findUserByEmail, createUser, updateUserTokens };
