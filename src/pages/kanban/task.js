import React from "react";
import { Link, useParams } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "../../components/panel/panel.jsx";
import DatePicker from "react-datepicker";
import DateTime from "react-datetime";
import Select from "react-select";

import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "react-datetime/css/react-datetime.css";
import "react-datepicker/dist/react-datepicker.css";
import Joi from "joi";
import Form from "../../common/form.jsx";
import http from "../../services/httpService";
import { saveTask, getTask } from "./../../services/tasks";
import auth from "../../services/authservice";

const apiUrl = process.env.REACT_APP_API_URL;

const Handle = Slider.Handle;

class Card extends Form {
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
				taskNo: this.makeTaskNo(),
				taskname: "",
				narrative: "",
				category: "",
				priority: "",
				deadline: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
				startDate: new Date(),
				documentNo: "",
				field: "",
				tags: "",
				budget: "",
				cost: "",
				reference: "",
				sharingLink: "",
				participants: [],
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

	async populateListkanbans(id) {
		const { data: listkanbans } = await http.get(apiUrl + "/listkanbans");
		this.setState({ listkanbans });
		this.selectListkanbans = this.state.listkanbans.map((option) => (
			(option.kanbanNo._id == id &&
				<option key={option._id} value={option._id}>
					{option.name}
				</option>
			)
		));
	}

	async populateAssignedTo() {
		const { data: users } = await http.get(apiUrl + "/users");
		this.setState({ users });
		this.selectParticipants = this.state.users.map((user) => ({
			_id: user._id,
			label: user.username,
			value: user._id,
		}));
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

	async populateCard() {
		try {
			const _ID = this.props.location?.state?.id;
			if (_ID === "new") return;

			const cardId = this.props.match.params.id;

			if (cardId === "new") return;

			const { data: card } = await getTask(cardId);
			console.log("card from backend when edited: ", card);

			if (!card) {
				card.userID = card.userID;
				this.props.location && this.props.location.state && this.props.location.state.listkanbanname ?
					card.listKanbanNo = this.props.location.state.listkanbanname
					: card.listKanbanNo = card.listKanbanNo._id;
				card.kanbanNo = card.kanbanNo._id;
				card.taskNo = card.taskNo;
				card.taskname = card.name;
				card.narrative = card.narrative;
				card.category = card.category;
				card.priority = card.priority;
				card.deadline = card.deadline;
				card.startDate = card.startDate;
				card.documentNo = card.documentNo;
				card.field = card.field;
				card.tag = card.tag;
				card.budget = card.budget;
				card.cost = card.cost;
				card.reference = card.reference;
				card.sharingLink = card.sharingLink;
				card.participants = card.participants;
				card.sharedTo = card.sharedTo;
				card.sharedTill = card.sharedTill;
				card.note = card.note;
				card.createdOn = card.createdOn;
				card.status = card.status;
			}

			this.setState({ data: this.mapToViewModel(card) });

			console.log(this.state.data);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) this.props.history.replace("/error");
		}
	}

	async componentDidMount() {
		await this.populateStatus();
		await this.populatePriority();
		await this.populateCard();
		await this.populateCategory();
		await this.populateKanbans();
		await this.populateListkanbans();
		await this.populateAssignedTo();
		await this.setKanbanInData();

		const _ID = this.props.location?.state?.id;
		if (_ID === "new") return;

		await this.setListKanbanInData();
	}

	schema = Joi.object({
		userID: Joi.any().optional(),
		listKanbanNo: Joi.any().optional(),
		kanbanNo: Joi.any().optional(),
		cardNo: Joi.any().optional(),
		cardname: Joi.any().optional(),
		narrative: Joi.any().optional(),
		category: Joi.any().optional(),
		priority: Joi.any().optional(),
		startDate: Joi.any().optional(),
		deadline: Joi.any().optional(),
		documentNo: Joi.any().optional(),
		field: Joi.any().optional(),
		tags: Joi.any().optional(),
		budget: Joi.any().optional(),
		cost: Joi.any().optional(),
		reference: Joi.any().optional(),
		sharingLink: Joi.any().optional(),
		participants: Joi.any().optional(),
		sharedTo: Joi.any().optional(),
		sharedTill: Joi.any().optional(),
		note: Joi.any().optional(),
		createdOn: Joi.any().optional(),
		status: Joi.any().optional(),
	});

