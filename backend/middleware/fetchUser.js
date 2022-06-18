const jwt = require("jsonwebtoken");

const JWT_SECRET = "Kooshalisw3bDev1oper";

const fetchUser = async (req, res, next) => {
  // Get the user from jwt token and append id to req
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = await jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate with a token" });
  }
};

module.exports = fetchUser;
