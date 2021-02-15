import React, { Component } from 'react';
import axios from 'axios';
import './Profile.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

//This page displays the user profile and information pertaining to each user
export class Profile extends Component {
    //This will manage the state of the profile page
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            profile: <FontAwesomeIcon icon={faUserCircle} size='10x' color='#4570fc' />,
            selectedFile: null,
            files: []
        };
    }



    //retrieving a user's info from the database to be displayed
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

    //getUserData() will run once the component mounts
    componentDidMount() {
        this.getUserData();
    }

    // onChange = (e) => {
    //     this.setState({selectedFile: e.target.file})
    //     const files = Array.from(e.target.files)

    //     const formData = new FormData()

    //     files.forEach((file, i) => {
    //         formData.append(i, file)
    //     })
    //     console.log(formData);
    //     // const reader = new FileReader();
    //     // reader.onload = this._handleReaderLoaded.bind(this);
    //     // reader.readAsBinaryString(file);
    //     fetch(`https://api.cloudinary.com/v1_1/dgvewzbdj/image/upload`, {
    //         method: 'POST',
    //         body: formData
    //     })
    //         .then(res => res.json())
    //         .then(console.log("success"))
    // }

    // _handleReaderLoaded = (readerEvt) => {
    //     let binaryString = readerEvt.target.result
    //     this.setState({
    //         selectedFile: btoa(binaryString)
    //     })
    // }

    // onFileSubmit = (e) => {
    //     e.preventDefault();
    //     // const preview = document.getElementById("profile-picture");
    //     // console.log("binary string:", this.state.base64TextString);

    //     // let payload = { pic: this.state.base64TextString }
    //     // fetch('http://localhost:8080/user/updatePic', {
    //     //     method: "PUT",
    //     //     headers: {
    //     //         "Content-Type": "application/json",
    //     //         "Authorization": localStorage.getItem('userToken'),
    //     //         "Access-Control-Allow-Origin": "http://localhost:3000"
    //     //     },
    //     //     body: JSON.stringify(payload)
    //     // })
    //     //     .then(resp => resp.json())
    //     //     .then(json => console.log(json))

    //     // preview.src = "data:image/png;base64," + this.state.base64TextString
    //     const formData = new FormData();

    //     // Update the formData object
    //     formData.append(
    //       "myFile",
    //       this.state.selectedFile,
    //       this.state.selectedFile.name
    //     );

    //     // Details of the uploaded file
    //     console.log(this.state.selectedFile);
    // }

    render() {
        return (
            <div class="container">
                <div class="item">
                    <div id="profile-picture">{this.state.profile}</div>
                    {/* <form onSubmit={(e) => this.onFileSubmit(e)} onChange={(e) => this.onChange(e)}>
                        <input
                            type="file"
                            name="image"
                            id="file"
                            accept=".jpeg, .png, .jpg" />
                        <input type="submit" />
                    </form> */}
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
                        <p id="city">{this.state.user.city}, {this.state.user.state} {this.state.user.zip}</p>
                    </div>
                    <button><Link to="/editprofile">Edit Profile</Link></button>
                </div>
            </div>
        )
    }
}
export default Profile
