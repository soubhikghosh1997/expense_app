const express = require("express");

const router = express.Router();

const userController = require("../app/controllers/userController");
const tokenGeneration = require("../app/middlewares/tokenGeneration");
const userAuthentication = require("../app/middlewares/userAuthentication");
const budgetController = require("../app/controllers/budgetController");
const categoryController = require("../app/controllers/categoryController");
const expenseController = require("../app/controllers/expenseController");
const upload = require("../app/middlewares/pictureuploads");
const pdfUpload = require("../app/middlewares/invoiceUploads");

router.post("/api/user/register", userController.register);
router.post("/api/user/login", tokenGeneration, userController.login);
router.get("/api/user/account", userAuthentication, userController.account);
router.put(
  "/api/user/register",
  upload.single("avatar"),
  userAuthentication,
  userController.update
);

router.get("/api/user/budget", userAuthentication, budgetController.list);
router.put("/api/user/budget/:id", userAuthentication, budgetController.update);

router.get("/api/user/category", userAuthentication, categoryController.list);
router.post(
  "/api/user/category",
  userAuthentication,
  categoryController.create
);
router.delete(
  "/api/user/category/:id",
  userAuthentication,
  categoryController.removeItem
);

router.get("/api/user/expense", userAuthentication, expenseController.list);
router.post("/api/user/expense", userAuthentication, expenseController.create);
router.put(
  "/api/user/expense/:id",
  userAuthentication,
  expenseController.update
);
router.put(
  "/api/user/expense/invoice_upload/:id",
  pdfUpload.single("pdf"),
  userAuthentication,
  expenseController.invoiceUpload
);
router.delete(
  "/api/user/expense/:id",
  userAuthentication,
  expenseController.removeItem
);
//soft delete one particular item.
router.delete(
  "/api/user/expense/softdelete/:id",
  userAuthentication,
  expenseController.softDelete
);
//restore one particular deleted item
router.get(
  "/api/user/expense/restore/:id",
  userAuthentication,
  expenseController.restore
);

//listing for all softdeleted expenses

router.get(
  "/api/user/expense/softdelete",
  userAuthentication,
  expenseController.listingAllDeletedItems
);

//Routes for delete Account

router.delete(
  "/api/user/delete_budget_account",
  userAuthentication,
  budgetController.deleteAccount
);
router.delete(
  "/api/user/delete_category_account",
  userAuthentication,
  categoryController.deleteAccount
);
router.delete(
  "/api/user/delete_expense_account",
  userAuthentication,
  expenseController.deleteAccount
);
router.delete(
  "/api/user/account/deleteaccount",
  userAuthentication,
  userController.deleteAccount
);

//Budget reset routes

router.put(
  "/api/user/reset_budget_account",
  userAuthentication,
  budgetController.reset
);

module.exports = router;
