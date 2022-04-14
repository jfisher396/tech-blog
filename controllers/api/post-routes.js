const express = require("express");
const router = express.Router();
const authorization = require("../../utils/authorization");
const { Post, Comment, User } = require("../../models");

// route to create a new post and save to DB
router.post("/", authorization, async (req, res) => {
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
});

// route to get all posts
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

// route to get a single post by post ID
router.get("/post/:id", authorization, async (req, res) => {
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

router.get("/byuser/:id", authorization, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_Id: req.session.user.id,
      },
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
