const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// Create a User with POST "api/auth/createuser" no login required

router.post(
  "/createuser",
  body("email").isEmail(),
  body("name").isLength({ min: 5, max: 20 }),
  body("password").isLength({ min: 7 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .send("User with the same email is already present");
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Something has gone wrong :(");
    }
    // .catch((err) => {
    //   console.log(err);
    //   res.json({ error: "Account already present", message: err.message });
    // });
    console.log("Successfully added an user");
  }
);

module.exports = router;
