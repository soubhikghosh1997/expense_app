import React from "react";
import ExpenseContainer from "./ExpenseContainer";
import ExpenseStatistics from "./ExpenseStatistics";
import BudgetToExpenseStatistics from "./BudgetToExpenseStatistics";

const HomeWrapperComponent = () => {
  return (
    <div>
      <div className="expense_statistics_wrapper">
        <div className="category_wise_statistics">
          <ExpenseStatistics />
        </div>
        <div className="budget_to_expense_statistics">
          <BudgetToExpenseStatistics />
        </div>
      </div>
      <div>
        <ExpenseContainer />
      </div>
    </div>
  );
};

export default HomeWrapperComponent;
