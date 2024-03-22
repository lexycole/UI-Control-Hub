import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";
import moment from "moment"

class MedicalfilesTable extends Component {
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
			content: (medicalfile) => (
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
						value={medicalfile._id}
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
						style={{ width: "20px", height: "20px", borderRadius: "50%" }}
						src={user.imageSrc}
						alt=""
					/>
				</span>
			),
		},
		{label: 'Username',   path: 'patientUser.username' } ,
		{label: 'Firstname',   path: 'patientUser.contactName.first' } ,   
		{label: 'Lastname',   path: 'patientUser.contactName.last' } ,   	  
		{ label: "Complaint", path: "chiefComplaint" },
		{ label: "Date", path: "date" },
		{ label: "Session", path: "sessionType" },
		{ label: "Doctor", path: "doctor" },
		{ label: "Clinic", path: "businessName" },		
		{ label: "View More Sessions", path: "session" },
	];

	render() {
		//console.log(this.columns) ;
		const { medicalfiles, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={medicalfiles}
			/>
		);
	}
}

export default MedicalfilesTable;