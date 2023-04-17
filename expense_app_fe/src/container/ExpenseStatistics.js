import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useSelector, useDispatch } from "react-redux";
import { async_get_category } from "../action/categoryAction";
import { async_get_expense } from "../action/expenseAction";

const ExpenseStatistics = () => {
  const [categoryStore, expenseStore] = useSelector((state) => {
    return [state.category.category, state.expense.expense];
  });

  const dispatch = useDispatch();

  let data = [["Category Name", "Total Cost"]];

  categoryStore.forEach((ele) => {
    let sum = 0;
    expenseStore.forEach((item) => {
      if (ele._id === item.categoryId) {
        sum = sum + item.amount;
      }
    });

    data = [...data, [ele.categoryName, sum]];
    sum = 0;
  });
  let count = 0;
  data.forEach((ele) => {
    if (ele[1]) {
      count = count + 1;
    }
  });

  useEffect(() => {
    dispatch(async_get_category());
    dispatch(async_get_expense());
  }, [dispatch]);

  const options = {
    title: "My Monthly Expenses",
    is3D: true,
  };
  return (
    <div>
      {count > 5 ? (
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="400px"
          data={data}
        />
      ) : (
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      )}
    </div>
  );
};

export default ExpenseStatistics;
