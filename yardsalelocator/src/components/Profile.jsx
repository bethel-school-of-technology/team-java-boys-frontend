import React, { Component } from 'react'
// import axios from 'axios';

export class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: [],
		};
	}
    
    componentDidMount() {
            fetch("http://localhost:8080/user")
            .then((req) => req.json())
            .then(data => this.setState({user: data}));
	}

    render() {
        return (
  <div>
    {this.state.user.map((item, index) => (
      <div key={index}>
          <h4>Username</h4>
      <p>{item.username}</p>
          <h4>First Name</h4>
      <p>{item.firstName}</p>
          <h4>Last Name</h4>
      <p>{item.lastName}</p>
          <h4>Address</h4>
      <p>{item.streetAddress}</p>
          <h4>City</h4>
      <p>{item.city}</p>
          <h4>State</h4>
      <p>{item.state}</p>
          <h4>Zip Code</h4>
      <p>{item.zip}</p>
      </div>
    ))}
  </div>
        )
}
}
export default Profile
