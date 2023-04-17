const User = require("../models/users");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenGeneration = (req, res, next) => {
  const body = req.body;
  User.findOne({ email: body.email })
    .then((user) => {
      if (user) {
        bcryptjs.compare(body.password, user.password).then((match) => {
          if (match) {
            const tokenData = {
              _id: user._id,
              userName: user.userName,
              email: user.email,
            };
            const token = jwt.sign(tokenData, "dct@123");
            req.tokenData = { token: `Bearer ${token}` };
            next();
          } else {
            res.json({ errors: "Invalid Email or Password" });
          }
        });
      } else {
        res.json({ errors: "Invalid Email or Password" });
      }
    })
    .catch((err) => {
      res.json(err.message);
    });
};

module.exports = tokenGeneration;
