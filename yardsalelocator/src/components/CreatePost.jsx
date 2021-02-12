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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

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
			open: false,
		};
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleEndTime = this.handleEndTime.bind(this);
		this.handleStartTime = this.handleStartTime.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.getUserData = this.getUserData.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleClickOpen = this.handleClickOpen.bind(this);
	}

	handleClickOpen = (e) => {
		e.preventDefault();
		console.log(this.state);
		if(this.state.streetAddress === ""){
			alert("Please enter a street address");
			return;
		}if(this.state.city === ""){
			alert("Please enter a city");
			return;
		}if(this.state.state === ""){
			alert("Please enter a state");
			return;
		}if(this.state.zip === ""){
			alert("Please enter a zip code");
			return;
		}if((this.state.startDate === "") || (this.state.endDate === "")){
			alert("Please enter a start/end date");
			return;
		}if((this.state.startTime === "")){
			alert("Please enter a start time");
			return;
		}if((this.state.endTime === "") || (this.state.endTime < this.state.startTime)){
			alert("Please enter a valid end time");
			return;
		}
		else{
		this.setState({ open: true });
			// console.log("reached")
			this.dialogConfirm();}
	  };

	  dialogConfirm = () => {
		const { fullScreen } = this.props;
		return (
			<Dialog
				fullScreen={fullScreen}
				open={this.state.open}
				onClose={this.handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">{"Confirm Post Details"}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<p><b>Address: </b>{this.state.streetAddress} {this.state.city} {this.state.state} {this.state.zip}</p>
						<p><b>Dates: </b>{moment(this.state.startDate).format("MMM Do YYYY")} to {moment(this.state.endDate).format("MMM Do YYYY")}</p>
						<p><b>Time: </b>{moment(this.state.startTime).format("h:mm:ss a")} to {moment(this.state.endTime).format("h:mm:ss a")}</p>							
						<p><b>Categories: </b>{this.state.categories}</p>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleClose} color="primary">
						Edit
					</Button>
					<Button onClick={this.handleSubmit} type="submit" color="primary" autoFocus>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		);
		
	  }
	
	  handleClose = (e) => {
		e.preventDefault();
		this.setState({ open: false });
	  };
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
		if((this.state.streetAddress === "")||(this.state.city === "")||(this.state.state === "")||(this.state.zip === "") ){
			alert("All address fields are required")	
		} else {
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
	}}

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
		// alert("Post Submitted");
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
			startDate: picker.startDate,
			endDate: picker.endDate
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

	async getUserData(e) {
		e.preventDefault();
			let axiosConfig = {
				headers: {
					"Authorization": localStorage.getItem("userToken")
				}
			};
			
			const res = await axios.get("http://localhost:8080/user/profile", axiosConfig);
		this.setState({ streetAddress : res.data.streetAddress,
			city : res.data.city,
			state : res.data.state,
			zip : res.data.zip });
		console.log(this.state);
		}
	

	onFormSubmit(e) {
		e.preventDefault();
	}

	render() {
		
		return (
			<>
			<form onSubmit={this.handleSubmit}>
				<button onClick={this.getUserData} >Use Default Address</button>
				<br/>
				<label>
					{" "}
					Street Address:
					<input type="text" name="streetAddress" onChange={this.handleChange} placeholder={this.state.streetAddress} />
				</label>
				<br />
				<label>
					{" "}
					City:
					<input type="text" name="city" onChange={this.handleChange} placeholder={this.state.city}/>
				</label>
				<br />
				<label>
					{" "}
					State:
					<input type="text" name="state" onChange={this.handleChange} placeholder={this.state.state}/>
				</label>
				<br />
				<label>
					{" "}
					Zip Code:
					<input type="text" name="zip" onChange={this.handleChange} placeholder={this.state.zip}/>
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
				<br/>
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

					<button onClick={this.handleClickOpen}>
						Submit
					</button>
				</div>
			</form>
					<div>
					{this.dialogConfirm()}
					</div>
					</>
		);
	}
}

CreatePost.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
  };

export default withMobileDialog()(CreatePost);
