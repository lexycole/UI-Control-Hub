import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class AMateriamedicasTable extends Component {
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
			content: (amateriamedica) => (
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
						value={amateriamedica._id}
					/>
				</span>
			),
		},
		{
			key: "avatar",
			label: "avatar",
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
		{label: 'Letter 1',   path: 'amateriamedicas.letter_1' } ,
		{label: 'Letter 2',   path: 'amateriamedicas.letter_2' } ,   
		{label: 'Name',   path: 'amateriamedicas.name' } ,   	  		
		{label: 'Latin',   path: 'amateriamedicas.latin' } ,   	  	  				
		{label: 'pinyin',   path: 'amateriamedicas.pinyin' } ,   	  
		{label: 'chinese',   path: 'amateriamedicas.chineseSPL' } ,   	      		
		{label: 'english',   path: 'amateriamedicas.english' } ,   	  
		{label: 'korean',   path: 'amateriamedicas.korean' } ,   	  
		{label: 'japanese',   path: 'amateriamedicas.japanese' } ,   
		{label: 'vietnamese',   path: 'amateriamedicas.vietnamese' } ,   
		{label: 'Hindi-Sanskrit',   path: 'amateriamedicas.hindiSanskrit' } , 				
		{label: 'thai',   path: 'amateriamedicas.thai' } ,   	  	  		
		{label: 'arabic',   path: 'amateriamedicas.arabic' } ,   	          		
		{label: 'Homeopathy',   path: 'amateriamedicas.homeopathy' } ,   	  	  		
		{label: 'Ayurveda',   path: 'amateriamedicas.ayurveda' } ,  
		{label: 'Category',   path: 'amateriamedicas.category' } ,           
		{label: 'functionality',   path: 'amateriamedicas.functionality' } ,   	  	  		
		{label: 'meridian',   path: 'amateriamedicas.meridian' } ,   	          		
		{label: 'taste',   path: 'amateriamedicas.taste' } ,   	      		
		{label: 'dosage',   path: 'amateriamedicas.dosage' } ,   	  
		{label: 'temperature',   path: 'amateriamedicas.temperature' } ,   	  
		{label: 'indication',   path: 'amateriamedicas.indication' } , 		
		{label: 'alternateNames',   path: 'amateriamedicas.alternateNames' } ,   	  
		{label: 'caution',   path: 'amateriamedicas.caution' } ,   	  
		{label: 'videoLink',   path: 'amateriamedicas.videoLink' } ,   	  
		{label: 'sharingLink',   path: 'amateriamedicas.sharingLink' } , 
		{label: 'reference',   path: 'amateriamedicas.reference' } ,   
		{label: 'note',   path: 'amateriamedicas.note' } ,   
		{label: 'Status',   path: 'amateriamedicas.status' } ,   		
	];

	render() {
		//console.log(this.columns) ;
		const { amateriamedicas, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={amateriamedicas}
			/>
		);
	}
}

export default AMateriamedicasTable;