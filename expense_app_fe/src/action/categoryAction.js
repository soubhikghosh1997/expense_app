import axios from "axios";

export const async_create_category = (categoryData) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3015/api/user/category", categoryData, {
        headers: {
          "Auth-X": localStorage.getItem("token"),
        },
      })
      .then((category) => {
        if (category.data.hasOwnProperty("errors")) {
          dispatch(error_category(category.data.message));
        } else {
          dispatch(error_category(""));
          dispatch(create_category(category.data));
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const async_get_category = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3015/api/user/category", {
        headers: {
          "Auth-X": localStorage.getItem("token"),
        },
      })
      .then((categories) => {
        dispatch(get_category(categories.data));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const async_delete_category = (_id) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:3015/api/user/category/${_id}`, {
        headers: {
          "Auth-X": localStorage.getItem("token"),
        },
      })
      .then((category) => {
        if (category.data.hasOwnProperty("errors")) {
          dispatch(error_category(category.data.errors));
        } else {
          dispatch(error_category(""));
          dispatch(delete_category(category.data));
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

const create_category = (obj) => {
  return {
    type: "CREATE_CATEGORY",
    payload: obj,
  };
};
export const error_category = (string) => {
  return {
    type: "ERROR_CATEGORY",
    payload: string,
  };
};
const get_category = (obj) => {
  return {
    type: "GET_CATEGORY",
    payload: obj,
  };
};
const delete_category = (string) => {
  return {
    type: "DELETE_CATEGORY",
    payload: string,
  };
};
export const reset_category = () => {
  return {
    type: "RESET_CATEGORY",
  };
};
