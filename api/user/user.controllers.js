const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const generateToken = (user) => {
  // payload here is the user object without the password
  const payload = {
    _id: user._id,
    username: user.username,
  };
  // add the secret key as a signature + token duration before expiring
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXP,
  });
  return token;
};

exports.register = async (req, res, next) => {
  try {
    // Take the password from the request and hash it
    const { password } = req.body;
    req.body.password = await hashPassword(password);
    console.log(req.body);
    const newUser = await User.create(req.body);
    // After creating the user, return a token as response
    const token = generateToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
};

exports.logIn = async (req, res) => {
  try {
    const token = await generateToken(req.user);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("recipes");
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};
