import React from "react";
import { useDispatch } from "react-redux";
import { asyncRegistration } from "../action/registrationAction";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const Registration = (props) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),

      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().password("Invalid Password ").required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(asyncRegistration(values, props));
    },
  });
  return (
    <div className="registration">
      <h3>Registration Form</h3>
      <br />
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="userName">
          <b>User Name</b>
        </label>
        <br />

        <input
          id="userName"
          name="userName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userName}
          className="reg-input"
        />

        {formik.touched.userName && formik.errors.userName ? (
          <div style={{ color: "red" }}>{formik.errors.userName}</div>
        ) : null}
        <br />
        <label htmlFor="email">
          <b>Email Address</b>
        </label>
        <br />

        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="reg-input"
        />

        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        ) : null}
        <br />
        <label htmlFor="password">
          <b>Password</b>
        </label>
        <br />

        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="reg-input"
        />

        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        ) : null}
        <br />

        <button type="submit" className="reg-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Registration;
