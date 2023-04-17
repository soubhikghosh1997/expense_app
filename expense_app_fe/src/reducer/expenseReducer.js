const expenseReducerInitialState = {
  errors: "",
  expense: [],
};
const expenseReducer = (state = expenseReducerInitialState, action) => {
  if (action.type === "CREATE_EXPENSE") {
    return { ...state, expense: [...state.expense, action.payload] };
  } else if (action.type === "ERRORS_EXPENSE") {
    return { ...state, errors: action.payload };
  } else if (action.type === "GET_EXPENSE") {
    return { ...state, expense: [...action.payload] };
  } else if (action.type === "UPDATE_EXPENSE") {
    const arr = state.expense.map((ele) => {
      if (ele._id === action.payload._id) {
        return { ...ele, ...action.payload };
      } else {
        return { ...ele };
      }
    });
    return { ...state, expense: [...arr] };
  } else if (action.type === "DELETE_EXPENSE") {
    const arr = state.expense.filter((ele) => {
      return ele._id !== action.payload._id;
    });
    return { ...state, expense: arr };
  } else if (action.type === "SOFTDELETE_EXPENSE") {
    const obj = state.expense.find((ele) => {
      return ele._id === action.payload;
    });
    const arr1 = state.expense.map((ele) => {
      if (ele._id === obj._id) {
        return { ...obj, deleted: true };
      } else {
        return { ...ele };
      }
    });
    const arr2 = arr1.filter((ele) => {
      return !ele.deleted;
    });
    return { ...state, expense: arr2 };
  } else if (action.type === "LISTINGALLDELETEDITEMS_EXPENSE") {
    return { ...state, expense: action.payload };
  } else if (action.type === "RESTORE_EXPENSE") {
    const obj = state.expense.find((ele) => {
      return ele._id === action.payload;
    });
    const arr1 = state.expense.map((ele) => {
      if (ele._id === obj._id) {
        return { ...obj, deleted: false };
      } else {
        return { ...ele };
      }
    });
    const arr2 = arr1.filter((ele) => {
      return ele.deleted;
    });
    return { ...state, expense: arr2 };
  } else if (action.type === "SEARCH_EXPENSE") {
    let new_arr = [];
    action.payload.forEach((ele) => {
      state.expense.forEach((obj) => {
        if (ele._id === obj.categoryId) {
          new_arr = [...new_arr, obj];
        }
      });
    });
    return { ...state, expense: new_arr };
  } else if (action.type === "RESET_EXPENSE") {
    return { ...state, errors: "", expense: [] };
  } else {
    return { ...state };
  }
};
export default expenseReducer;
