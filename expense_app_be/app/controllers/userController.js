const User = require("../models/users");

const userController = {};

userController.register = (req, res) => {
  const body = req.body;
  User.create(body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
};

userController.update = (req, res) => {
  if (req.file) {
    const body = req.body;
    body.profilepic = req.file.path;
    User.findOneAndUpdate({ _id: req.user._id }, body, {
      new: true,
      runValidator: true,
    })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    res.json({ errors: "Upload a jpj or png file" });
  }
};

userController.deleteAccount = (req, res) => {
  User.findByIdAndDelete({ _id: req.user._id })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
};

userController.login = (req, res) => {
  res.json(req.tokenData);
};
userController.account = (req, res) => {
  res.json(req.user);
};

module.exports = userController;
