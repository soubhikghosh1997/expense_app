const Category = require("../models/category");
const Expense = require("../models/expense");
const categoryController = {};

categoryController.list = (req, res) => {
  Category.find({ userId: req.user._id })
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.json(err);
    });
};

categoryController.removeItem = (req, res) => {
  const id = req.params.id;

  Expense.findWithDeleted({ userId: req.user._id, categoryId: id })
    .then((expense) => {
      //console.log(expense);
      if (expense.length == 0) {
        Category.findByIdAndDelete({ _id: id, userId: req.user._id })
          .then((category) => {
            res.json(category);
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        res.json({ errors: "Delete category from Expense first" });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

categoryController.deleteAccount = (req, res) => {
  Category.deleteMany({ userId: req.user._id })
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.json(err);
    });
};

categoryController.create = (req, res) => {
  const body = req.body;
  body.userId = req.user._id;
  Category.create(body)
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = categoryController;