	handlecreatedOnChange = (e) => {
		const data = { ...this.state.data };
		data["createdOn"] = e;
		this.setState({ data });
		console.log(this.state.data);
	};

	handlestartDateChange = (e) => {
		const data = { ...this.state.data };
		data["startDate"] = e;
		let newDate = new Date(e)
		newDate.setDate(e.getDate() + 21)
		data["deadline"] = newDate;
		this.setState({ data });
		console.log(this.state.data);
	};

	handledeadlineChange = (e) => {
		const data = { ...this.state.data };
		data["deadline"] = e;
		this.setState({ data });
		console.log(this.state.data);
	};

	onChangeImgHandler = (event) => {
		this.setState({ imageSrc: event.target.files[0] });
		console.log(event.target.files[0]);
	};

	handleMultiChange = (name, options) => {
		const data = { ...this.state.data };
		console.log("value", options);
		data[name] = options.map((o) => o.value);
		console.log(
			"options",
			options.map((o) => o.value)
		);
		this.setState({ data });
	};

	doSubmit = async (card) => {
		await this.setListKanbanInData();

		try {
			console.log("card ", this.state.data);
			await saveTask(this.state.data);
			let newPath =
				this.state.kanbanFromScrumboard && this.state.listkanbanFromScrumboard
					? `/kanban/allkanbans/${this.state.kanbanFromScrumboard}`
					: "/kanban/tasks/";
			this.props.history.push(newPath);
		} catch (ex) {
			if (ex.response) {
				const errors = { ...this.state.errors };
				errors.cardname = ex.response.data;
				this.setState({ errors });
				console.log("Errors: ", this.state.errors);
			}
		}
	};

	makeTaskNo() {
		let cardNumber = "TA-";
		const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
		for (let i = 0; i <= 5; i++) cardNumber += possible.charAt(Math.floor(Math.random() * possible.length));
		return cardNumber;
	}

	mapToViewModel(card) {
		return {
			_id: card._id,
			userID: card.userID,
			listKanbanNo: card.listKanbanNo,
			kanbanNo: card.kanbanNo,
			taskNo: card.taskNo,
			taskname: card.name,
			narrative: card.narrative,
			category: card.category,
			priority: card.priority,
			startDate: new Date(card.startDate),
			deadline: new Date(card.deadline),
			documentNo: card.documentNo,
			field: card.field,
			tags: card.tags,
			budget: card.budget,
			cost: card.costs,
			reference: card.reference,
			sharingLink: card.sharingLink,
			participants: card.participants,
			sharedTo: card.sharedTo,
			sharedTill: card.sharedTill,
			note: card.note,
			createdOn: new Date(card.createdOn),
			status: card.status,
		};
	}

