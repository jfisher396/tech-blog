const express = require("express");
const router = express.Router();
const authorization = require("../../utils/authorization")
const { Comment } = require("../../models");

router.post("/", authorization, async (req, res) => {

  console.log(req.session)
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user.id,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
