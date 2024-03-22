import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class FormulasTable extends Component {
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
			content: (formula) => (
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
						value={formula._id}
					/>
				</span>
			),
		},
		// {
		// 	key: "avatar",
		// 	label: "Image",
		// 	content: (user) => (
		// 		<span className="icon-img sm-r-5">
		// 			<img
		// 				style={{ width: "30px", height: "30px", borderRadius: "50%" }}
		// 				src={user.imageSrc}
		// 				alt=""
		// 			/>
		// 		</span>
		// 	),
		// },
		{label: 'Name',   path: 'name' } ,   	  		
		{label: 'Pinyin',   path: 'pinyin' } ,   	  
		{label: 'Chinese',   path: 'chineseSPL' } ,   	      		
		{label: 'English',   path: 'english' } ,   	  
		{label: 'Korean',   path: 'korean' } ,   	  
		{label: 'Japanese',   path: 'japanese' } ,   
		{label: 'Vietnamese',   path: 'vietnamese' } ,   
		{label: 'Category',   path: 'category' } ,           
		{label: 'Functionality',   path: 'functionality' } ,   	  	  		
		{label: 'Ingredients',   path: 'ingredients' } ,   	          		
		{label: 'Contraindication',   path: 'contraIndication' } , 		
		{label: 'Suggestion',   path: 'suggestion' } ,   	  
		{label: 'Indication',   path: 'indication' } , 
		{label: 'Modification',   path: 'modification' } , 		
		{label: 'Tongue',   path: 'tongue' } ,   	  	  		
		{label: 'Pulse',   path: 'pulse' } ,   	          		
		{label: 'Caution',   path: 'caution' } ,   	  
		{label: 'videoLink',   path: 'videoLink' } ,   	  
		{label: 'sharingLink',   path: 'sharingLink' } , 
		{label: 'reference',   path: 'reference' } ,   
		{label: 'note',   path: 'note' } ,   
		{label: 'Status',   path: 'status' } ,   		
	];

	render() {
		//console.log(this.columns) ;
		const { formulas, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={formulas}
			/>
		);
	}
}

export default FormulasTable;