	render() {
		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li className="breadcrumb-item">
							<Link to="/kanban/tasks">Admin tasks</Link>
						</li>
						<li className="breadcrumb-item active">Add Task</li>
					</ol>
					<h1 className="page-header">
						Add Card<small>Card-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Task</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit}>
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="kanbanNo">
												Kanban No
											</label>
											<div className="col-lg-4">
												<select
													name="kanbanNo"
													id="kanbanNo"
													value={data.kanbanNo}
													onChange={(e) => {
														this.handleChange(e)
														this.populateListkanbans(e.target.value)
													}}
													className="form-control"
												>
													<option value="">Select Kanban</option>
													{this.selectKanbans}
												</select>
											</div>
											{errors.kanbanNo && <div className="alert alert-danger">{errors.kanbanNo}</div>}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="listKanbanNo">
												Listkanban No
											</label>
											{
												this.props.location && this.props.location.state && this.props.location.state.listkan ?

													<div className="col-lg-4">
														<select
															name="listKanbanNo"
															id="listKanbanNo"
															value={this.state.data.listKanbanNo}
															onChange={this.handleChange}
															className="form-control"
														>
															{this.state.listkanbans.filter(o => o.kanbanNo._id == data.kanbanNo).map((option) => (
																(option.name == this.state.data.listKanbanNo && <option key={option._id} value={option._id}>{option.name}</option>)
															))}

															{this.state.listkanbans.filter(o => o.kanbanNo._id == data.kanbanNo).map((option) => (
																(option.name != this.state.data.listKanbanNo && <option key={option._id} value={option._id}>{option.name}</option>)
															))}
														</select>
													</div>
													:
													<div className="col-lg-4">
														<select
															name="listKanbanNo"
															id="listKanbanNo"
															value={data.listKanbanNo}
															onChange={this.handleChange}
															className="form-control"
														>
															<option value="">Select Listkanban</option>
															{this.state.listkanbans.map((option) => (
																(option.kanbanNo._id == data.kanbanNo &&
																	<option key={option._id} value={option._id}>
																		{option.name}
																	</option>
																)
															))}
														</select>
													</div>
											}
											{errors.listKanbanNo && (
												<div className="alert alert-danger">{errors.listKanbanNo}</div>
											)}

										</div>

										<div className="form-group row">
										</div>
										{this.renderInput("taskname", "Name of task", "text", "Enter Name/Title/subject for task")}
										{this.renderTextarea("narrative", "Narrative", "* Tell your story/issue....")}

										<div className="form-group row">
											<label className="col-lg-2 col-form-label" htmlFor="category">
												Category
											</label>
											<div className="col-lg-4">
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
											{errors.category && <div className="alert alert-danger">{errors.priority}</div>}
											<label className="col-lg-2 col-form-label" htmlFor="priority">
												Priority
											</label>
											<div className="col-lg-4">
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

										<div className="form-group row">
											<label className="col-lg-2 col-form-label" htmlFor="startDate">
												StartDate
											</label>
											<div className="col-lg-4">
												<DatePicker
													onChange={this.handlestartDateChange}
													id={data.startDate}
													value={data.startDate}
													selected={data.startDate}
													inputProps={{ placeholder: "Datepicker" }}
													className="form-control"
												/>
												{errors.startDate && <div className="alert alert-danger">{errors.startDate}</div>}
											</div>
											<label className="col-lg-2 col-form-label" htmlFor="deadline">
												Deadline
											</label>
											<div className="col-lg-4">
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
										</div>

										<div className="form-group row">
											<label className="col-lg-2 col-form-label" htmlFor="budget">
											</label>
											{this.renderInput("budget", "Budget", "number", "Enter budget")}
											<label className="col-lg-2 col-form-label" htmlFor="cost">
											</label>
											{this.renderInput("cost", "Cost", "number", "Enter Cost")}
										</div>
										{this.renderInput("documentNo", "DocumentNo", "text", "Enter DocumentNo")}
										{this.renderInput("field", "Field", "text", "Enter field")}
										{this.renderInput("tags", "Tags", "text", "Enter Tags")}
										{this.renderInput("budget", "Budget", "number", "Enter budget")}
										{this.renderInput("cost", "cost", "number", "Enter Cost")}
										{this.renderInput("reference", "References", "text", "Enter References")}
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="participants" >
												Participants
											</label>
											<div className="col-lg-8">
												<Select
													isDisabled={false}
													isMulti
													name="participants"
													//styles={customStyles}
													options={this.selectParticipants}
													placeholder={"Select Participants..."}
													value={this.selectParticipants?.filter((opt) =>
														data.participants.includes(opt.value)
													)}
													onChange={(e) =>
														this.handleMultiChange("participants", e)
													}
												/>
											</div>
										</div>
										{this.renderTextarea("note", "Note", "Enter note")}

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
													disabled={this.validate}
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

export default Card;