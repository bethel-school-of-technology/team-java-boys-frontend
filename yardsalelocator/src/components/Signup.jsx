import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./general.css";

export class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			username: "",
			password: "",
			passwordConfirm: "",
			firstName: "",
			lastName: "",
			streetAddress: "",
			city: "",
			state: "",
			zip: "",
		};
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		if(this.state.password === this.state.passwordConfirm){
		const url = "http://localhost:8080/user/register";
		const data = {
			email: this.state.email,
			username: this.state.username,
			password: this.state.password,
			streetAddress: this.state.streetAddress,
			city: this.state.city,
			state: this.state.state,
			zip: this.state.zip,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
		};
		console.log(data);
		fetch(url, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
			.then((res) => res.json())
			.catch((error) => console.error("Error:", error))
			.then((response) => console.log("Success:", response));
			console.log(fetch);
			this.props.history.push('/login');
	} else { alert("Passwords do not match.")}
	};

	directToLogin() {
		<Redirect to="/login" />;
	}

	onFormSubmit(e) {
		e.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<h1>Register for an account.</h1>
					<label>
						{" "}
						Email:
						<input type="email" name="email" onChange={this.handleChange} />
					</label>
					<br />
					<label>
						{" "}
						Username:
						<input type="text" name="username" onChange={this.handleChange} />
					</label>
					<br />
					<label>
						{" "}
						Password:
						<input type="password" name="password" onChange={this.handleChange} />
					</label>
					<br />
					<label>
						{" "}
						Confirm Password:
						<input type="password" name="passwordConfirm" onChange={this.handleChange} />
					</label>
					{/* <label>
						{" "}
						First Name:
						<input type="text" name="firstName" onChange={this.handleChange} />
					</label>
					<br />
					<label>
						{" "}
						Last Name:
						<input type="text" name="lastName" onChange={this.handleChange} />
					</label>
					<br />
					<label>
						{" "}
						Street Address:
						<input type="text" name="streetAddress" onChange={this.handleChange} />
					</label>
					<br />
					<label>
						{" "}
						City:
						<input type="text" name="city" onChange={this.handleChange} />
					</label>
					<br />
					<label>
						{" "}
						State:
						<input type="text" name="state" onChange={this.handleChange} />
					</label>
					<br />
					<label>
						{" "}
						Zip Code:
						<input type="text" name="zip" onChange={this.handleChange} />
					</label>
					<br /> */}
					<br />
					<button className="btn btn-default" type="submit">
						Submit
					</button>
				</div>
			</form>
		);
	}
}

export default Signup;
