import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";
import moment from "moment"

class AccountantsTable extends Component {
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
			content: (doctor) => (
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
						value={doctor._id}
					/>
				</span>
			),
		},
		{
		  label: "Username",
		  path: "accountants.username",
		  content: (user) => (
			<span className="icon-img sm-r-5">
			  <img
				style={{ width: "20px", height: "20px", borderRadius: "50%" }}
				src={user.accountants.imageSrc}
				alt=""
			  />{" "}
			  {user.accountants.username}
			</span>
		  ),
		},
		{key:'avatar', label: 'avatar',content: user=>(<span className="icon-img"><img src={user.imageSrc} alt="" /></span>) } ,
		{label: 'firstname',   path: 'accountants.contactName.first' } ,   
		{label: 'initials',   path: 'accountants.contactName.initials' } ,   	  
		{label: 'lastname',   path: 'accountants.contactName.last' } ,   	  
		{label: 'DOB',   path: 'accountants.dateBirth', content:(user) =>(moment(user.accountants.dateBirth).format("L"))} ,
		{label: 'gender',   path: 'accountants.gender' } ,   	  
		{label: 'address1',   path: 'accountants.Address.address1' } ,   
		{label: 'address2',   path: 'accountants.Address.address2' } ,   
		{label: 'address3',   path: 'accountants.Address.address3' } ,           
		{label: 'zip',   path: 'accountants.Address.zip' } ,   	  
		{label: 'city',   path: 'accountants.Address.city' } ,   	      
		{label: 'state',   path: 'accountants.Address.state' } ,   	          
		{label: 'country',   path: 'accountants.Address.country' } ,   	  	  
		{label: 'website',   path: 'accountants.website' } , 
		{label: 'Linkedin',   path: 'accountants.linkedin' } ,       
		{label: 'mobile',   path: 'accountants.phones.mobile' } ,   	  
		{label: 'phone',   path: 'accountants.phones.phone' } ,   	  
		{label: 'skype',   path: 'accountants.phones.skype' } , 
		{label: 'IBAN',   path: 'accountants.bankInfo.IBAN' } ,   
		{label: 'Bank',   path: 'accountants.bankInfo.bank' } ,   
		{label: 'Branch Bank',   path: 'accountants.bankInfo.branchOfBank' } ,   
		{label: 'Clinic',   path: 'clinicNo' } ,   
		{label: 'primInsuranceNo',   path: 'accountants.insurance.primInsuranceNo' } ,   	  
		{label: 'primInsurance',   path: 'accountants.insurance.primInsurance' } ,   	  
		{label: 'primInsuranceValidTill',   path: 'accountants.insurance.primInsuranceValidTill' } , 
		{label: 'secInsuranceNo',   path: 'accountants.insurance.secInsuranceNo' } ,   	  
		{label: 'secInsurance',   path: 'accountants.insurance.secInsurance' } ,   	  
		{label: 'secInsuranceValidTill',   path: 'accountants.insurance.secInsuranceValidTill' } , 
		{label: 'accountingRegisterNo',   path: 'accountants.professionalInfo.accountingRegisterNo' } ,   	  		
		{label: 'idPaper',   path: 'accountants.identification.idPaper' } ,   	  
		{label: 'idPaperValidTill',   path: 'accountants.identification.idPaperValidTill' } , 
		{ label: "Status", path: "status" },			
	];

	render() {
		//console.log(this.columns) ;
		const { accountants, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={accountants}
			/>
		);
	}
}

export default AccountantsTable;
