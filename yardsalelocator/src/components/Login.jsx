import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            redirectToReferrer: false,
            // hasLoginFailed: false,
            // showSuccessMessage: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onFormSubmit(e) {
        e.preventDefault();
        let userInfo = {
            username: this.state.username,
            password: this.state.password
        }
        let axiosConfig = {
            headers: {}
        };
        axios.post("http://localhost:8080/login", userInfo, axiosConfig)
            .then(res => { localStorage.setItem("userToken", res.headers.authorization) })
            .then(setTimeout(() => {this.redirectLine()}, 500 ));
    }

    redirectLine() {
        if(localStorage.getItem("userToken") === null) {
        alert("Please verify your credentials and log in again.")}
        else{
            alert("You are logged in")
            this.setState({ redirectToReferrer: true })
        }
    }

    render() {
        const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer) {
            return <Redirect to="/loading" />
        }
        return (
            <form onSubmit={(e) => this.onFormSubmit(e)}>
                <div>
                    <h1>Log In</h1>
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
                    <button className="btn btn-default" type="submit">
                        Submit
					</button>
                </div>
            </form>
        )
    }
}

export default Login
