const budgetInitialState = {
  errors: "",
  budgetData: {},
};
const budgetReducer = (state = budgetInitialState, action) => {
  if (action.type === "SET_BUDGET") {
    return { ...state, budgetData: action.payload };
  } else if (action.type === "UPDATE_BUDGET") {
    return { ...state, budgetData: action.payload };
  } 
  else if (action.type === "RESET_BUDGET") {
    return { ...state, errors: "", budgetData: {} };
  } 
  else {
    return { ...state };
  }
};

export default budgetReducer;
