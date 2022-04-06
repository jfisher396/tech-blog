const express = require("express");
const router = express.Router();
const userRoutes = require('./api/user-routes')

router.get("/", (req, res) => {
  res.send("This is the get all route");
});

router.use("/api/users", userRoutes);

module.exports = router;