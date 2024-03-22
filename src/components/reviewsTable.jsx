import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class ReviewsTable extends Component {
	columns = [
		{
			key: "checkbox",
			label: <input type="check" style={checkboxStyles} />,
			content: (Review) => (
				<span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
					<input
						type="checkbox"
						style={checkboxStyles}
						onChange={this.props.handleCheckboxChange}
						value={Review._id}
					/>
				</span>
			),
		},
		{ label: "ParentID", path: "parentID" },
		{ label: "Username", path: "userId" },
		{ label: "Narrative", path: "narrative" },
		{ label: "Rating", path: "rating" },
		{ label: "CreatedOn", path: "createdOn" },
	];

	render() {
		//console.log(this.columns) ;
		const { Reviews, onSort, sortColumn } = this.props;
		return <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={Reviews} />;
	}
}

const checkboxStyles = {
	width: "15px",
	height: "15px",
	marginTop: "0.4rem",
	borderRadius: 0,
};

export default ReviewsTable;
