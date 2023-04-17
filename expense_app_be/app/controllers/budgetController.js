const Budget = require("../models/budget");

const budgetController = {};

// budgetController.list = (req, res) => {
//   Budget.find({ userId: req.user._id })
//     .then((budget) => {
//       if (budget.length == 0) {
//         const body = req.body;
//         body.userId = req.user._id;
//         Budget.create(body)
//           .then((budget) => {
//             res.json(budget);
//           })
//           .catch((err) => {
//             res.json(err);
//           });
//       } else {
//         res.json(budget);
//       }
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// };

budgetController.list = (req, res) => {
  Budget.find({ userId: req.user._id })
    .then((budget) => {
      res.json(budget);
    })
    .catch((err) => {
      res.json(err);
    });
};

budgetController.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Budget.findOneAndUpdate({ _id: id, userId: req.user._id }, body, {
    new: true,
    runValidator: true,
  })
    .then((budget) => {
      res.json(budget);
    })
    .catch((err) => {
      res.json(err);
    });
};

budgetController.reset = (req, res) => {
  Budget.findOneAndUpdate(
    { userId: req.user._id },
    { budget: 0 },
    {
      new: true,
      runValidator: true,
    }
  )
    .then((budget) => {
      res.json(budget);
    })
    .catch((err) => {
      res.json(err);
    });
};

budgetController.deleteAccount = (req, res) => {
  Budget.findOneAndDelete({ userId: req.user._id })
    .then((budget) => {
      res.json(budget);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = budgetController;
