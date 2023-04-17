const Expense = require("../models/expense");
const expenseController = {};

//Find() will return the expenses those which are not softDeleted

expenseController.list = (req, res) => {
  Expense.find({ userId: req.user._id })
    .then((expenses) => {
      res.json(expenses);
    })
    .catch((err) => {
      res.json(err);
    });
};

expenseController.create = (req, res) => {
  const body = req.body;
  body.userId = req.user._id;
  Expense.create(body)
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      res.json(err);
    });
};

expenseController.update = (req, res) => {
  const body = req.body;
  const id = req.params.id;
  if (
    body.itemName !== "" &&
    body.amount >= 0 &&
    body.categoryId !== "" &&
    body.amount != ""
  ) {
    Expense.findOneAndUpdate({ _id: id, userId: req.user._id }, body, {
      new: true,
      runValidator: true,
    })
      .then((expense) => {
        res.json(expense);
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    res.json({ errors: "No field can not be empty" });
  }
};

expenseController.invoiceUpload = (req, res) => {
  if (req.file) {
    const body = req.body;
    const id = req.params.id;
    body.invoicePdf = req.file.path;
    Expense.findByIdAndUpdate({ _id: id, userId: req.user._id }, body, {
      new: true,
      runValidator: true,
    })
      .then((expense) => {
        res.json(expense);
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    res.json({ errors: "Upload a pdf file" });
  }
};

expenseController.removeItem = (req, res) => {
  const id = req.params.id;
  Expense.findOneAndDelete({ _id: id, userId: req.user._id })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      res.json(err);
    });
};

//Soft Delete one perticular Item

expenseController.softDelete = (req, res) => {
  const id = req.params.id;
  Expense.deleteById({ _id: id, userId: req.user._id })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      res.json(err);
    });
};

//Restore one particular item

expenseController.restore = (req, res) => {
  const id = req.params.id;
  Expense.restore({ _id: id, userId: req.user._id })
    .then((expenses) => {
      res.json(expenses);
    })
    .catch((err) => {
      res.json(err);
    });
};

//Find all soft deleted items

expenseController.listingAllDeletedItems = (req, res) => {
  Expense.findDeleted({ userId: req.user._id })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      res.json(err);
    });
};

expenseController.deleteAccount = (req, res) => {
  Expense.deleteMany({ userId: req.user._id })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = expenseController;
