import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";
import moment from "moment"

class ItemsTable extends Component {
	columns = [
		{
			key: "checkbox",
			label: <input type="check" style={checkboxStyles} />,
			content: (item) => (
				<span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
					<input
						type="checkbox"
						style={checkboxStyles}
						onChange={this.props.handleCheckboxChange}
						value={item._id}
					/>
				</span>
			),
		},
		{ label: "ItemNo", path: "itemNo" },
		{ label: "Operator", path: "user.username"},
		{ label: "Serial", path: "serial" },
		{ label: "Batch", path: "batch" },
		{ label: "Priority", path: "priority" },
		//{ label: "CreatedOn", path: "createdOn" },
		{ 
			label: "CreatedOn",
			path: "createdOn",
			content : (item) => (
			  <div className="w-100 h-100">
				{moment(item.createdOn).format("LLL")}
			  </div>
			) 
		  },	
		{ label: "ODelivery", path: "Odelivery" },
		{ label: "Sharinglink", path: "share.link" },
		//{ label: "SharedTo", path: "share.sharedTo.username" },
		{
			label: "SharedTo",
			content: (item) => (item.share.sharedTo.map(sharedTo=><p>{sharedTo.username}</p>)
			),
		},
		//{ label: "Note", path: "note" },
		{ label: "Status", path: "status" },		
	];

	render() {
		//console.log(this.columns) ;
		const { items, onSort, sortColumn } = this.props;
		return <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={items} />;
	}
}

const checkboxStyles = {
	width: "15px",
	height: "15px",
	marginTop: "0.4rem",
	borderRadius: 0,
};

export default ItemsTable;
