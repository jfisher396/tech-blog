const express = require("express");
const router = express.Router();
const { Post } = require("../../models");

router.post("/", (req, res) => {
  Post.create({
    title: req.body.title,
    body: req.body.body,
  })
    .then((newPost) => {
      res.json(newPost);
    })
    .catch((err) => {
      res.json(err);
    });
});


module.exports = router;