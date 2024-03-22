import React, { Component, useState, useEffect } from "react";
import { Link, BrowserRouter as Router, useHistory } from "react-router-dom";
import Priority from "../../components/kanban/Priority";
import Status from "../../components/kanban/Status";
import Category from "../../components/kanban/Category";
import auth from "../../services/authservice";
import { getUser } from "../../services/users";
import http from "../../services/httpService";
import { apiUrl } from "../../config/config.json";
import { deleteCard } from "../../services/cards";

import { Card, CardText, CardBody, CardTitle, CardSubtitle, CardFooter } from "reactstrap";
import { constant } from "lodash";
//import { dragOver, dragStart, dropOver, dropStart } from "./DragAndDrop";
//import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const TicketTask = ({ 
	statusOptions, 
	priorityOptions, 
	categoryOptions, 
	content,
	setFilterColumns,
	filterColumn,
	tasks,
	setTasks,
	...props
	}) => {
	// const userId = auth.getProfile();
	const [user, setUser] = useState(null);
	const [assignedTo, setAssignedTo] = useState(null);

	useEffect(() => {
		getCurrentUser();
		getAssignedTo();
		// console.log(content);
	}, []);

	const getCurrentUser = async () => {
		const {data} = await http.get(apiUrl + "/users/" + content.userId);
		data && setUser(data);
	};

	const getAssignedTo = async () => {
		const {data} = await http.get(apiUrl + "/users/" + content.assignedTo);
		data && setAssignedTo(data);
	};

	const handleTaskDelete = async () => {
		console.log(`trying to delete ${content._id}`);
		const {data} = await deleteTask(content._id);
		if(data){ //if task is deleted only then
			console.log(data);
			let newArr = tasks.filter(task => task._id !== content._id);
			setTasks(tasks);
			newArr = filterColumn.filter(item => item._id !== content._id);
			setFilterColumns(newArr);
		}
	}
	
	const history = useHistory();

	function viewDetails(){
		history.push(`/tasks/taskprofile/${content._id}`,{data: content._id});
	  }

	return (
		<div className="mb-2 mt-2 ticketCardWidth">
			<Card
				className="border-0 m-t-0 card"
				id="card2"

				//onDragStart={dragStart}
				//onDragEnd={dragOver}
			>
				<CardBody>
					<CardTitle tag="h4" className="title m-t-0">
						{content.name}
					</CardTitle>
					<CardSubtitle className="m-b-10 text-muted">
						Owner
						<div
							className="widget-img widget-img-xs rounded-circle bg-inverse mr-n2"
							style={{
								// backgroundImage: user && `url(${user.data?.imageSrc})`,
								// backgroundImage: "url(../assets/img/user/user-1.jpg)",
							}}
						>
							<img src={user?.imageSrc} />
						</div>
					</CardSubtitle>
					<CardSubtitle className="m-b-10 text-muted">
						Created on: <span className="font-weight-bold">{content.createdOn}</span>
					</CardSubtitle>
					<CardSubtitle className="m-b-10 text-muted">
						Deadline on: <span className="font-weight-bold">{content.deadline}</span>
					</CardSubtitle>
					<CardSubtitle className="m-b-10 text-muted">
						Assigned To:
						<div className="d-flex">
							<div
								className="widget-img widget-img-xs rounded-circle bg-inverse mr-n2"
								// style={{
								// 	backgroundImage: assignedTo && `url(${assignedTo.data?.imageSrc})`,
								// }}
							>
								<img src={assignedTo?.imageSrc}/>
							</div>
							{/* <div
								className="widget-img widget-img-xs rounded-circle bg-inverse mr-n2"
								style={{
									backgroundImage: "url(../assets/img/user/user-2.jpg)",
								}}
							></div>
							<div
								className="widget-img widget-img-xs rounded-circle bg-inverse mr-n2"
								style={{
									backgroundImage: "url(../assets/img/user/user-3.jpg)",
								}}
							></div>
							<div className="widget-icon widget-icon-xs rounded-circle bg-muted text-white f-s-10">+2</div> */}
						</div>
					</CardSubtitle>
					<CardSubtitle className="m-b-10 text-muted">Tickets-todo task adding</CardSubtitle>
					<CardText className="task-subtitle">
						Some quick example text to build on the task title and make up the bulk of the task's content.
					</CardText>
				</CardBody>
				<CardSubtitle className="f-s-13 my-2 m-b-10 text-muted d-flex justify-content-start align-items-center">
					Priority: <Priority className="ml-2" options={priorityOptions} selectedValue={content.priority} />
				</CardSubtitle>
				<CardSubtitle className="f-s-13 m-b-10 text-muted d-flex justify-content-start align-items-center my-2 ">
					Status: <Status className="ml-2" options={statusOptions} selectedValue={content.status} />
				</CardSubtitle>
				<CardSubtitle className="f-s-13 m-b-10 text-muted d-flex justify-content-start align-items-center my-2 ">
					Category: <Category className="ml-2" options={categoryOptions} selectedValue={content.category} />
				</CardSubtitle>

				<CardFooter className="text-muted f-w-600">
					<Router>
						{/* <Link
							// to={`/tasks/taskprofile/${content._id}`}
							to={{
								pathname: `/tasks/taskprofile/${content._id}`,
								state: {
									data: content._id,
								},
							}}
							className="kanban-link"
							title="View details/profile"
						> */}
							<button type="button" onClick={viewDetails} title="View details/profile" className="btn btn-green btn-xs m-r-5 m-b-5">
								<i className="far fa-eye"></i>
							</button>
						{/* </Link> */}
						{/* <Link to={`/kanban/allkanbans/${content.kanbanNo}`} className="kanban-link" title="delete"> */}
							<button
								onClick={() => handleTaskDelete(content._id)}
								type="button"
								title="delete"
								className="btn btn-red btn-xs m-r-5 m-b-5"
							>
								<i className="far fa-trash-alt"></i>
							</button>
						{/* </Link> */}
						<Link to="/bootstrap-4" className="kanban-link" title="make comments">
							<button type="button" className="btn btn-lime btn-xs m-r-5 m-b-5">
								<i className="far fa-comments"></i>
							</button>
						</Link>
						<Link to="/bootstrap-4" className="kanban-link" title="share it">
							<button type="button" className="btn btn-purple btn-xs m-r-5 m-b-5">
								<i className="ion-md-share"></i>
							</button>
						</Link>
						<Link to="/bootstrap-4" className="kanban-link" title="save as PDF">
							<button type="button" className="btn btn-orange btn-xs m-r-5 m-b-5">
								<i className="far fa-file-pdf"></i>
							</button>
						</Link>
						<Link to="/bootstrap-4" className="kanban-link" title="print">
							<button type="button" className="btn btn-indigo btn-xs m-r-5 m-b-5">
								<i className="fas fa-print"></i>
							</button>
						</Link>
						<Link to="/bootstrap-4" className="kanban-link" title="archive it">
							<button type="button" className="btn btn-gray btn-xs m-r-5 m-b-5">
								<i className="fas fa-archive"></i>
							</button>
						</Link>
					</Router>
				</CardFooter>
			</Card>
		</div>
	);
};

export default TicketTask;
