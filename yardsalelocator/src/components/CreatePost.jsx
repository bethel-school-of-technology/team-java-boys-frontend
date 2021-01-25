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
		};
		this.handleStartChange = this.handleStartChange.bind(this);
		this.handleEndChange = this.handleEndChange.bind(this);
		this.handleEndTime = this.handleEndTime.bind(this);
		this.handleStartTime = this.handleStartTime.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
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

	onFormSubmit(e) {
		e.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.formSubmit}>
				<label>
					{" "}
					Street Address:
					<input type="text" name="streetAddress" />
				</label>
				<br />
				<label>
					{" "}
					City:
					<input type="text" name="city" />
				</label>
				<br />
				<label>
					{" "}
					State:
					<input type="text" name="state" />
				</label>
				<br />
				<label>
					{" "}
					Zip Code:
					<input type="text" name="zip" />
				</label>
				<br />

				<label onClick={e => e.preventDefault()}>
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
				<label onClick={e => e.preventDefault()}>
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
						name="categories"
						options={categoryOptions}
						className="basic-multi-select"
						classNamePrefix="select"
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
