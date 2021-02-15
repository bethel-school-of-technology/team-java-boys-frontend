import React from "react";
import './general.css';
import { useFormik } from "formik";
import * as Yup from "yup";

export default function SignUp() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: ""
    },
			validationSchema: Yup.object({
			username: Yup.string()
				.min(2, "Mininum 2 characters")
				.max(25, "Maximum 25 characters")
				.required("Required!"),
			email: Yup.string()
				.email("Invalid email format")
				.required("Required!"),
			password: Yup.string()
				.min(8, "Minimum 8 characters")
				.required("Required!"),
			confirm_password: Yup.string()
				.oneOf([Yup.ref("password")], "Password's not match")
				.required("Required!")
			}),
		onSubmit: values => {
		console.log(JSON.stringify(values, null, 2));
		const url = "http://localhost:8080/user/register";
			const data = {
				email: values.email,
				username: values.username,
				password: values.password,
			};
			console.log(data);
			fetch(url, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
				.then((res) => res.json())
				.catch((error) => console.error("Error:", error))
				.then((response) => console.log("Success:", response))
				.then(window.location.href = "/login");
    }
  });

  return (
    <div className="App">
      <h1>Register for an account</h1>

      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && formik.touched.username && (
            <span>{formik.errors.username}</span>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <span>{formik.errors.email}</span>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <span>{formik.errors.password}</span>
          )}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
          />
          {formik.errors.confirm_password && formik.touched.confirm_password && (
            <span>{formik.errors.confirm_password}</span>
          )}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}