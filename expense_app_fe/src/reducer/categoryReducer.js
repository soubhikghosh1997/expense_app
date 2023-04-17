const categoryInitialState = {
  errors: "",
  category: [],
};

const categoryReducer = (state = categoryInitialState, action) => {
  if (action.type === "CREATE_CATEGORY") {
    return { ...state, category: [...state.category, action.payload] };
  } else if (action.type === "ERROR_CATEGORY") {
    return { ...state, errors: action.payload };
  } else if (action.type === "GET_CATEGORY") {
    return { ...state, category: [...action.payload] };
  } else if (action.type === "DELETE_CATEGORY") {
    const arr = state.category.filter((ele) => {
      return ele._id !== action.payload._id;
    });
    return { ...state, category: [...arr] };
  } 
  else if (action.type === "RESET_CATEGORY") {
    return { ...state, errors: "", category: [] };
  } 
  else {
    return { ...state };
  }
};

export default categoryReducer;
