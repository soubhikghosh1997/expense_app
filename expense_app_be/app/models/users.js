const mongoose = require("mongoose");
const Budget = require("../models/budget");
const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordFormat =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const uniqueValidator = require("mongoose-unique-validator");
const bcryptjs = require("bcryptjs");

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    userName: {
      type: String,

      required: [true, "User Name is required"],
      unique: true,
    },
    email: {
      type: String,

      required: [true, "Email is required"],
      unique: true,

      validate: {
        validator: function (value) {
          return emailFormat.test(value);
        },
        message: function () {
          return "Enter a valid Email Id";
        },
      },
    },
    password: {
      type: String,

      required: [true, "Password is rewuired"],
      unique: true,

      minLength: 8,
      maxLength: 128,
      validate: {
        validator: function (value) {
          return passwordFormat.test(value);
        },
        message: function () {
          return "Password must Contain Minimum eight characters, at least one letter, one number and one special character";
        },
      },
    },
    profilepic: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchema.plugin(uniqueValidator);
userSchema.pre("save", function (next) {
  const body = this;
  bcryptjs.genSalt().then((salt) => {
    bcryptjs.hash(body.password, salt).then((encrypted) => {
      body.password = encrypted;
      next();
    });
  });
});
userSchema.post("save", function (doc, next) {
  const budgetData = {
    budget: 0,
    userId: doc._id,
  };
  Budget.create(budgetData)
    .then((budget) => {
      console.log(budget);
      //return budget;
      //next(budget);
      next();
    })
    .catch((err) => {
      console.log(err.message);
      next();
      //next(err);
    });
});

const User = mongoose.model("User", userSchema);
module.exports = User;
