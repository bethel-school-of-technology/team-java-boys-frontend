import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

export class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

	//retrieving user information from DB
    async getUserData() {
        let axiosConfig = {
            headers: {
                "Authorization": localStorage.getItem("userToken")
            }
        };
        
        const res = await axios.get("http://localhost:8080/user/profile", axiosConfig);
        this.setState({ user: res.data });
        // console.log(this.state.user);
    }
    
    componentDidMount() {
        this.getUserData();
    }

    handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
//sending the updates to the DB
    handleSubmit= (e) =>{
		e.preventDefault();
		const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
			streetAddress: this.state.streetAddress,
			city: this.state.city,
			state: this.state.state,
			zip: this.state.zip,
            email: this.state.email
		};
		console.log(data);
		let zipReg = /^[0-9]{5}(?:-[0-9]{4})?$/;
		let emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		let stateReg= /^([Aa][LKSZRAEPlkszraep]|[Cc][AOTaot]|[Dd][ECec]|[Ff][LMlm]|[Gg][AUau]|[Hh][Ii]|[Ii][ADLNadln]|[Kk][SYsy]|[Ll][Aa]|[Mm][ADEHINOPSTadehinopst]|[Nn][CDEHJMVYcdehjmvy]|[Oo][HKRhkr]|[Pp][ARWarw]|[Rr][Ii]|[Ss][CDcd]|[Tt][NXnx]|[Uu][Tt]|[Vv][AITait]|[Ww][AIVYaivy]Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New\sHampshire|New\sJersey|New\sMexico|New\sYork|North\sCarolina|North\sDakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode\sIsland|South\sCarolina|South\sDakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West\sVirginia|Wisconsin|Wyoming)$/;
		if(!(data.zip === undefined) && !(zipReg.test(data.zip)) ){
				alert("Please enter valid zip code");
				e.preventDefault();		
				return; 
		}
		if(!(data.email === undefined) && !(emailReg.test(data.email))) {
					alert("Please enter valid email address");
					e.preventDefault();
					return; 
		}
		if(!(data.state === undefined) && !(stateReg.test(data.state))) {
				alert("Please enter a valid  State.");
				e.preventDefault();
				return; 
		}
		else{
			e.preventDefault();
        // console.log(this.state)
        
        // console.log(JSON.stringify(data));
		let axiosConfig = {
			headers: {
				"Authorization": localStorage.getItem("userToken"),
				"Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000"
			},
		};
		axios.put (('http://localhost:8080/user/update'), JSON.stringify(data), axiosConfig)
		.then((response) => console.log("Success:", response))
		.then(setTimeout(() => { this.reRender() }, 500));
    }
}

    reRender = () => {
		alert("Profile Changes Submitted");
		this.props.history.push('/profile');
	}

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1> {this.state.user.username}'s Profile</h1>
				<label>
					{" "}
					First Name:
					{/* using placeholders with the current value of the information in their profile */}
					<input type="text" name="firstName" placeholder={this.state.user.firstName} onChange={this.handleChange} />
				</label>
				<br />
				<label>
					{" "}
					Last Name:
					<input type="text" name="lastName" placeholder={this.state.user.lastName} onChange={this.handleChange} />
				</label>
				<br />
				<label>
					{" "}
					Email:
					<input type="text" name="email" placeholder={this.state.user.email} onChange={this.handleChange} />
				</label>
				<br />
				<label>
					{" "}
					Street Address:
					<input type="text" name="streetAddress" placeholder={this.state.user.streetAddress} onChange={this.handleChange} />
				</label>
				<br />
				<label>
					{" "}
					City:
					<input type="text" name="city" placeholder={this.state.user.city} onChange={this.handleChange} />
				</label>
				<br />
				<label>
					{" "}
					State:
					<input type="text" name="state" placeholder={this.state.user.state} onChange={this.handleChange} />
				</label>
				<br />
				<label>
					{" "}
					Zip Code:
					<input type="text" name="zip" placeholder={this.state.user.zip} onChange={this.handleChange} />
				</label>
				<br />
					<button type="submit">
						Submit
					</button>
					<button><Link to="/profile">Cancel</Link></button>
			</form>
            </div>

        )
    }
}

export default EditProfile