const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const JWT_SECRET = "Kooshalisw3bDev1oper";

//! ROUTE1: Create a User with POST "api/auth/createuser" no login required

router.post(
  "/createuser",
  body("email").isEmail(),
  body("name").isLength({ min: 5, max: 20 }),
  body("password").isLength({ min: 7 }),
  //   Using express=validator but it does not check in the database for unique so we need a separate check
  async (req, res) => {
    let success = false;
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
          .send(success, "User with the same email is already present");
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
      success = true;
      res.json({ success, authToken });
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

//! ROUTE2: Authenticate a user and allows to login "api/auth/login"

router.post(
  "/login",
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be blank").exists(),
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct pass" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

//! Get logged in user details using POST "api/auth/getuser"
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
    console.log("Successfully retrieved the details");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Something went wrong on our side");
  }
});

module.exports = router;
