import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";
import moment from "moment"

class InvoicesTable extends Component {
	columns = [
		{
			key: "checkbox",
			label: <input type="checkbox" style={checkboxStyles} onChange={this.props.handleAllCheckboxChange} />,
			content: (invoice) => (
				<span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
					<input
						type="checkbox"
						style={checkboxStyles}
						checked={invoice.isChecked}
						onChange={this.props.handleCheckboxChange}
						value={invoice._id}
					/> 
				</span>
			),
		},
		{key: "avatar",
			label: "Username",
			content: (invoice) => (
				<span className="icon-img sm-r-5">
					<img
						style={{ width: "20px", height: "20px", borderRadius: "50%",float:"left",marginRight:'5px' }}
						src={invoice.userimageSrc}
						alt=""
					/>
					<p>{invoice.user}</p>
				</span>
			),
		},
		// { label: "user", path: "user.username" },
		{ label: "InvoiceNo", path: "invoiceNo" },
		// { label: "products", path: "products" },
		// { label: "services", path: "services" },
		{ label: "Currency", path: "currency" },
		{ label: "Amount", path: "amount" },
		{ label: "PaidDate", path: "paidDate" },
		{ label: "DueDate", path: "dueDate" },
		{ label: "PaidMethod", path: "paidMethod" },
		{ label: "TreatmentDate", path: "treatmentDate" },
		{ label: "Reference", path: "reference" },
		// { label: "share", path: "share" },
		{ label: "Note", path: "note" },
		{ label: "CreatedOn", path: "createdOn" },
		{ label: "Status", path: "status" },
	];

	render() {
		//console.log(this.columns) ;
		const { invoices, onSort, sortColumn } = this.props;
		return <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={invoices} />;
	}
}

const checkboxStyles = {
	width: "15px",
	height: "15px",
	marginTop: "0.4rem",
	borderRadius: 0,
};

export default InvoicesTable;
