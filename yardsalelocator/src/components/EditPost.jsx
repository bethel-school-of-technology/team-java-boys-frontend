import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

import Select from "react-select";
import { categoryOptions } from "../docs/data";
import DatePicker from "react-datepicker";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import "react-time-picker/dist/TimePicker.css";
import "react-datepicker/dist/react-datepicker.css";
// import "../../node_modules/bootstrap/dist/css/bootstrap.css";
// import { DateTime } from 'react-datetime-bootstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

export class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem("postId"),
            post: {},
            // streetAddress: "",
			// city: "",
			// state: "",
			// zip: "",
			// startDate: "",
			// endDate: "",
			// startTime: "",
			// endTime: "",
			// categories: "",
			// longitude: "",
			// latitude: "",
			// address: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

    handleSubmit= (e) =>{
		e.preventDefault();
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
        let axiosConfig = {
			headers: {
				Authorization: localStorage.getItem("userToken"),
				"Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000"
			},
		};
        let url = ("http://localhost:8080/post/" + this.state.id);
		axios.put(url, JSON.stringify(data), axiosConfig)
		.then((response) => console.log("Success:", response))
		.then(setTimeout(() => { this.reRender() }, 500));
    }


reRender = () => {
    alert("Post Changes Submitted");
    this.props.history.push('/post');
}

    componentDidMount(){
        this.getPostData();
    }

    async getPostData() {
        let axiosConfig = {
            headers: {
                "Authorization": localStorage.getItem("userToken")
            }
        };     
        let url = ("http://localhost:8080/post/" + this.state.id);
        const res = await axios.get(url, axiosConfig);
        this.setState({ post: res.data });        
        console.log(this.state.post.streetAddress);
    }

    handleDateChange(data, picker) {
		console.log(picker.startDate + " " + picker.endDate);
		this.setState({
			startDate: picker.startDate,
			endDate: picker.endDate
		});
		console.log(this.state);
	}

	handleEndTime(endTime) {
		this.setState({
			endTime: endTime,
		});
		this.checkState();
	}

	handleStartTime(startTime) {
		this.setState({
			startTime: startTime,
		});
	}

    handleSelectionChange = (categories) => {
		let values = [];
		for (var i = 0; i < categories.length; i++) {

			values.push(categories[i].label)}
			let valuesStringified=values.toString();

		this.setState({
			categories: valuesStringified
		});
	};

    render () {        
        return (            
            <div>   
                <p><b>Current Address:</b> {this.state.post.address}
                </p>
                <h4>Edit Address</h4>
                 <form onSubmit={this.handleSubmit}>
                    <label>
                        {" "}
                        Street Address:
                        <input type="text" name="streetAddress" placeholder={this.state.post.streetAddress} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        {" "}
                        City:
                        <input type="text" name="city" placeholder={this.state.post.city} onChange={this.handleChange} />
                    </label>
                    <label>
                        {" "}
                        State:
                        <input type="text" name="state" placeholder={this.state.post.state} onChange={this.handleChange} />
                    </label>
                    <label>
                        {" "}
                        Zip:
                        <input type="text" name="zip" placeholder={this.state.post.zip} onChange={this.handleChange} />
                    </label>
                    <br />
                    <br />
                        <p><b>Current Start Date: </b>
                        {moment(this.state.post.startDate).format("MMM Do YYYY")} <b>Current End Date: </b>
                        {moment(this.state.post.endDate).format("MMM Do YYYY")} </p>
                    <br/>
                    <h4>Change Start and End Dates:</h4>
					<div>
					<DateRangePicker 
						initialSettings={{ 
                            startDate: moment().toDate(), 
                            endDate: moment().add(1, "days"), minDate:moment().toDate(), maxSpan:{"days": 2 }} }
						dateFormat="MMMM d, yyyy"
						onEvent={this.handleDateChange} 
					>
  						<input type="text" className="form-control" />
					</DateRangePicker>
					</div>
                    <br />
                    <br />
                        <p><b>Current Start Date: </b>
                        {moment(this.state.post.startTime).format("h:mm:ss a")} <b>Current End Date: </b>
                        {moment(this.state.post.endTime).format("h:mm:ss a")} </p>
                    <br/>
                    <h4>Change Start and End Times:</h4>                    
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
                    <br/>
                    {/* <p><b>Categories:</b>
                    {this.state.post.categories}
                    </p>
                    <h4>Change Categories</h4>
					<Select
						isMulti
						value={this.state.categories.label}
						options={categoryOptions}
						className="basic-multi-select"
						classNamePrefix="select"
						onChange={this.handleSelectionChange}
					/> */}
                        <button type="submit">
                            Submit
                        </button>
                        <button><Link to="/post">Cancel</Link></button>
                </form>
            </div>
            )
        }
    }
    
    export default EditPost

   