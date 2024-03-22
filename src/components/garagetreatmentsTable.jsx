import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class GaragetreatmentsTable extends Component {
	columns = [
		{
			key: "checkbox",
			label: <input type="check" style={checkboxStyles} />,
			content: (listGaragetreatment) => (
				<span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
					<input
						type="checkbox"
						style={checkboxStyles}
						onChange={this.props.handleCheckboxChange}
						value={listGaragetreatment._id}
					/>
				</span>
			),
		},
		{label: "GaragetreatmentNo", path: "garagetreatmentNo" },
		{label: "Name", path: "name" },
		{label: "Code", path: "code" },
		{label: 'Duration',   path: "duration" } ,   	  		
		{label: 'Price',   path: "price" } ,   	  
		{label: 'Description',   path: "description" } ,   	  
		{label: "Category", path: "category" },
		{label: 'Tags',   path: "tags" } ,   	  		
		{label: 'Note',   path: "note" } ,   	  	  		
		{label: "Garage", path: "businessName" },		
		{label: 'Valid Till',   path: "validTill" } ,   	  		
		{label: "CreatedOn", path: "createdOn" },
		{label: "Status", path: "status" },		
	];

	render() {
		//console.log(this.columns) ;
		const { garagetreatments, onSort, sortColumn } = this.props;
		return (
			<Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={garagetreatments} />
		);
	}
}

const checkboxStyles = {
	width: "15px",
	height: "15px",
	marginTop: "0.4rem",
	borderRadius: 0,
};

export default GaragetreatmentsTable;
