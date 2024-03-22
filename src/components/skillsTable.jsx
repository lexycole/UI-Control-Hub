import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";
import moment from "moment"

class AdminSkillsTable extends Component {
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
			content: (clinicsolo) => (
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
						value={clinicsolo._id}
					/>
				</span>
			),
		},
		{
		  label: "Username",
		  path: "clinics.username",
		  content: (user) => (
			<span className="icon-img sm-r-5">
			  <img
				style={{ width: "20px", height: "20px", borderRadius: "50%" }}
				src={user.clinics.imageSrc}
				alt=""
			  />{" "}
			  {user.clinics.username}
			</span>
		  ),
		},
		{label: 'ClinicNo',   path: 'clinicSoloNo' } ,   
		{label: 'Clinic',   path: 'companyInfo.businessName' } ,       
		{label: 'Name',   path: 'adminskills.name' } ,   
		{label: 'Level',   path: 'adminskills.level' } ,   		
		{label: 'Description',   path: 'adminskills.description' } ,   		
		{label: 'Department',   path: 'adminskills.department' } ,   
		{label: 'Reference',   path: 'adminskills.reference' } ,   		
		{label: 'Note',   path: 'adminskills.note' } ,   		
	];

	render() {
		//console.log(this.columns) ;
		const { users, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={users}
			/>
		);
	}
}

export default AdminSkillsTable;
