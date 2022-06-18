const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "Kooshalisw3bDev1oper";
// Create a User with POST "api/auth/createuser" no login required

router.post(
  "/createuser",
  body("email").isEmail(),
  body("name").isLength({ min: 5, max: 20 }),
  body("password").isLength({ min: 7 }),
  //   Using express=validator but it does not check in the database for unique so we need a separate check
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Try and catch block is used as a precautionary measure incase something unexpected goes wrong
    try {
      // This is used to check if the given email is unique
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .send("User with the same email is already present");
      }
      //   Hashing of the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //   Used to create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
      //   Catches unknown errors
    } catch (error) {
      console.error(error);
      res.status(500).send("Something has gone wrong :(");
    }
    // .catch((err) => {
    //   console.log(err);
    //   res.json({ error: "Account already present", message: err.message });
    // });
    console.log("Successfully added an user");
    // res.send(req.body);
  }
);

module.exports = router;
