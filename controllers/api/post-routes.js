const express = require("express");
const router = express.Router();
const authorization = require("../../utils/authorization");
const { Post, Comment, User } = require("../../models");

// route to create a new post and save to DB
router.post("/", authorization, async (req, res) => {
  const body = req.body;
  console.log("req.body", body);
  console.log(req.session.user.id);
  try {
    const newPost = await Post.create({
      ...body,
      user_id: req.session.user.id,
    });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to update a post
router.put("/:id", authorization, async (req, res) => {
  console.log(req.body)
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.body.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to get all posts
router.get("/", async (req, res) => {
  try {
    await Post.findAll({
      include: [User],
      // order: ['createdAt', 'DESC'],
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

// get posts by user
router.get("/byuser/:id", authorization, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_Id: req.session.user.id,
      },
      // order: ['id', 'DESC'],
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

// route to delete a post
router.delete('/:id', authorization, async (req, res) => {
  try {
    const [affectedRows] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
