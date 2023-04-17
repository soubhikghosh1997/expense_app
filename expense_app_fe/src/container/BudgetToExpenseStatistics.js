import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useSelector, useDispatch } from "react-redux";
import { async_get_budget } from "../action/budgetAction";
import { async_get_expense } from "../action/expenseAction";

const BudgetToExpenseStatistics = () => {
  const dispatch = useDispatch();

  const [expenseData, budgetData] = useSelector((state) => {
    return [state.expense.expense, state.budget.budgetData];
  });

  useEffect(() => {
    dispatch(async_get_budget());
    dispatch(async_get_expense());
  }, [dispatch]);

  const totalExpenseValue = expenseData.reduce((preValue, currValue) => {
    return preValue + currValue.amount;
  }, 0);

  const options = {
    title: "My Budget to Expense Statistics",
    pieHole: 0.4,
    is3D: false,
  };

  const data = [
    ["Budget/Expense", "Percentage"],
    ["Budget Left", budgetData.budget - totalExpenseValue],
    ["Expense Data", totalExpenseValue],
  ];
  return (
    <div className="budget_expense_statistics">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />

      <div className="budget_expense_statistics_details">
        <h2 style={{ color: "navy" }}>Total Budget: {budgetData.budget}</h2>
        <h2 style={{ color: "navy" }}>Total Expense: {totalExpenseValue}</h2>
        <h2 style={{ color: "navy" }}>
          Budget Left: {budgetData.budget - totalExpenseValue}
        </h2>
      </div>
    </div>
  );
};

export default BudgetToExpenseStatistics;
