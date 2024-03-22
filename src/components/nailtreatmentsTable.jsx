import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";
import moment from "moment"

class NailtreatmentsTable extends Component {
	columns = [
		{
			key: "checkbox",
			label: <input type="check" style={checkboxStyles} />,
			content: (listNailtreatment) => (
				<span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
					<input
						type="checkbox"
						style={checkboxStyles}
						onChange={this.props.handleCheckboxChange}
						value={listNailtreatment._id}
					/>
				</span>
			),
		},
		{label: "NailtreatmentNo", path: "nailtreatmentNo" },
		{label: "Code", path: "code" },		
		{label: "Name", path: "name" },
		{label: 'Duration',   path: "duration" } ,   	  		
		{label: 'Price',   path: "price" } ,   	  
		{label: 'Description',   path: "description" } ,   	  
		{label: "Category", path: "category" },
		{label: 'Tags',   path: "tags" } ,   	  		
		{label: 'Note',   path: "note" } ,   	  	  		
		{label: "Salon", path: "businessName" },		
		{label: "CreatedOn", path: "createdOn" },
		{label: "Status", path: "status" },		
	];

	render() {
		//console.log(this.columns) ;
		const { nailtreatments, onSort, sortColumn } = this.props;
		return (
			<Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={nailtreatments} />
		);
	}
}

const checkboxStyles = {
	width: "15px",
	height: "15px",
	marginTop: "0.4rem",
	borderRadius: 0,
};

export default NailtreatmentsTable;
