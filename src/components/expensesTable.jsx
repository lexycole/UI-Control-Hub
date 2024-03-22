import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";
import moment from "moment"

class ExpensesTable extends Component {
	columns = [
		{
			key: "checkbox",
			label: <input type="checkbox" style={checkboxStyles} onChange={this.props.handleAllCheckboxChange} />,
			content: (expense) => (
				<span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
					<input
						type="checkbox"
						style={checkboxStyles}
						checked={expense.isChecked}
						onChange={this.props.handleCheckboxChange}
						value={expense._id}
					/> 
				</span>
			),
		},
		{
			key: "avatar",
			label: "avatar",
			content: (expense) => (
				<span className="icon-img sm-r-5">
					<img
						style={{ width: "20px", height: "20px", borderRadius: "50%" }}
						src={expense.userimageSrc}
						alt=""
					/>
				</span>
			),
		},
		{ label: "PaidTo", path: "paidTo" },
		{ label: "ExpenseNo", path: "expenseNo" },
		{ label: "COANo", path: "COANo" },		
		{ label: "Name", path: "product" },
		{ label: "Currency", path: "currency" },		
		{ label: "Amount", path: "amount" },		
		{ label: "CreatedOn", path: "createdOn" },
		{ label: "DueDate", path: "dueDate" },
		{ label: "PaidDate", path: "paidDate" },		
		{ label: "Reference", path: "reference" },
		{ label: "Sharinglink", path: "sharingLink" },
		{ label: "SharedTo", path: "sharedTo" },
		{ label: "Note", path: "note" },
		{ label: "Status", path: "status" }		
	];

	render() {
		//console.log(this.columns) ;
		const { expenses, onSort, sortColumn } = this.props;
		return <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={expenses} />;
	}
}

const checkboxStyles = {
	width: "15px",
	height: "15px",
	marginTop: "0.4rem",
	borderRadius: 0,
};

export default ExpensesTable;