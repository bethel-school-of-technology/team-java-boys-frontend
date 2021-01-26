import React, { Component } from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import CreatePost from "./CreatePost";
import { Link, Route } from "react-router-dom";
import { Button } from "reactstrap";

//Axios info site: github.com/axios/axios

export default class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			post: [],
			loading: true,
		};
	}

	async getPostData() {
		const res = await axios.get("http://localhost:8080/post");
		console.log(res.data);
		this.setState({ loading: false, post: res.data });
	}

	componentDidMount() {
		this.getPostData();
	}

	render() {
		const columns = [
			{
				Header: "ID",
				accessor: "id",
			},
			{
				Header: "Street Address",
				accessor: "streetAddress",
			},
			{
				Header: "City",
				accessor: "city",
			},
			{
				Header: "State",
				accessor: "state",
			},
			{
				Header: "Zip Code",
				accessor: "zip",
			},
			{
				Header: "Starting Date",
				accessor: "startDate",
			},
			{
				Header: "Ending Date",
				accessor: "endDate",
			},
			{
				Header: "Starting Time",
				accessor: "startTime",
			},
			{
				Header: "Ending Time",
				accessor: "endTime",
			},
			{
				Header: "Categories",
				accessor: "categories",
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
					<Route path="/createpost" component={CreatePost} />
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
