const express = require("express");
const router = express.Router();

const { register, logIn, getUsers } = require("./user.controllers");
const passport = require("passport");

router.post("/register", register);
// checks user and passport through passport middleware && generate a token and return token through the function
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  logIn
);
router.get("/", passport.authenticate("jwt", { session: false }), getUsers);

module.exports = router;

// test
