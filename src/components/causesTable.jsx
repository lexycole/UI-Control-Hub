import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";
import moment from "moment"

class CausesTable extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		values: [],
	// 	};
	// }

	columns = [
		//   {path: '_id', label: 'Id'},
		{
			key: "checkbox",
			label: (
				<input
					type="check"
					style={{
						width: "15px",
						height: "15px",
						marginTop: "0.4rem",
						borderRadius: 0,
					}}
				/>
			),
			content: (kanban) => (
				<span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
					<input
						type="checkbox"
						style={{
							width: "15px",
							height: "15px",
							marginTop: "0.4rem",
							borderRadius: 0,
						}}
						onChange={this.props.handleCheckboxChange}
						value={kanban._id}
					/>
				</span>
			),
		},
		{
			key: "avatar",
			label: "avatar",
			content: (user) => (
				<span className="icon-img sm-r-5">
					<img
						style={{ width: "30px", height: "30px", borderRadius: "50%" }}
						src={user.imageSrc}
						alt=""
					/>
				</span>
			),
		},
		{label: 'Owner',   path: 'username' } ,
		{label: 'Title',   path: 'title' } ,   
		{label: 'Message',   path: 'message' } ,   
		{label: 'Root',   path: 'root' } ,   	  
		{label: 'Implementation',   path: 'implementation' } ,   	  
		{label: 'Effectiveness',   path: 'effectiveness' } ,   	  
		{label: 'Level',   path: 'level' } ,   	  
		{label: 'Reply',   path: 'reply' } ,   	  	  
	];

	render() {
		//console.log(this.columns) ;
		const { kanbans, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={kanbans}
			/>
		);
	}
}

export default CausesTable;