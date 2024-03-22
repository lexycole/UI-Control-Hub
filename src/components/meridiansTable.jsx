import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class KanbansTable extends Component {
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
			content: (kanban) => (
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
						value={kanban._id}
					/>
				</span>
			),
		},
		{
			key: "avatar",
			label: "Image",
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
		{label: 'Name',   path: 'meridians.name' } ,   	  		
		{label: 'Pinyin',   path: 'meridians.pinyin' } ,   	  
		{label: 'Chinese',   path: 'meridians.chineseSPL' } ,   	      		
		{label: 'English',   path: 'meridians.english' } ,   	  
		{label: 'Korean',   path: 'meridians.korean' } ,   	  
		{label: 'Japanese',   path: 'meridians.japanese' } ,   
		{label: 'Vietnamese',   path: 'meridians.vietnamese' } ,   
		{label: 'Hour',   path: 'meridians.hour' } ,   	  
		{label: 'Extremity',   path: 'meridians.extremity' } ,   	      
		{label: 'VideoLink',   path: 'meridians.videoLink' } ,   	  
		{label: 'SharingLink',   path: 'meridians.sharingLink' } ,   	  
		{label: 'Reference',   path: 'meridians.reference' } ,   	  
		{label: 'Note',   path: 'meridians.note' } ,   		
	];

	render() {
		//console.log(this.columns) ;
		const { kanbans, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={kanbans}
			/>
		);
	}
}

export default KanbansTable;