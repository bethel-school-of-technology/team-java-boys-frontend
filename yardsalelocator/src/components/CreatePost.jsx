import React, { Component } from "react";
import Select from "react-select";
import { categoryOptions } from "../docs/data";
import DatePicker from "react-datepicker";

import "react-time-picker/dist/TimePicker.css";
import "react-datepicker/dist/react-datepicker.css";

export class CreatePost extends Component {
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
		};
		this.handleStartChange = this.handleStartChange.bind(this);
		this.handleEndChange = this.handleEndChange.bind(this);
		this.handleEndTime = this.handleEndTime.bind(this);
		this.handleStartTime = this.handleStartTime.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const url = "http://localhost:8080/post";
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
		};
		console.log(data);
		fetch(url, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json", "Authorization" : localStorage.getItem("userToken") } })
			.then((res) => res.json())
			.catch((error) => console.error("Error:", error))
			.then((response) => console.log("Success:", response))
			.then(this.reRender());
	};

	reRender = () => {
		alert("Post Submitted");
		this.props.history.push('/post');
	}

	handleEndTime(endTime) {
		this.setState({
			endTime: endTime,
		});
	}

	handleStartTime(startTime) {
		this.setState({
			startTime: startTime,
		});
	}

	handleStartChange(startDate) {
		this.setState({
			startDate: startDate,
		});
	}

	handleEndChange(endDate) {
		this.setState({
			endDate: endDate,
		});
	}

	handleSelectionChange = (categories) => {
		let values=[];
		for (var i = 0; i < categories.length; i++) {
			values.push(categories[i].label)}
			let valuesStringified=values.toString();
			console.log(valuesStringified); 
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
						<DatePicker
							placeholderText="Start Date"
							selected={this.state.startDate}
							onChange={this.handleStartChange}
							dateFormat="MMMM d, yyyy"
						/>
						<DatePicker
							placeholderText="End Date"
							selected={this.state.endDate}
							onChange={this.handleEndChange}
							dateFormat="MMMM d, yyyy"
						/>
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
							timeIntervals={60}
							dateFormat="hh:mm aa"
						/>
						<DatePicker
							placeholderText="End Time"
							selected={this.state.endTime}
							onChange={this.handleEndTime}
							showTimeSelect
							showTimeSelectOnly
							timeIntervals={60}
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
