const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categoryName: {
    type: String,
    unique: true,
    required: [true, "Category Name is required"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
categorySchema.plugin(uniqueValidator);
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
