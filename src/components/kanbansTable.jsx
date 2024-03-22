import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";
import moment from "moment"

class KanbansTable extends Component {
	columns = [
		{
			key: "checkbox",
			label: <input type="check" style={checkboxStyles} />,
			content: (listKanban) => (
				<span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
					<input
						type="checkbox"
						style={checkboxStyles}
						onChange={this.props.handleCheckboxChange}
						value={listKanban._id}
					/>
				</span>
			),
		},
		{label: "KanbanNo", path: "kanbanNo" },
		{label: "Name", path: "name" },
		{label: "Owner", path: "userID.username" },
		{label: "Participants", path: "participants" },
		{label: "Business", path: "businessNo.companyInfo.businessName" },		
		{label: 'Department',   path: "department" } ,   	  
		{label: 'SubDepartment',   path: "subDepartment" } ,   	  		
		{label: 'Field',   path: "field" } ,   	  
		{label: 'Tags',   path: "tags" } ,   	  
		{label: 'Description',   path: "description" } ,   	  
		{label: 'Note',   path: "note" } ,   	  	  		
		{label: "CreatedOn", path: "createdOn" },
		{label: "Status", path: "status" },		
	];

	render() {
		//console.log(this.columns) ;
		const { kanbans, onSort, sortColumn } = this.props;
		return (
			<Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={kanbans} />
		);
	}
}

const checkboxStyles = {
	width: "15px",
	height: "15px",
	marginTop: "0.4rem",
	borderRadius: 0,
};

export default KanbansTable;
