import React, { Component } from "react";
import Select from "react-select";
import { categoryOptions } from "../docs/data";

export class CreatePost extends Component {
	render() {
		return (
			<form onSubmit={this.formSubmit}>
				<label>
					{" "}
					Address:
					<input type="text" name="address" />
				</label>
				<br />
				<label>
					{" "}
					Date(s):
					<input type="text" name="date" />
				</label>
				<br />
				<label>
					{" "}
					Time:
					<input type="text" name="time" />
				</label>
				<br />
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
//     render() {
//         return (
//             <div>
//                 <form>
//                     <label> Address:
//                 <input type='text' name='address'/>
//                 </label>
//                     <label> Date(s):
//                 <input type='text' name='date'/>
//                 </label>
//                     <label> Time:
//                 <input type='text' name='time'/>
//                 </label>
<label>
	{" "}
	Categories:
	<input type="radio" name="toys" value="Toys" /> Toys
	<input type="radio" name="clothes" value="Clothes" /> Clothes
	<input type="radio" name="tools" value="Tools" /> Tools
	<input type="radio" name="artsandcrafts" value="Arts and Crafts" /> Arts and Crafts
	<input type="radio" name="baby" value="Baby" /> Baby
</label>;
//                 </form>
//             </div>
//         )
//     }
// }

export default CreatePost;
