import React, { Component } from 'react';

export class Login extends Component {
    constructor(props) {
		super(props);
		this.state = {
			username: "",
            password: "",
            // hasLoginFailed: false,
            // showSuccessMessage: false,
        };
        this.handleChange = this.handleChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    
    handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
    };

    onFormSubmit() {
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
				<div>
					<h1>Log In</h1>
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
                    <button className="btn btn-default" type="submit">
						Submit
					</button>
				</div>
			</form>
        )
    }
}

export default Login
