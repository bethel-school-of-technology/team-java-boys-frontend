import React, { Component } from 'react';
import './general.css';

export class Signup extends Component {
    render() {
        return (
            <div>
                <h1>Register for an account.</h1>
				<label>
					{" "}
					Email:
					<input type="email" name="email" />
				</label>
                <br />
				<label>
					{" "}
					Username:
					<input type="username" name="username" />
				</label>
                <br />
				<label>
					{" "}
					Password:
					<input type="password" name="password" />
				</label>
                <br />
				<label>
					{" "}
					Confirm Password:
					<input type="passwordConfirmation" name="passwordConfirmation" />
				</label>
                <br />
					<button className="btn btn-default" type="submit">
						Submit
					</button>
            </div>
        )
    }
}

export default Signup
