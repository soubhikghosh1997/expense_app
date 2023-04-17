import React from "react";
import { asyncLoginAction } from "../action/loginAction";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const LogIn = (props) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().password("Invalid Password ").required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(asyncLoginAction(values, props));
    },
  });
  return (
    <div className="login">
      <h3 style={{ color: "black" }}>Log In Form</h3>
      <br />
      <form onSubmit={formik.handleSubmit}>
        {formik.touched.userName && formik.errors.userName ? (
          <div style={{ color: "red" }}>{formik.errors.userName}</div>
        ) : null}
        <br />
        <label htmlFor="email">
          <b style={{ color: "black" }}>Email Address</b>
        </label>
        <br />

        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="login-input"
        />

        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        ) : null}
        <br />
        <label htmlFor="password">
          <b style={{ color: "black" }}>Password</b>
        </label>
        <br />

        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="login-input"
        />

        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        ) : null}
        <br />

        <button type="submit" className="login-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LogIn;
