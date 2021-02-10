import React, { Component } from "react";
import Select from "react-select";
import { categoryOptions } from "../docs/data";
import DatePicker from "react-datepicker";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import "react-time-picker/dist/TimePicker.css";
import "react-datepicker/dist/react-datepicker.css";
// import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import moment from "moment";
// import { DateTime } from 'react-datetime-bootstrap';

export class CreatePost extends Component {
	//several states used to ensure independence between elements and to negate any negative overlap
	constructor(props) {
		super(props);
		this.state = {
			streetAddress: "",
			city: "",
			state: "",
			zip: "",
			startDate: "",
			endDate: "",
			startTime: "",
			endTime: "",
			categories: "",
			longitude: "",
			latitude: "",
			address: "",
		};
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleEndTime = this.handleEndTime.bind(this);
		this.handleStartTime = this.handleStartTime.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}
//when an inout field is changed, the state is updated accordingly
	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.getCoords();
	};

//when a user adds an address to the posting, Google maps is used to turn the address into a longitude and latitude coordinates for the map features on the homepage. Doing it here cuts down on resource usage
	async getCoords() {		
		let address1 = (this.state.streetAddress + " " + this.state.city + " " + this.state.state + " " + this.state.zip);
		const res = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?", {
				params: {
					address: address1,
					key: "AIzaSyAjdutfxpJvuPljbVNmz9Zh8YlWkYg9eNQ",
				},
			});
		let lat= (res.data.results[0].geometry.location.lat).toString();
		let long= (res.data.results[0].geometry.location.lng).toString();
		this.setState({ 
			longitude: long, 
			latitude: lat, 
			address: address1,
		});
		this.sendPostData();
	}

	//sends the post data to the DB 
	sendPostData = () => {
		const data = {
			streetAddress: this.state.streetAddress,
			city: this.state.city,
			state: this.state.state,
			zip: this.state.zip,
			startDate: this.state.startDate,
			endDate: this.state.endDate,
			startTime: this.state.startTime,
			endTime: this.state.endTime,
			categories: this.state.categories,
			longitude: this.state.longitude,
			latitude: this.state.latitude,
			address: this.state.address,
		};
		// console.log(JSON.stringify(data));
		let axiosConfig = {
			headers: {
				Authorization: localStorage.getItem("userToken"),
				"Content-Type": "application/json"
			},
		};
		axios.post ('http://localhost:8080/post', JSON.stringify(data), axiosConfig)
		.then((response) => console.log("Success:", response))
		.then(setTimeout(() => { this.reRender() }, 500));
	}

	reRender = () => {
		alert("Post Submitted");
		this.props.history.push('/post');
	}
//these next three handle when a user selects dates and times and applies them to their corresponding states
	handleEndTime(endTime) {
		this.setState({
			endTime: endTime,
		});
		this.checkState();
	}

	checkState() {		
		console.log(moment(this.state.startTime).format("h:mm:ss a"));
		console.log(moment(this.state.endTime).format("h:mm:ss a"));
	}

	handleStartTime(startTime) {
		this.setState({
			startTime: startTime,
		});
	}

	handleDateChange(data, picker) {
		console.log(picker.startDate + " " + picker.endDate);
		this.setState({
			startDate: picker.startDate.format('MMMM DD, yyyy'),
			endDate: picker.endDate.format('MMMM DD, yyyy')
		});
		console.log(this.state);
	}

//similiar to the dates/times, but for the category selections
	handleSelectionChange = (categories) => {
		let values = [];
		for (var i = 0; i < categories.length; i++) {

			values.push(categories[i].label)}
			let valuesStringified=values.toString();

		this.setState({
			categories: valuesStringified
		});
	};

	onFormSubmit(e) {
		e.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					{" "}
					Street Address:
					<input type="text" name="streetAddress" onChange={this.handleChange} />
				</label>
				<br />
				<label>
					{" "}
					City:
					<input type="text" name="city" onChange={this.handleChange} />
				</label>
				<br />
				<label>
					{" "}
					State:
					<input type="text" name="state" onChange={this.handleChange} />
				</label>
				<br />
				<label>
					{" "}
					Zip Code:
					<input type="text" name="zip" onChange={this.handleChange} />
				</label>
				<br />
				<label onClick={(e) => e.preventDefault()}>
					{" "}
					Start and End Date:
					<div>
					<DateRangePicker 
						initialSettings={{ startDate: moment().toDate(), endDate: moment().add(1, "days"), minDate:moment().toDate(), maxSpan:{"days": 2 }} }
						dateFormat="MMMM d, yyyy"
						onEvent={this.handleDateChange} 
					>
  						<input type="text" className="form-control" />
					</DateRangePicker>
					</div>
				</label>
				<label onClick={(e) => e.preventDefault()}>
					{" "}
					Start and End Times:
					<div>
						<DatePicker
							placeholderText="Start Time"
							selected={this.state.startTime}
							onChange={this.handleStartTime}
							showTimeSelect
							showTimeSelectOnly
							timeIntervals={30}
							dateFormat="hh:mm aa"
						/>
						<DatePicker
							placeholderText="End Time"
							selected={this.state.endTime}
							onChange={this.handleEndTime}
							showTimeSelect
							showTimeSelectOnly
							timeIntervals={30}
							dateFormat="hh:mm aa"
						/>
					</div>
				</label>
				<div className="radio">
					{" "}
					<h4>Categories</h4>
					<Select
						isMulti
						value={this.state.categories.label}
						options={categoryOptions}
						className="basic-multi-select"
						classNamePrefix="select"
						onChange={this.handleSelectionChange}
					/>

					<button className="btn btn-default" type="submit">
						Submit
					</button>
				</div>
			</form>
		);
	}
}

export default CreatePost;
