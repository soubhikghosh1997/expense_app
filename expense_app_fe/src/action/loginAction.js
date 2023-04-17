import axios from "axios";
import Swal from "sweetalert2";
export const asyncLoginAction = (obj, props) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3015/api/user/login", obj)
      .then((res) => {
        const tokenData = res.data;
        if (tokenData.hasOwnProperty("errors")) {
          alert(tokenData.errors);
        } else {
          localStorage.setItem("token", tokenData.token);

          dispatch(asyncGetUserInfo());
          props.history.push("/");
          Swal.fire({
            title: "Success!",
            text: "You are successfully logged in !!",
            icon: "success",
            confirmButtonText: "OK",
          });
          
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

const set_Account = (obj) => {
  return {
    type: "SET_ACCOUNT",
    payload: obj,
  };
};
export const asyncGetUserInfo = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3015/api/user/account", {
        headers: {
          "Auth-X": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const accountInfo = {
          userName: res.data.userName,
          email: res.data.email,
          profilepic: res.data.profilepic,
        };
        dispatch(set_Account(accountInfo));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};
export const async_update_userProfile = (form) => {
  return (dispatch) => {
    axios
      .put("http://localhost:3015/api/user/register", form, {
        headers: {
          "Auth-X": localStorage.getItem("token"),
        },
      })
      .then((user) => {
        if (user.data.hasOwnProperty("errors")) {
          Swal.fire({
            title: "Error!",
            text: user.data.errors,
            icon: "error",
            confirmButtonText: "OK",
          });
        } else {
          dispatch(update_Account(user.data));
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

const update_Account = (obj) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: obj,
  };
};
export const reset_user_account = () => {
  return {
    type: "RESET_USER_ACCOUNT",
  };
};
