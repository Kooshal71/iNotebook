const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  let obj = {
    a: "Thanks",
  };
  res.json(obj);
});

module.exports = router;
