import React, { Component } from "react";
import axios from "axios";

export class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: []
        };
    }
    componentDidMount() {
        this.getPostData();
    }

    async getPostData() {
        let axiosConfig = {
            headers: {
                "Authorization": localStorage.getItem("userToken")
            }
        };        
        const res = await axios.get("http://localhost:8080/post/posts", axiosConfig);
        this.setState({ post: res.data });
        console.log(this.state)
    }
    render () {
        return (
            <>
            Test
            </>
            )
        }
    }
    
    export default EditPost