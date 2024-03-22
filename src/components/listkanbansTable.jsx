import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";
import moment from "moment"

class ListKanbansTable extends Component {
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
		{ label: "KanbanNo", path: "kanbanNo.kanbanNo" },		
		{ label: "KanbanName", path: "kanbanNo.name" },
		{ label: "Name of list", path: "name" },
		{ label: "Owner", path: "userID.username" },
		{ label: "Color", path: "color" },
	//	{ label: "Participants", path: "participants" },		
	//	{ label: "Note", path: "note" },
		{ label: "CreatedOn", path: "createdOn" },		
	];

	render() {
		//console.log(this.columns) ;
		const { listKanbans, onSort, sortColumn } = this.props;
		return (
			<Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={listKanbans} />
		);
	}
}

const checkboxStyles = {
	width: "15px",
	height: "15px",
	marginTop: "0.4rem",
	borderRadius: 0,
};

export default ListKanbansTable;