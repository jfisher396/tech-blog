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

// route to login as a user
router.post("/login", async (req, res) => {
  console.log(req.body.username);
  try {
    User.findOne({
      where: {
        username: req.body.username,
      },
    }).then((userData) => {
      if (!userData) {
        res.status(404).send("No user found with that email");
      } else {
        if (bcrypt.compareSync(req.body.password, userData.password)) {
          console.log("logged in");
          req.session.user = {
            username: userData.username,
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
router.get("/readsessions", (req, res) => {
  res.json(req.session);
});

router.get("/logout",(req,res)=>{
    req.session.destroy();
    console.log("logged out")
    res.send("You are now logged out.")
})

module.exports = router;
