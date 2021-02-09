import React, { Component, Fragment } from "react";
import axios from "axios";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import moment from "moment";
import "react-table/react-table.css";

export default class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			post: [],
			loading: true,
		};
	}
//retrieving data from DB per user, so users will only have access to their own posts
	async getPostData() {
		let axiosConfig = {
			headers: {
				Authorization: localStorage.getItem("userToken"),
			},
		};

		const res = await axios.get("http://localhost:8080/post/posts", axiosConfig);

		let postDateData = res.data;
		// console.log(postDateData);
		let validPost=[];
		for(var i = 0; i < postDateData.length; i++){
			let endPostDate = (moment(postDateData[i].endDate).format());
			// console.log(endPostDate);
			let todaysDate= (moment(new Date()).format());
			// console.log(todaysDate);
			if(todaysDate <= endPostDate){
				// console.log(endPostDate + " is after " + todaysDate);
				validPost.push(postDateData[i]);
			} 
		};
		console.log(validPost);
		this.setState({ loading: false, post: validPost });
	}

	componentDidMount() {
		this.getPostData();
	}


	render() {
		const columns = [
			{
				Header: "ID",
				accessor: "id",
				width: '40'
			},
			{
				Header: "Street Address",
				accessor: "streetAddress",
				width: 'auto',
				style: { 'whiteSpace': 'unset' }
			},
			{
				Header: "City",
				accessor: "city",
				width: 'auto'
			},
			{
				Header: "State",
				accessor: "state",
				width: 'auto'
			},
			{
				Header: "Zip",
				accessor: "zip",
				width: 'auto'
			},
			{
				Header: "Starting Date",
				id: "startDate",
				accessor: (a) => <Fragment>{moment(a.startDate).format("MMM Do YYYY")}</Fragment>,
				width: 'auto'
			},
			{
				Header: "Ending Date",
				id: "endDate",
				accessor: (a) => <Fragment>{moment(a.endDate).format("MMM Do YYYY")}</Fragment>,
				width: 'auto'
			},
			{
				Header: "Start Time",
				id: "startTime",
				accessor: (a) => <Fragment>{moment(a.startTime).format("h:mm:ss a")}</Fragment>,
				width: 'auto'
			},
			{
				Header: "End Time",
				id: "endTime",
				accessor: (a) => <Fragment>{moment(a.endTime).format("h:mm:ss a")}</Fragment>,
				width: 'auto'
			},
			{
				Header: "Categories",
				accessor: "categories",
				width: 'auto',
				style: { 'whiteSpace': 'unset' }
			},
		];
		return (
			<>
				{" "}
				<h1>Yard Sale Postings</h1>
				<div style={{ width: "80vw" }}>
					<ReactTable data={this.state.post} columns={columns} defaultPageSize={10} />
					<Button>
						<Link to="/createpost">Create New Post </Link>
					</Button>
				</div>
			</>
		);
	}
}

//Fetch example from Darrin Deal Video https://vimeo.com/showcase/7506077/video/395976709
// constructor(props) {
//   super(props);

//   this.state = {
//     posts: []
//   }
// }

// componentDidMount() {
//   fetch("http://localhost:3306/yardsalebe/posts")
//   .then((req) => req.json())
//   .then(data => this.setState({posts: data}));

// }

// return (
//   <div>
//     {this.state.posts.map((item, index) => (
//       <div key={index}>
//       <h1>{item.title}</h1>
//       <p>{item.author}</p>
//       </div>
//     ))}
//   </div>
// )

//fetch info site: developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch   to post, button uses a fecth command, needed: URL, method, and body.
