const initialAccountState = {};

const accountReducer = (state = initialAccountState, action) => {
  if (action.type === "SET_ACCOUNT") {
    return { ...action.payload };
  } else if (action.type === "UPDATE_ACCOUNT") {
    return { ...state, ...action.payload };
  } 
  else if (action.type === "RESET_USER_ACCOUNT") {
    return {};
  } 
  else {
    return { ...state };
  }
};
export default accountReducer;
