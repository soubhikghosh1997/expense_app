import React from "react";
import ExpenseAddAndSearchComponent from "./ExpenseAddAndSearchComponent";
import ExpenseListing from "./ExpenseListing";
const ExpenseContainer = () => {
  return (
    <div className="homeExpenseContainer">
      <div className="expense_Add_And_Search_Component">
        <ExpenseAddAndSearchComponent />
      </div>
      <div className="expense_Listing">
        <ExpenseListing />
      </div>
    </div>
  );
};

export default ExpenseContainer;
