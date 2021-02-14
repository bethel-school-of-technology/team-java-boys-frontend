import React, { Component, Fragment } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import moment from "moment";
import "react-table/react-table.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
		console.log(postDateData);
		let validPost = [];
		for (var i = 0; i < postDateData.length; i++) {
			let endPostDate = moment(postDateData[i].endDate).format();
			// console.log(endPostDate);
			let todaysDate = moment(new Date()).format();
			// console.log(todaysDate);
			if (todaysDate <= endPostDate) {
				// console.log(endPostDate + " is after " + todaysDate);
				validPost.push(postDateData[i]);
			}
		}
		console.log(validPost);
		this.setState({ loading: false, post: validPost });
	}

	componentDidMount() {
		this.getPostData();
	}

	editPost(id) {
		// console.log("Edit post reached, id: " + id);
		window.localStorage.setItem("postId", id);
		this.props.history.push(`/editpost/${id}`);
	}

	deletePost(id) {
		let axiosConfig = {
			headers: {
				Authorization: localStorage.getItem("userToken"),
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "http://localhost:3000",
			},
		};
		let url = "http://localhost:8080/post/" + id;
		axios
			.delete(url, axiosConfig)
			.then((response) => console.log("Success:", response))
			.then(window.location.reload());
	}

	postsListings() {
		let post = this.state.post;
		console.log(post);
		for (var i = 0; i < post.length; i++) {
			console.log(post[i].id);
			return post.map((post) => {
				return (
					<div className="card">
						<Card className="text-center" border="primary">
							<Card.Header>
								<b>Yard Sale Posting {post.id}</b>
							</Card.Header>
							<Card.Body>
								<Card.Text id="address">{post.address}</Card.Text>
								<Card.Subtitle className="mb-2 text-muted">
									<b>Starting Date | Ending Date</b>
								</Card.Subtitle>
								<Card.Text id="startEndDate">
									{moment(post.startDate).format("MMM Do YYYY")} to{" "}
									{moment(post.endDate).format("MMM Do YYYY")}
								</Card.Text>
								<Card.Subtitle className="mb-2 text-muted">
									<b>Starting Time | Ending Time </b>
								</Card.Subtitle>
								<Card.Text id="startEndTime">
									{moment(post.startTime).format("h:mm:ss a")} to{" "}
									{moment(post.endTime).format("h:mm:ss a")}
								</Card.Text>
								<Card.Text id="categories">
									<b>Categories: </b> {post.categories}
								</Card.Text>
								<Button value={post.id} onClick={() => this.editPost(post.id)}>
									Edit Post
								</Button>{" "}
								<span> </span>
								<Button value={post.id} onClick={() => this.deletePost(post.id)}>
									{" "}
									Delete Post
								</Button>
							</Card.Body>
							<Card.Footer id="footer">
							</Card.Footer>
						</Card>
						<br />
					</div>
				);
			});
		}
	}

	render() {
		return (
			<>
				<h1>Yard Sale Postings</h1>
				<Button>
					<Link to="/createpost">Create New Post </Link>
				</Button>
				{this.postsListings()}
			</>
		);
	}
}
