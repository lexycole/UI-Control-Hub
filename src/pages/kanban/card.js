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
import { saveCard, getCard } from "./../../services/cards";
import auth from "../../services/authservice";
import { getUsers } from "../../services/users";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
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
				// listKanbanNo: this.state.listkanbanFromScrumboard ? this.state.listkanbanFromScrumboard : "",
				// kanbanNo: this.state.kanbanFromScrumboard ? this.state.kanbanFromScrumboard : "",
				cardNo: this.makeCardNo(),
				cardname: "",
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

	async populateCard() {
		try {
			const _ID = this.props.location?.state?.id;
			if(_ID === "new") return;

			const cardId = this.props.match.params.id;

			if (cardId === "new") return;

			const { data: card } = await getCard(cardId);
			console.log("card from backend when edited: ", card);

			card.userID = card.userID;
			this.props.location && this.props.location.state && this.props.location.state.listkanbanname?
			card.listKanbanNo = this.props.location.state.listkanbanname 
			: card.listKanbanNo = card.listKanbanNo;
			card.kanbanNo = card.kanbanNo;
			card.cardNo = card.cardNo;
			card.cardname = card.name;
			card.narrative = card.narrative;
			card.category = card.category;
			card.priority = card.priority;
			card.deadline = card.deadline;
			card.documentNo = card.documentNo;
			card.field = card.field;
			card.tag = card.tag;
			card.reference = card.reference;
			card.sharingLink = card.sharingLink;
			card.assignedTo = card.assignedTo;
			card.sharedTo = card.sharedTo;
			card.sharedTill = card.sharedTill;
			card.note = card.note;
			card.createdOn = card.createdOn;
			card.status = card.status;

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
		if(_ID === "new") return;

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

	doSubmit = async (card) => {
		await this.setListKanbanInData();
		
		try {
			console.log("card ", this.state.data);
			await saveCard(this.state.data);
			let newPath =
				this.state.kanbanFromScrumboard && this.state.listkanbanFromScrumboard
					? `/kanban/allkanbans/${this.state.kanbanFromScrumboard}`
					: "/kanban/cards/";
			this.props.history.push(newPath);
		} catch (ex) {
			//if(ex.response && ex.response.status === 404){
			if (ex.response) {
				const errors = { ...this.state.errors };
				errors.cardname = ex.response.data;
				this.setState({ errors });
				console.log("Errors: ", this.state.errors);
			}
		}
	};

	makeCardNo() {
		let cardNumber = "CD-";
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
			cardNo: card.cardNo,
			cardname: card.name,
			narrative: card.narrative,
			category: card.category,
			priority: card.priority,
			deadline: new Date(card.deadline),
			documentNo: card.documentNo,
			field: card.field,
			tags: card.tags,
			reference: card.reference,
			sharingLink: card.sharingLink,
			assignedTo: card.assignedTo,
			sharedTo: card.sharedTo,
			sharedTill: card.sharedTill,
			note: card.note,
			createdOn: new Date(card.createdOn),
			status: card.status,
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
							<Link to="/kanban/cards">Cards</Link>
						</li>
						<li className="breadcrumb-item active">Add Card</li>
					</ol>
					<h1 className="page-header">
						Add Card<small>Card-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Card</PanelHeader>
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
											"cardname",
											"Name of card",
											"text",
											"Enter Name/Title/subject for card"
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
										{this.renderInput("sharedTo", "Shared To", "text", "Enter Shared cards")}
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

export default withRouter(Card);