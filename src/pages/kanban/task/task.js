import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "../../components/panel/panel.jsx";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import ReactTags from "react-tag-autocomplete";
import DatePicker from "react-datepicker";
import DateTime from "react-datetime";
import moment from "moment";
//import Select from 'react-select';
//import Select from "../../common/select";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "react-datetime/css/react-datetime.css";
import "react-datepicker/dist/react-datepicker.css";
import Joi from "joi";
import Form from "../../common/form.jsx";
import { apiUrl } from "../../config/config.json";
import http from "../../services/httpService";
import { saveTask, getTask } from "./../../services/tasks";
import auth from "../../services/authservice";
import { getUsers } from "../../services/users";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class Task extends Form {
	constructor(props) {
		super(props);
		const user = auth.getProfile();
		var maxYesterday = "";
		var minYesterday = DateTime.moment().subtract(1, "day");

		this.minDateRange = (current) => {
			return current.isAfter(minYesterday);
		};
		this.maxDateRange = (current) => {
			return current.isAfter(maxYesterday);
		};
		this.minDateChange = (value) => {
			this.setState({
				maxDateDisabled: false,
			});
			maxYesterday = value;
		};

		this.state = {
			maxDateDisabled: true,
			profiles: [],
			kanbans: [],
			listkanbans: [],
			users: [],
			kanbanFromScrumboard: this.props.location ? this.props.location.state?.kan : "",
			listkanbanFromScrumboard: this.props.location ? this.props.location.state?.listkan : "",
			data: {
				userID: user._id,
				listKanbanNo: this.props.location ? this.props.location.state?.listkanbanname : "",
				kanbanNo: "",
				// listKanbanNo: this.state.listkanbanFromScrumboard ? this.state.listkanbanFromScrumboard : "",
				// kanbanNo: this.state.kanbanFromScrumboard ? this.state.kanbanFromScrumboard : "",
				taskNo: this.makeTaskNo(),
				taskname: "",
				narrative: "",
				category: "",
				priority: "",
				deadline: new Date(),
				documentNo: "",
				field: "",
				tags: "",
				reference: "",
				sharingLink: "",
				assignedTo: [],
				sharedTo: "",
				sharedTill: "",
				note: "",
				createdOn: new Date(),
				status: "",
			},
			selectedFile: null,
			errors: {},
		};

		this.priorityOptions = [
			{ value: "normal", label: "normal" },
			{ value: "low", label: "low" },
			{ value: "high", label: "high" },
			{ value: "urgent", label: "urgent" },
		];

		this.categoryOptions = [
			{ value: "bug-error", label: "bug-error" },
			{ value: "disconnection", label: "disconnection" },
			{ value: "feature-request", label: "feature-request" },
			{ value: "frontend", label: "frontend" },
			{ value: "backend", label: "backend" },
			{ value: "AI", label: "AI" },
			{ value: "NLP", label: "NLP" },
			{ value: "image-recognization", label: "image-recognization" },
			{ value: "hosting", label: "hosting" },
			{ value: "tablet", label: "tablet" },
			{ value: "phone", label: "phone" },
			{ value: "web", label: "web" },
		];

		this.statusOptions = [
			{ value: "in progress", label: "In Progress" },
			{ value: "pending", label: "Pending" },
			{ value: "new", label: "New" },
			{ value: "archive", label: "Archive" },
		];

		this.handleSlider = (props) => {
			const { value, dragging, index, ...restProps } = props;
			return (
				<Tooltip prefixCls="rc-slider-tooltip" overlay={value} visible={dragging} placement="top" key={index}>
					<Handle value={value} {...restProps} />
				</Tooltip>
			);
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onChangeImgHandler = this.onChangeImgHandler.bind(this);
	}

	async populatePriority() {
		this.priorityoptions = this.priorityOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}

	async populateCategory() {
		this.categoryoptions = this.categoryOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}

	async populateStatus() {
		this.statusoptions = this.statusOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}

	async populateKanbans() {
		const { data: kanbans } = await http.get(apiUrl + "/kanbans");
		this.setState({ kanbans });
		this.selectKanbans = this.state.kanbans.map((option) => (
			<option key={option._id} value={option._id}>
				{option.name}
			</option>
		));
	}

	async populateListkanbans() {
		const { data: listkanbans } = await http.get(apiUrl + "/listkanbans");
		this.setState({ listkanbans });
		this.selectListkanbans = this.state.listkanbans.map((option) => (
			<option key={option._id} value={option._id}>
				{option.name}
			</option>
		));
	}

	async populateAssignedTo() {
		const { data: users } = await http.get(apiUrl + "/users");
		this.setState({ users });
		this.selectUsers = this.state.users.map((option) => (
			<option key={option._id} value={option._id}>
				{option.contactName.first + " " + option.contactName.last}
			</option>
		));
	}

	async setKanbanInData() {
		this.setState({
			data: {
				...this.state.data,
				kanbanNo: this.state.kanbanFromScrumboard,
			},
		});
	}

	async setListKanbanInData() {
		this.setState({
			data: {
				...this.state.data,
				listKanbanNo: this.state.listkanbanFromScrumboard,
			},
		});
	}

	async populateTask() {
		try {
			const _ID = this.props.location?.state?.id;
			if(_ID === "new") return;

			const taskId = this.props.match.params.id;

			if (taskId === "new") return;

			const { data: task } = await getTask(taskId);
			console.log("task from backend when edited: ", task);

			task.userID = task.userID;
			this.props.location && this.props.location.state && this.props.location.state.listkanbanname?
			task.listKanbanNo = this.props.location.state.listkanbanname 
			: task.listKanbanNo = task.listKanbanNo;
			task.kanbanNo = task.kanbanNo;
			task.taskNo = task.taskNo;
			task.taskname = task.name;
			task.narrative = task.narrative;
			task.category = task.category;
			task.priority = task.priority;
			task.deadline = task.deadline;
			task.documentNo = task.documentNo;
			task.field = task.field;
			task.tag = task.tag;
			task.reference = task.reference;
			task.sharingLink = task.sharingLink;
			task.assignedTo = task.assignedTo;
			task.sharedTo = task.sharedTo;
			task.sharedTill = task.sharedTill;
			task.note = task.note;
			task.createdOn = task.createdOn;
			task.status = task.status;

			this.setState({ data: this.mapToViewModel(task) });

			console.log(this.state.data);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) this.props.history.replace("/error");
		}
	}

	async componentDidMount() {
		await this.populateStatus();
		await this.populatePriority();
		await this.populateTask();
		await this.populateCategory();
		await this.populateKanbans();
		await this.populateListkanbans();
		await this.populateAssignedTo();
		await this.setKanbanInData();
		
		const _ID = this.props.location?.state?.id;
		if(_ID === "new") return;

		await this.setListKanbanInData();
	}

	schema = Joi.object({
		userID: Joi.any().optional(),
		listKanbanNo: Joi.any().optional(),
		kanbanNo: Joi.any().optional(),
		taskNo: Joi.any().optional(),
		taskname: Joi.any().optional(),
		narrative: Joi.any().optional(),
		category: Joi.any().optional(),
		priority: Joi.any().optional(),
		deadline: Joi.any().optional(),
		documentNo: Joi.any().optional(),
		field: Joi.any().optional(),
		tags: Joi.any().optional(),
		reference: Joi.any().optional(),
		sharingLink: Joi.any().optional(),
		assignedTo: Joi.any().optional(),
		sharedTo: Joi.any().optional(),
		sharedTill: Joi.any().optional(),
		note: Joi.any().optional(),
		createdOn: Joi.any().optional(),
		status: Joi.any().optional(),
	});

	handlecreatedOnChange = (e) => {
		const errors = { ...this.state.errors };
		const data = { ...this.state.data };
		data["createdOn"] = e;
		this.setState({ data });
		console.log(this.state.data);
	};

	handledeadlineChange = (e) => {
		const errors = { ...this.state.errors };
		const data = { ...this.state.data };
		data["deadline"] = e;
		this.setState({ data });
		console.log(this.state.data);
	};

	onChangeImgHandler = (event) => {
		this.setState({ imageSrc: event.target.files[0] });
		console.log(event.target.files[0]);
	};

	doSubmit = async (task) => {
		await this.setListKanbanInData();
		
		try {
			console.log("task ", this.state.data);
			await saveTask(this.state.data);
			let newPath =
				this.state.kanbanFromScrumboard && this.state.listkanbanFromScrumboard
					? `/kanban/allkanbans/${this.state.kanbanFromScrumboard}`
					: "/kanban/tasks/";
			this.props.history.push(newPath);
		} catch (ex) {
			//if(ex.response && ex.response.status === 404){
			if (ex.response) {
				const errors = { ...this.state.errors };
				errors.taskname = ex.response.data;
				this.setState({ errors });
				console.log("Errors: ", this.state.errors);
			}
		}
	};

	makeTaskNo() {
		let taskNumber = "CD-";
		const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
		for (let i = 0; i <= 5; i++) taskNumber += possible.charAt(Math.floor(Math.random() * possible.length));
		return taskNumber;
	}

	mapToViewModel(task) {
		return {
			_id: task._id,
			userID: task.userID,
			listKanbanNo: task.listKanbanNo,
			kanbanNo: task.kanbanNo,
			taskNo: task.taskNo,
			taskname: task.name,
			narrative: task.narrative,
			category: task.category,
			priority: task.priority,
			deadline: new Date(task.deadline),
			documentNo: task.documentNo,
			field: task.field,
			tags: task.tags,
			reference: task.reference,
			sharingLink: task.sharingLink,
			assignedTo: task.assignedTo,
			sharedTo: task.sharedTo,
			sharedTill: task.sharedTill,
			note: task.note,
			createdOn: new Date(task.createdOn),
			status: task.status,
		};
	}

	render() {
		const { data, errors } = this.state;
		// console.log("state of action: ", this.props.location);
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li className="breadcrumb-item">
							<Link to="/kanban/tasks">Tasks</Link>
						</li>
						<li className="breadcrumb-item active">Add Task</li>
					</ol>
					<h1 className="page-header">
						Add Task<small>Task-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Task</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit}>
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="priority">
												Kanban No
											</label>
											<div className="col-lg-8">
												<select
													name="kanbanNo"
													id="kanbanNo"
													value={data.kanbanNo}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select Kanban</option>
													{this.selectKanbans}
												</select>
											</div>
											{errors.kanbanNo && <div className="alert alert-danger">{errors.kanbanNo}</div>}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="priority">
												Listkanban No
											</label>
											{
												this.props.location && this.props.location.state && this.props.location.state.listkan? 
												
													<div className="col-lg-8">
														<select
															name="listKanbanNo"
															id="listKanbanNo"
															value={this.state.data.listKanbanNo}
															onChange={this.handleChange}
															className="form-control"
														>
															<option value="">{this.state.data.listKanbanNo}</option>
															{this.state.data.listKanbanNo}
														</select>
													</div>
												:
												<div className="col-lg-8">
													<select
														name="listKanbanNo"
														id="listKanbanNo"
														value={data.listKanbanNo}
														onChange={this.handleChange}
														className="form-control"
													>
														<option value="">Select Listkanban</option>
														{this.selectListkanbans}
													</select>
												</div>
											}
											{errors.listKanbanNo && (
												<div className="alert alert-danger">{errors.listKanbanNo}</div>
											)}
										</div>
										{this.renderInput(
											"taskname",
											"Name of task",
											"text",
											"Enter Name/Title/subject for task"
										)}
										{this.renderTextarea("narrative", "Narrative", "* Tell your story/issue....")}

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="priority">
												Category
											</label>
											<div className="col-lg-8">
												<select
													name="category"
													id="category"
													value={data.category}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select Category</option>
													{this.categoryoptions}
												</select>
											</div>
											{errors.category && <div className="alert alert-danger">{errors.category}</div>}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="priority">
												Priority
											</label>
											<div className="col-lg-8">
												<select
													name="priority"
													id="priority"
													value={data.priority}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select Priority</option>
													{this.priorityoptions}
												</select>
											</div>
											{errors.priority && <div className="alert alert-danger">{errors.priority}</div>}
										</div>

										{/* <div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="deadline">
												Deadline
											</label>
											<div className="col-lg-8">
												<DatePicker
													onChange={this.handledeadlineChange}
													id={data.deadline}
													value={data.deadline}
													selected={data.deadline}
													inputProps={{ placeholder: "Datepicker" }}
													className="form-control"
												/>
												{errors.deadline && <div className="alert alert-danger">{errors.deadline}</div>}
											</div>
										</div> */}

										{this.renderInput("documentNo", "DocumentNo", "text", "Enter DocumentNo")}
										{this.renderInput("field", "field", "text", "Enter field")}
										{this.renderInput("tags", "Tags", "text", "Enter Tags")}
										{this.renderInput("reference", "References", "text", "Enter References")}
										{this.renderInput("sharingLink", "Sharing link", "text", "Enter Sharing links")}
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="priority">
												Assigned To
											</label>
											<div className="col-lg-8">
												<select
													name="assignedTo"
													id="assignedTo"
													value={data.assignedTo}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select assignedTo</option>
													{this.selectUsers}
												</select>
											</div>
											{errors.assignedTo && <div className="alert alert-danger">{errors.assignedTo}</div>}
										</div>
										{this.renderInput("sharedTo", "Shared To", "text", "Enter Shared tasks")}
										{this.renderInput("sharedTill", "Shared Till", "text", "Enter Shared till")}
										{this.renderTextarea("note", "Note", "Enter note")}

										{/* <div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="deadline">
												Created On
											</label>
											<div className="col-lg-8">
												<DatePicker
													onChange={this.handlecreatedOnChange}
													id={data.createdOn}
													value={data.createdOn}
													selected={data.createdOn}
													inputProps={{ placeholder: "Datepicker" }}
													className="form-control"
												/>
												{errors.createdOn && <div className="alert alert-danger">{errors.createdOn}</div>}
											</div>
										</div> */}

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="status">
												Status
											</label>
											<div className="col-lg-8">
												<select
													name="status"
													id="status"
													value={data.status}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select Status</option>
													{this.statusoptions}
												</select>
											</div>
											{errors.status && <div className="alert alert-danger">{errors.status}</div>}
										</div>

										<div className="form-group row">
											<div className="col-lg-8">
												<button
													type="submit"
													disabled={this.validate()}
													className="btn btn-primary width-65"
												>
													Submit
												</button>
											</div>
										</div>
									</form>
								</PanelBody>
							</Panel>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(Task);