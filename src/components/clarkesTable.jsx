import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class ClarkesTable extends Component {
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
			content: (clarke) => (
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
						value={clarke._id}
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
		{label: 'Name',   path: 'name' } ,	
		{label: 'Abbreviation',   path: 'abbreviation' } ,   
		{label: 'CommonName',   path: 'commonName' } ,   	  
		{label: 'OtherName',   path: 'otherName' } , 
		{label: 'Profile',   path: 'profile' } ,   
		{label: 'Relationship',   path: 'relationship' } ,   	  
		{label: 'NaturalHistory',   path: 'naturalHistory' } ,   	  
		{label: 'GeneralInfo',   path: 'generalInfo' } , 
		{label: 'Dose',   path: 'dose' } ,   	  
		{label: 'Symptoms',   path: 'symptoms' } , 
		{label: 'SKU',   path: 'SKU' } ,   
		{label: 'Note',   path: 'note' } ,   	  	  		
	];

	render() {
		//console.log(this.columns) ;
		const { clarkes, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={clarkes}
			/>
		);
	}
}

export default ClarkesTable;