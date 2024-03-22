import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class TCMtreatmentsTable extends Component {
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
			content: (tcmtreatment) => (
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
						value={tcmtreatment._id}
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
		{label: 'Username',   path: 'tcmtreatments.username' } ,
		{label: 'firstname',   path: 'tcmtreatments.contactName.first' } ,   
		{label: 'initials',   path: 'tcmtreatments.contactName.initials' } ,   	  
		{label: 'lastname',   path: 'tcmtreatments.contactName.last' } ,   	  
		{label: 'DOB',   path: 'tcmtreatments.dateBirth' } ,   	  
		{label: 'gender',   path: 'tcmtreatments.gender' } ,   	  
		{label: 'address1',   path: 'tcmtreatments.Address.address1' } ,   
		{label: 'address2',   path: 'tcmtreatments.Address.address2' } ,   
		{label: 'address3',   path: 'tcmtreatments.Address.address3' } ,           
		{label: 'zip',   path: 'tcmtreatments.Address.zip' } ,   	  
		{label: 'city',   path: 'tcmtreatments.Address.city' } ,   	      
		{label: 'state',   path: 'tcmtreatments.Address.state' } ,   	          
		{label: 'country',   path: 'tcmtreatments.Address.country' } ,   	  	  
		{label: 'website',   path: 'tcmtreatments.website' } , 
		//{label: 'Linkedin',   path: 'tcmtreatments.linkedin' } ,       
		{label: 'mobile',   path: 'tcmtreatments.phones.mobile' } ,   	  
		{label: 'phone',   path: 'tcmtreatments.phones.phone' } ,   	  
		{label: 'skype',   path: 'tcmtreatments.phones.skype' } , 
		{label: 'IBAN',   path: 'tcmtreatments.bankInfo.IBAN' } ,   
		{label: 'Bank',   path: 'tcmtreatments.bankInfo.bank' } ,   
		{label: 'Branch Bank',   path: 'tcmtreatments.bankInfo.branchOfBank' } ,   
		{label: 'Clinic',   path: 'clinicNo' } ,   
		{label: 'primInsuranceNo',   path: 'insurance.primInsuranceNo' } ,   	  
		{label: 'primInsurance',   path: 'insurance.primInsurance' } ,   	  
		{label: 'primInsuranceValidTill',   path: 'insurance.primInsuranceValidTill' } , 
		{label: 'secInsuranceNo',   path: 'insurance.secInsuranceNo' } ,   	  
		{label: 'secInsurance',   path: 'insurance.secInsurance' } ,   	  
		{label: 'secInsuranceValidTill',   path: 'insurance.secInsuranceValidTill' } , 
		{label: 'idPaper',   path: 'identification.idPaper' } ,   	  
		{label: 'idPaperValidTill',   path: 'identification.idPaperValidTill' } , 
		{label: 'height',   path: 'height' } ,   	  
		{label: 'weight',   path: 'weight' } , 
		{label: 'BMI',   path: 'BMI' } ,   
	];

	render() {
		//console.log(this.columns) ;
		const { tcmtreatments, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={tcmtreatments}
			/>
		);
	}
}

export default TCMtreatmentsTable;
