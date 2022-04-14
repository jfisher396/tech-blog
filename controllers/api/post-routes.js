const express = require("express");
const router = express.Router();
const { Post } = require("../../models");

router.post("/", async (req, res) => {
  if (!req.session.user) {
    res.status(401).send("Must be logged in");
  } else {
    const body = req.body;

    try {
      const newPost = await Post.create({
        ...body,
        // user_Id: req.body.user_Id,
      });
      res.json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

router.get("/", async (req, res) => {
  try {
    await Post.findAll().then((postsData) => {
      res.json(postsData);
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
