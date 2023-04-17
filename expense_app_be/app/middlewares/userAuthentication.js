const jwt = require("jsonwebtoken");
const User = require("../models/users");

const userAuthentication = (req, res, next) => {
  let token = req.header("Auth-X");
  if (token) {
    token = token.split(" ")[1];
    try {
      const tokenData = jwt.verify(token, "dct@123");
      User.findOne({ _id: tokenData._id })
        .then((user) => {
          req.user = user;
          next();
        })
        .catch((err) => {
          res.json(err);
        });
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.status(401).json({ errors: "Something Wrong with token data" });
  }
};
module.exports = userAuthentication;
