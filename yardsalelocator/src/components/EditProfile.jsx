import React, { Component } from 'react';
import axios from "axios";

export class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    async getUserData() {
        let axiosConfig = {
            headers: {
                "Authorization": localStorage.getItem("userToken")
            }
        };
        
        const res = await axios.get("http://localhost:8080/user/profile", axiosConfig);
        this.setState({ user: res.data });
        // console.log(this.state.user);
    }
    
    componentDidMount() {
        this.getUserData();
    }

    handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
        // console.log(this.state);
	};

    handleSubmit= (e) =>{
        e.preventDefault();
        // console.log(this.state)
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
			streetAddress: this.state.streetAddress,
			city: this.state.city,
			state: this.state.state,
			zip: this.state.zip,
            email: this.state.email
		};
        // console.log(JSON.stringify(data));
		let axiosConfig = {
			headers: {
				Authorization: localStorage.getItem("userToken"),
				"Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000"
			},
		};
		axios.put (('http://localhost:8080/user/update'), JSON.stringify(data), axiosConfig)
		.then((response) => console.log("Success:", response))
		.then(setTimeout(() => { this.reRender() }, 500));
    }

    reRender = () => {
		alert("Profile Changes Submitted");
		this.props.history.push('/profile');
	}

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1> {this.state.user.username}'s Profile</h1>
				<label>
					{" "}
					First Name:
					<input type="text" name="firstName" placeholder={this.state.user.firstName} onChange={this.handleChange} />
				</label>
				<br />
				<label>
					{" "}
					Last Name:
					<input type="text" name="lastName" placeholder={this.state.user.lastName} onChange={this.handleChange} />
				</label>
				<br />
				<label>
					{" "}
					Email:
					<input type="text" name="email" placeholder={this.state.user.email} onChange={this.handleChange} />
				</label>
				<br />
				<label>
					{" "}
					Street Address:
					<input type="text" name="streetAddress" placeholder={this.state.user.streetAddress} onChange={this.handleChange} />
				</label>
				<br />
				<label>
					{" "}
					City:
					<input type="text" name="city" placeholder={this.state.user.city} onChange={this.handleChange} />
				</label>
				<br />
				<label>
					{" "}
					State:
					<input type="text" name="state" placeholder={this.state.user.state} onChange={this.handleChange} />
				</label>
				<br />
				<label>
					{" "}
					Zip Code:
					<input type="text" name="zip" placeholder={this.state.user.zip} onChange={this.handleChange} />
				</label>
				<br />
					<button className="btn btn-default" type="submit">
						Submit
					</button>
			</form>
            </div>

        )
    }
}

export default EditProfile