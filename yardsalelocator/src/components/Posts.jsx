import React, { Component, Fragment } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import moment from "moment";
import "react-table/react-table.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Posts.css";

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
		let validPost = [];
		for (var i = 0; i < postDateData.length; i++) {
			let endPostDate = moment(postDateData[i].endDate).format();
			let todaysDate = moment(new Date()).format();
			if (todaysDate <= endPostDate) {
				validPost.push(postDateData[i]);
			} else {
				postDateData[i].expired=true;
				validPost.push(postDateData[i]);
			}
		}
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
		for (var i = 0; i < post.length; i++) {	
			return post.map((post) => {
				console.log(post);		
					let validPost = "";
					let daysVariance= (moment(post.startDate).diff(new Date(), 'days'));			
					console.log(post.startDate);
					if((daysVariance <= 5) && (daysVariance >= 0)) {
						validPost= 'LIVE POST'
					} 
					else if(daysVariance < 0) {
						validPost= 'EXPIRED'
					} 
					else {
						validPost = 'Post will go live in ' + (daysVariance - 4)  + ' days';
					}
						let classStatus= 'upcoming';
						if(validPost === 'LIVE POST') {
							classStatus = 'live'
						} 
						else if (validPost === 'EXPIRED') {
							classStatus = 'expiredCard'
						}
				return (
					<div className='card' >
						<Card className={classStatus} style={{ width: '35rem' }}>
							<Card.Header>
								<b>{validPost}</b> 								
							</Card.Header>
							<Card.Body>
								<Card.Subtitle className="mb-2 text-muted">
									<b>Address</b>
								</Card.Subtitle>
								<Card.Text id="address" >{post.address}</Card.Text>
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
								<Card.Subtitle className="mb-2 text-muted">
									<b>Categories: </b>
								</Card.Subtitle>
								<Card.Text id="categories">
								{post.categories}
								</Card.Text>								
							</Card.Body>
							<Card.Footer id="footer">
								<Button variant="info" value={post.id} onClick={() => this.editPost(post.id)}>
									Edit Post
								</Button>{" "}
								<span> </span>
								<Button variant="danger" value={post.id} onClick={() => this.deletePost(post.id)}>
									{" "}
									Delete Post
								</Button>
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
				<h1 class ="heading">Yard Sale Postings</h1>
				<div className="button">
				<Button  variant="warning">
					<Link to="/createpost">Create New Post </Link>
				</Button>
				</div>
				{this.postsListings()}

			</>
		);
	}
}
