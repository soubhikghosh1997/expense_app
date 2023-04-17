const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const budgetSchema = new Schema({
  budget: {
    type: Number,
    required: [true, "Budget is required"],
    default: 0,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Budget = mongoose.model("Budget", budgetSchema);
module.exports = Budget;
