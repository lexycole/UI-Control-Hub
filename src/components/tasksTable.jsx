import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";
import moment from "moment"

class TasksTable extends Component {
	columns = [
		{
			key: "checkbox",
			label: <input type="check" style={checkboxStyles} />,
			content: (task) => (
				<span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
					<input
						type="checkbox"
						style={checkboxStyles}
						onChange={this.props.handleCheckboxChange}
						value={task._id}
					/>
				</span>
			),
		},
		{ label: "KanbanName", path: "kanbanNo.name" },
		{ label: "ListName", path: "listKanbanNo.name" },
		{ label: "TaskNo", path: "taskNo" },
		{ label: "Name", path: "name" },
		{ label: "Narrative", path: "narrative" },
		{ label: "participants", 
			key: "participants",
			content : (task) => (		
				<span>
					{task.participants.map(el => 
					// <div>
					// 	<img src={el.imageSrc} width={16} alt="" />
					// 	<span> {el.contactName.first}  </span>
					// 	<br />
					// </div>
				
					  <div className="d-flex flex-row align-items-center">
						{ el.imageSrc && (
						  <img
							className="mx-1 rounded-circle"
							style={{ width: "20px", height: "20px" }}
							src={el.imageSrc}
							alt={el.contactName.first + " " + el.contactName.last}
						  />
						)}
						<p className="mx-2 my-0">{el.contactName.first + " " + el.contactName.last}</p>
					  </div>
					)}
				</span>
			)
		},
		{ label: "Category", path: "category" },
		{ label: "Priority", path: "priority" },
		{ label: "StartDate", path: "startDate", content:(task) =>(moment(task.startdDate).format("L"))} , 
		{ label: "Deadline", path: "deadline" , content:(task) =>(moment(task.deadline).format("L"))} ,
		{ label: "Cost", path: "cost" },		
		{ label: "Currency", path: "currency" },				
		{ label: "Document No", path: "documentNo" },
		{ label: "Field", path: "field" },
		{ label: "Tags", path: "tags" },
		{ label: "Budget", path: "budget" },
		{ label: "Cost", path: "cost" },
		{ label: "Reference", path: "reference" },
		{ label: "Note", path: "note" },
		{ label: "Status", path: "status" },
	];

	render() {
		//console.log(this.columns) ;
		const { tasks, onSort, sortColumn } = this.props;
		return <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={tasks} />;
	}
}

const checkboxStyles = {
	width: "15px",
	height: "15px",
	marginTop: "0.4rem",
	borderRadius: 0,
};

export default TasksTable;
