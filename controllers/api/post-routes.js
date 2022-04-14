const express = require("express");
const router = express.Router();
const { Post, Comment, User } = require("../../models");

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
    await Post.findAll({
      include: [User],
    }).then((postsData) => {
      res.json(postsData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      res.json(postData);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
