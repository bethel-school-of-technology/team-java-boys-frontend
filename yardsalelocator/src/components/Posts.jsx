import React, { Component, Fragment } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
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
                "Access-Control-Allow-Origin": "http://localhost:3000"
			},
		};
		let url = ("http://localhost:8080/post/" + id);
		axios.delete(url, axiosConfig)
		.then((response) => console.log("Success:", response))
		.then(window.location.reload());
	}


	postsListings() {
		let post = this.state.post;
		for (var  i = 0; i <post.length; i++){
			return (
				<Card className="text-center" border="primary">
					<Card.Header>{this.state.post[i].id}</Card.Header>
					<Card.Body>
					  <Card.Title>Yard Sale</Card.Title>
					  <Card.Text id="address">
						  {this.state.post[i].streetAddress}, {this.state.post[i].city}, {this.state.post[i].state}, {this.state.post[i].zip}
					  </Card.Text>
					  <Card.Subtitle className="mb-2 text-muted">Starting Date   |   Ending Date</Card.Subtitle>
					  <Card.Text id="startEndDate">
						  {this.state.post[i].startDate}       {this.state.post[i].endDate}
					  </Card.Text>
					  <Card.Subtitle className="mb-2 text-muted">Starting Time   |   Ending Time</Card.Subtitle>
					  <Card.Text id="startEndTime">
						  {this.state.post[i].startTime}       {this.state.post[i].endTime}
					  </Card.Text>
					  <Card.Link href="/editPost">Edit Post   </Card.Link> 
					<Card.Link href="#">   Delet Post</Card.Link>
					</Card.Body>
				  	<Card.Footer id="categories">{this.state.post[i].categories}</Card.Footer>
			  	</Card> 
			)
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

{/* {/* //Fetch example from Darrin Deal Video https://vimeo.com/showcase/7506077/video/395976709
// constructor(props) { */}
{/* //   super(props);

//   this.state = { */}
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


















{/* <div >
								<h1>{this.state.post[i].id}</h1><br />
								<h4>id</h4>
								<p id="id">{this.state.post[i].id}</p>
								<div>
									<h4>Address</h4>
									<p id="address">{this.state.post[i].streetAddress}</p>
									<p id="city">{this.state.post[i].city} {this.state.post[i].state} {this.state.post[i].zip}</p>
								</div>
								<div>
									<h4>Starting Date</h4>
									<p id="startDate">{this.state.post[i].startDate}</p>
								</div>
								<div>
									<h4>Endning Date</h4>
									<p id="endDate">{this.state.post[i].endDate}</p>
								</div>
								<div>
									<h4>Start Time</h4>
									<p id="startTime">{this.state.post[i].startTime}</p>
								</div>
								<div>
									<h4>End Time</h4>
									<p id="endTime">{this.state.post[i].endTime}</p>
								</div>
								<div>
									<h4>Categories</h4>
									<p id="categories">{this.state.post[i].categories}</p>
								</div>
				 				<button><Link to="/editPost">Edit Profile</Link></button>
						</div> */}

						






// <div >
// 							<div >
// 								<h1>{this.state.post[i].id}</h1><br />
// 								<h4>id</h4>
// 								<p id="id">{this.state.post[i].id}</p>
// 								<div>
// 									<h4>Address</h4>
// 									<p id="address">{this.state.post[i].streetAddress}</p>
// 									<p id="city">{this.state.post[i].city} {this.state.post[i].state} {this.state.post[i].zip}</p>
// 								</div>
// 								<div>
// 									<h4>Starting Date</h4>
// 									<p id="startDate">{this.state.post[i].startDate}</p>
// 								</div>
// 								<div>
// 									<h4>Endning Date</h4>
// 									<p id="endDate">{this.state.post[i].endDate}</p>
// 								</div>
// 								<div>
// 									<h4>Start Time</h4>
// 									<p id="startTime">{this.state.post[i].startTime}</p>
// 								</div>
// 								<div>
// 									<h4>End Time</h4>
// 									<p id="endTime">{this.state.post[i].endTime}</p>
// 								</div>
// 								<div>
// 									<h4>Categories</h4>
// 									<p id="categories">{this.state.post[i].categories}</p>
// 								</div>
// 				 				<button><Link to="/editPost">Edit Profile</Link></button>
// 						</div>
		
{/* <Card className="text-center">
					<Card.Header>{this.state.post[i].id}</Card.Header>
					<Card.Body>
					  <Card.Title>Yard Sale</Card.Title>
					  <Card.Text id="address">
						  {this.state.post[i].streetAddress} + "," + {this.state.post[i].city} + "," {this.state.post[i].state} + "," {this.state.post[i].zip}
					  </Card.Text>
					  <Card.Subtitle className="mb-2 text-muted">Starting Date   |   Ending Date</Card.Subtitle>
					  <Card.Text id="startEndDate">
						  {this.state.post[i].startDate}       {this.state.post[i].endDate}
					  </Card.Text>
					  <Card.Subtitle className="mb-2 text-muted">Starting Time   |   Ending Time</Card.Subtitle>
					  <Card.Text id="startEndTime">
						  {this.state.post[i].startTime}       {this.state.post[i].endTime}
					  </Card.Text>
					  <Button variant="primary"><Card.Link href="/editPost">Edit Post</Card.Link><Go somewhere</Button>
					  <Button variant="primary"><Card.Link href="#">Delet Post</Card.Link><Go somewhere</Button>
					</Card.Body>
				  <Card.Footer id="categories">{this.state.post[i].categories}</Card.Footer>
			  </Card> */}