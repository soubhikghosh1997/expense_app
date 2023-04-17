import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { async_expense_create } from "../action/expenseAction";
import {
  errors_expense,
  search_expense,
  async_get_expense,
} from "../action/expenseAction";
import ModalExpense from "./ModalExpense";

const ExpenseAddAndSearchComponent = () => {
  const [searchCategory, setSearchCategory] = useState("");

  const dispatch = useDispatch();

  const categoryList = useSelector((state) => {
    return state.category.category;
  });

  const changeHandle = (e) => {
    const value = e.target.value;
    setSearchCategory(value);
    console.log(value);
    if (value) {
      const arr = categoryList.filter((ele) => {
        return ele.categoryName.toLowerCase().includes(value.toLowerCase());
      });
      dispatch(search_expense(arr));
    } else if (!value) {
      dispatch(async_get_expense());
    }
  };

  const addExpenseOrUpdate = (formData) => {
    dispatch(async_expense_create(formData));
  };

  const expenseErrorHandleReset = (string) => {
    dispatch(errors_expense(string));
  };

  return (
    <>
      <div>
        <ModalExpense
          buttonName={"Add Expense"}
          addExpenseOrUpdate={addExpenseOrUpdate}
          expenseErrorHandleReset={expenseErrorHandleReset}
        />
      </div>
      <div>
        <input
          type="text"
          value={searchCategory}
          onChange={changeHandle}
          placeholder="search expense..."
          className="search_expenses"
        />
      </div>
    </>
  );
};

export default ExpenseAddAndSearchComponent;
