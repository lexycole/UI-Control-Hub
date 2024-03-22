import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class BogersTable extends Component {
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
			content: (boger) => (
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
						value={boger._id}
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
		{label: 'Name',   path: 'bogers.name' } ,	
		{label: 'Abbreviation',   path: 'bogers.abbreviation' } ,   
		{label: 'CommonName',   path: 'bogers.commonName' } ,   	  
		{label: 'OtherName',   path: 'bogers.otherName' } , 
		{label: 'Profile',   path: 'bogers.profile' } ,   
		{label: 'Relationship',   path: 'bogers.relationship' } ,   	  
		{label: 'SKU',   path: 'bogers.SKU' } ,   
		{label: 'Note',   path: 'bogers.note' } ,   	    		
	];

	render() {
		//console.log(this.columns) ;
		const { bogers, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={bogers}
			/>
		);
	}
}

export default BogersTable;