const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    itemName: {
      type: String,
      required: [true, "Item Name is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    invoicePdf: {
      type: String,
    },
  },
  { timestamps: true }
);
expenseSchema.plugin(mongoose_delete, { overrideMethods: true });
const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
