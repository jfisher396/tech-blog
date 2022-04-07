const express = require("express");
const router = express.Router();
const { Post } = require("../../models");

router.post("/", async (req, res) => {
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

router.get("/", (req, res) => {
  Post.findAll().then((postsData) => {
    res.json(postsData)
  })
})

module.exports = router;
