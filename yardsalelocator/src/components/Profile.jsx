import React, { Component } from 'react';
import axios from 'axios';
import './Profile.css';
import { Link } from "react-router-dom";

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }
//retrieving a users Information from the database to be displayed below.
    async getUserData() {
        let axiosConfig = {
            headers: {
                "Authorization": localStorage.getItem("userToken")
            }
        };

        const res = await axios.get("http://localhost:8080/user/profile", axiosConfig);
        // console.log(res.data);
        this.setState({ user: res.data });
    }

    componentDidMount() {
        this.getUserData();
    }

    render() {
        return (
            <div class="container">
                <div class="item">
                    <p>Profile image will go here</p>
                    <button>Upload Image</button>
                </div>
                <div class="item">
                    <h1>{this.state.user.firstName} {this.state.user.lastName}</h1><br />
                    <h4>User Name</h4>
                    <p id="name">{this.state.user.username}</p>
                    <p id="lName"></p>
                    <h4>Email</h4>
                    <p id="email">{this.state.user.email}</p>
                    <div>
                        <h4>Address</h4>
                        <p id="address">{this.state.user.streetAddress}</p>
                        <p id="city">{this.state.user.city} {this.state.user.state} {this.state.user.zip}</p>
                    </div>
                    <button><Link to="/editprofile">Edit Profile</Link></button>
                </div>
            </div>
        )
    }
}
export default Profile
