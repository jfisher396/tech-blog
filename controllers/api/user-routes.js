const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../../models");

// route to create a new user
router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((userData) => {
      if (!userData) {
        res.status(404).send("No user found with that email");
      } else {
        if (bcrypt.compareSync(req.body.password, userData.password)) {

          req.session.user = {
            name: userData.name,
            id: userData.id,
          };
          res.json(req.session);
        } else {
          res.status(401).send("Incorrect password");
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//route to view active session
router.get('/readsessions', (req,res) => {
  res.json(req.session)
})

module.exports = router;
