import axios from "axios";
import Swal from "sweetalert2";

export const async_expense_create = (formData) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3015/api/user/expense", formData, {
        headers: {
          "Auth-X": localStorage.getItem("token"),
        },
      })
      .then((expense) => {
        if (expense.data.hasOwnProperty("errors")) {
          //console.log(expense.data.message);
          dispatch(errors_expense(expense.data.message));
        } else {
          //console.log(expense.data);
          dispatch(errors_expense(""));
          dispatch(create_expense(expense.data));
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const async_get_expense = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3015/api/user/expense", {
        headers: {
          "Auth-X": localStorage.getItem("token"),
        },
      })
      .then((expense) => {
        dispatch(get_expense(expense.data));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const async_update_expense = (formData, _id) => {
  return (dispatch) => {
    axios
      .put(`http://localhost:3015/api/user/expense/${_id}`, formData, {
        headers: {
          "Auth-X": localStorage.getItem("token"),
        },
      })
      .then((expense) => {
        if (expense.data.hasOwnProperty("errors")) {
          dispatch(errors_expense(expense.data.errors));
        } else {
          dispatch(update_expense(expense.data, _id));
          dispatch(errors_expense(""));
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const async_delete_expense = (_id) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:3015/api/user/expense/${_id}`, {
        headers: {
          "Auth-X": localStorage.getItem("token"),
        },
      })
      .then((expense) => {
        dispatch(delete_expense(expense.data));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const async_softdelete_expense = (_id) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:3015/api/user/expense/softdelete/${_id}`, {
        headers: {
          "Auth-X": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(softdelete_expense(_id));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const async_restore_expense = (_id) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3015/api/user/expense/restore/${_id}`, {
        headers: {
          "Auth-X": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(restore_expense(_id));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const async_listingAllDeletedItems_expense = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3015/api/user/expense/softdelete", {
        headers: {
          "Auth-X": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(listingAllDeletedItems_expense(res.data));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const async_upload_expense_invoice = (formData, id) => {
  return (dispatch) => {
    axios
      .put(
        `http://localhost:3015/api/user/expense/invoice_upload/${id}`,
        formData,
        {
          headers: {
            "Auth-X": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          //alert(response.data.errors);
          Swal.fire({
            title: "Error!",
            text: response.data.errors,
            icon: "error",
            confirmButtonText: "OK",
          });
        } else {
          dispatch(update_expense(response.data));
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

const create_expense = (obj) => {
  return {
    type: "CREATE_EXPENSE",
    payload: obj,
  };
};

export const errors_expense = (string) => {
  return {
    type: "ERRORS_EXPENSE",
    payload: string,
  };
};
export const get_expense = (arr) => {
  return {
    type: "GET_EXPENSE",
    payload: arr,
  };
};
const update_expense = (obj) => {
  return {
    type: "UPDATE_EXPENSE",
    payload: obj,
  };
};

const delete_expense = (obj) => {
  return {
    type: "DELETE_EXPENSE",
    payload: obj,
  };
};
const softdelete_expense = (_id) => {
  return {
    type: "SOFTDELETE_EXPENSE",
    payload: _id,
  };
};

const listingAllDeletedItems_expense = (arr) => {
  return {
    type: "LISTINGALLDELETEDITEMS_EXPENSE",
    payload: arr,
  };
};

const restore_expense = (_id) => {
  return {
    type: "RESTORE_EXPENSE",
    payload: _id,
  };
};

export const search_expense = (arr) => {
  return {
    type: "SEARCH_EXPENSE",
    payload: arr,
  };
};
export const reset_expense = () => {
  return {
    type: "RESET_EXPENSE",
  };
};
