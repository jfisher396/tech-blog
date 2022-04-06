const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/", (req, res) => {
  User.findAll().then((userData) => {
    res.json(userData);
  });
});

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }).then((newUser) => {
      res.json(newUser)
  });
});


module.exports = router;
