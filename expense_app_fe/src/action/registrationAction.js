import axios from "axios";

export const asyncRegistration = (obj, props) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3015/api/user/register", obj)
      .then((user) => {
        props.history.push("/login");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

