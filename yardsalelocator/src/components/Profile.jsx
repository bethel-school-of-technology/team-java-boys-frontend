import React, { Component } from 'react';
import axios from 'axios';
import './Profile.css';

export class Profile extends Component {
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
        console.log(res.data);
        this.setState({ user: res.data });
    }

    componentDidMount() {
        this.getUserData();
    }

    render() {
        return (
            <div>
                {/* {this.state.user.map((item, index) => ( */}
                    <div>
                        
                            <div >
                                <h4>Username</h4>
                                <p>{this.state.user.username}</p>
                                <h4>Email</h4>
                                <p>{this.state.user.email}</p>
                                <h4>First Name</h4>
                                <p>{this.state.user.firstName}</p>
                                <h4>Last Name</h4>
                                <p>{this.state.user.lastName}</p>
                                <h4>Address</h4>
                                <p>{this.state.user.streetAddress}</p>
                                <h4>City</h4>
                                <p>{this.state.user.city}</p>
                                <h4>State</h4>
                                <p>{this.state.user.state}</p>
                                <h4>Zip Code</h4>
                                <p>{this.state.user.zip}</p>
                            </div>
                    </div>
                 {/* ))} */}
            </div>
        )
    }
}
export default Profile
