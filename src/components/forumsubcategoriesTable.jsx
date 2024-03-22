import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";
import moment from "moment"

class ForumSubcategoryTable extends Component {
	columns = [
		{
			key: "checkbox",
			label: <input type="check" style={checkboxStyles} />,
			content: (listForumSubcategory) => (
				<span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
					<input
						type="checkbox"
						style={checkboxStyles}
						onChange={this.props.handleCheckboxChange}
						value={listForumSubcategory._id}
					/>
				</span>
			),
		},
		{label: "Name", path: "name" },
		{label: "Image", path: "image" },    // for Image field
		{label: 'Description',   path: "description" } , 		
		{label: "CatID", path: "catId" },
		{label: 'LastPost',   path: "lastPost" } ,   	  		
		{label: 'LastTopic',   path: "lastTopic" } ,   	  				
		{label: "Status", path: "status" },		
	];

	render() {
		//console.log(this.columns) ;
		const { forumsubcategories, onSort, sortColumn } = this.props;
		return (
			<Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={forumsubcategories} />
		);
	}
}

const checkboxStyles = {
	width: "15px",
	height: "15px",
	marginTop: "0.4rem",
	borderRadius: 0,
};

export default ForumSubcategoryTable;