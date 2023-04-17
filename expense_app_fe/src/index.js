import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { BrowserRouter } from "react-router-dom";
import { asyncGetUserInfo } from "./action/loginAction";
import { async_get_budget } from "./action/budgetAction";
import { async_get_category } from "./action/categoryAction";
import {
  async_get_expense,
  async_listingAllDeletedItems_expense,
} from "./action/expenseAction";

const store = configureStore();

if (localStorage.getItem("token")) {
  store.dispatch(asyncGetUserInfo());
  store.dispatch(async_get_budget());
  store.dispatch(async_get_category());
  store.dispatch(async_get_expense());
  store.dispatch(async_listingAllDeletedItems_expense());
}

console.log("state", store.getState());
store.subscribe(() => {
  console.log("state updated", store.getState());
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
