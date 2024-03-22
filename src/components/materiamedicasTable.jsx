import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class MateriamedicasTable extends Component {
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
			content: (materiamedica) => (
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
						value={materiamedica._id}
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
		{label: 'Letter 1',   path: 'letter1' } ,
		{label: 'Letter 2',   path: 'letter2' } ,   
		{label: 'Name',   path: 'name' } ,   	  		
		{label: 'Latin',   path: 'latin' } ,   	  	  				
		{label: 'Pinyin',   path: 'pinyin' } ,   	  
		{label: 'Chinese',   path: 'chineseSPL' } ,   	      		
		{label: 'English',   path: 'english' } ,   	  
		{label: 'Korean',   path: 'korean' } ,   	  
		{label: 'Japanese',   path: 'japanese' } ,   
		{label: 'Vietnamese',   path: 'vietnamese' } ,   
		{label: 'Hindi-Sanskrit',   path: 'hindiSanskrit' } , 				
		{label: 'Thai',   path: 'thai' } ,   	  	  		
		{label: 'Arabic',   path: 'arabic' } ,   	          		
		{label: 'Homeopathy',   path: 'homeopathy' } ,   	  	  		
		{label: 'Ayurveda',   path: 'ayurveda' } ,  
		{label: 'Category',   path: 'category' } ,           
		{label: 'Functionality',   path: 'functionality' } ,   	  	  		
		{label: 'Meridian',   path: 'meridian' } ,   	          		
		{label: 'Taste',   path: 'taste' } ,   	      		
		{label: 'Dosage',   path: 'dosage' } ,   	  
		{label: 'Temperature',   path: 'temperature' } ,   	  
		{label: 'Indication',   path: 'indication' } , 		
		{label: 'alternateNames',   path: 'alternateNames' } ,   	  
		{label: 'Caution',   path: 'caution' } ,   	  
		{label: 'VideoLink',   path: 'videoLink' } ,   	  
		{label: 'SharingLink',   path: 'sharingLink' } , 
		{label: 'reference',   path: 'reference' } ,   
		{label: 'note',   path: 'note' } ,   
		{label: 'Status',   path: 'status' } ,   		
	];

	render() {
		//console.log(this.columns) ;
		const { materiamedicas, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={materiamedicas}
			/>
		);
	}
}

export default MateriamedicasTable;