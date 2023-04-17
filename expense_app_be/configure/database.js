const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const configureDb = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/expense_app")
    .then((res) => {
      console.log("DataBase is Connected!!");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = configureDb;
