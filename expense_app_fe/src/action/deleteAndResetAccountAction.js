import axios from "axios";
import { reset_category } from "./categoryAction";
import { reset_expense } from "./expenseAction";
import { update_budget } from "./budgetAction";

export const async_delete_account = (props) => {
  return (dispatch) => {
    axios
      .all([
        axios.delete("http://localhost:3015/api/user/delete_budget_account", {
          headers: {
            "Auth-X": localStorage.getItem("token"),
          },
        }),
        axios.delete("http://localhost:3015/api/user/delete_category_account", {
          headers: {
            "Auth-X": localStorage.getItem("token"),
          },
        }),
        axios.delete("http://localhost:3015/api/user/delete_expense_account", {
          headers: {
            "Auth-X": localStorage.getItem("token"),
          },
        }),
        axios.delete("http://localhost:3015/api/user/account/deleteaccount", {
          headers: {
            "Auth-X": localStorage.getItem("token"),
          },
        }),
      ])
      .then((response) => {
        console.log(response);
        localStorage.removeItem("token");
        props.history.push("/register");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const async_reset_account = () => {
  return (dispatch) => {
    axios
      .all([
        axios.delete("http://localhost:3015/api/user/delete_category_account", {
          headers: {
            "Auth-X": localStorage.getItem("token"),
          },
        }),
        axios.delete("http://localhost:3015/api/user/delete_expense_account", {
          headers: {
            "Auth-X": localStorage.getItem("token"),
          },
        }),
        axios.put(
          "http://localhost:3015/api/user/reset_budget_account",
          {},
          {
            headers: {
              "Auth-X": localStorage.getItem("token"),
            },
          }
        ),
      ])
      .then(([response1, response2, response3]) => {
        dispatch(reset_category());
        dispatch(reset_expense());
        dispatch(update_budget(response3.data));
        alert("You are successfully reset your account!!");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};
