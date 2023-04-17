import axios from "axios";

export const async_update_budget = (toggleHandle, _id, formData) => {
  return (dispatch) => {
    axios
      .put(`http://localhost:3015/api/user/budget/${_id}`, formData, {
        headers: {
          "Auth-X": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(update_budget(res.data));
        toggleHandle();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const async_get_budget = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3015/api/user/budget", {
        headers: {
          "Auth-X": localStorage.getItem("token"),
        },
      })
      .then((budget) => {
        dispatch(set_budget(budget.data[0]));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

const set_budget = (obj) => {
  return {
    type: "SET_BUDGET",
    payload: obj,
  };
};
export const update_budget = (obj) => {
  return {
    type: "UPDATE_BUDGET",
    payload: obj,
  };
};

export const reset_budget = () => {
  return {
    type: "RESET_BUDGET",
  };
};
