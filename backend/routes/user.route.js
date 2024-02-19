const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, avatar, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(201).send({ error: err });
      } else {
        const user = new userModel({
          avatar,
          username,
          email,
          password: hash,
        });
        await user.save();
        res.status(201).send({ msg: "New user registered" });
      }
    });
  } catch (error) {
    res.status(400).send({ error: err });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ userID: user._id }, process.env.AuthKey, {
          expiresIn: 60 * 100,
        });
        res.status(201).send({ msg: "Login Successfull", token: token });
      } else {
        res.status(201).send({ msg: "Wrong Credentials" });
      }
    });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = { userRouter };
