import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import accountReducer from "../reducer/accountReducer";
import budgetReducer from "../reducer/budgetReducer";
import categoryReducer from "../reducer/categoryReducer";
import expenseReducer from "../reducer/expenseReducer";

const configureStore = () => {
  const store = createStore(
    combineReducers({
      account: accountReducer,
      budget: budgetReducer,
      category: categoryReducer,
      expense: expenseReducer,
    }),
    applyMiddleware(thunk)
  );
  return store;
};

export default configureStore;
