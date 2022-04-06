const express = require("express");
const router = express.Router();
const { User } = require("../../models");

router.get("/", (req, res) => {
  User.findAll().then((userData) => {
    res.json(userData);
  });
});

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });
    res.json(newUser)
  } catch (err) {
    res.status(500).json(err);
  }
})
module.exports = router;
