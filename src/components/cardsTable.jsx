import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class CardsTable extends Component {
	columns = [
		{
			key: "checkbox",
			label: <input type="check" style={checkboxStyles} />,
			content: (card) => (
				<span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
					<input
						type="checkbox"
						style={checkboxStyles}
						onChange={this.props.handleCheckboxChange}
						value={card._id}
					/>
				</span>
			),
		},
		{ label: "KanbanNo", path: "kanbanNo" },
		{ label: "ListNo", path: "listKanbanNo" },
		{ label: "CardNo", path: "cardNo" },
		{ label: "Name", path: "cardname" },
		{ label: "Narrative", path: "narrative" },
		{ label: "Category", path: "categgory" },
		{ label: "Priority", path: "priority" },
		{ label: "Deadline", path: "deadline" },
		{ label: "Document No", path: "documentNo" },
		{ label: "Field", path: "field" },
		{ label: "Tags", path: "tags" },
		{ label: "Reference", path: "cardReference" },
		{ label: "Sharinglink", path: "sharingLink" },
		{ label: "AssignedTo", path: "assignedTo" },
		{ label: "SharedTo", path: "sharedTo" },
		{ label: "SharedTill", path: "sharedTill" },
		{ label: "Note", path: "note" },
		{ label: "CreatedOn", path: "createdOn" },
		{ label: "Status", path: "status" },
	];

	render() {
		//console.log(this.columns) ;
		const { cards, onSort, sortColumn } = this.props;
		return <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={cards} />;
	}
}

const checkboxStyles = {
	width: "15px",
	height: "15px",
	marginTop: "0.4rem",
	borderRadius: 0,
};

export default CardsTable;
