import React from "react";
import { Link, withRouter, useLocation } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "../../components/panel/panel.jsx";
import { Alert, UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import ReactTags from "react-tag-autocomplete";
import DatePicker from "react-datepicker";
import DateTime from "react-datetime";
import moment from "moment";
//import Select from 'react-select';
//import Select from "../../common/select";

import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "react-datetime/css/react-datetime.css";
import "react-datepicker/dist/react-datepicker.css";
import Joi from "joi";
import Form from "../../common/form.jsx";
import { apiUrl } from "../../config/config.json";
import http from "../../services/httpService";
import { saveListKanban, getListKanban } from "./../../services/listkanbans";
import auth from "../../services/authservice";
import { getUsers } from './../../services/users';
import Select from "react-select";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class ListKanban extends Form {
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
			users:[],
			kanbanFromScrumboard: this.props.location.state?.kan !== "" ? this.props.location.state?.kan : "",
			data: {
				userID: user._id,
				listKanbanNo: this.makelistKanbanNo(),
				// kanbanNo: this.state.kanbanFromScrumboard ? this.state.kanbanFromScrumboard : " ",
				kanbanNo: "",
				name: "",
				participants: [],
				note: "",
				color: "",
				status: "active",
			},
			selectedFile: null,
			errors: {},
		};

		this.statusOptions = [
			{ value: "active", label: "Active" },
			{ value: "pending", label: "Pending" },
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
		this.handleMultiChange = this.handleMultiChange.bind(this);
	}

	populateStatus() {
		this.statusoptions = this.statusOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}

	async populateUsers() {
		const { data: users } = await getUsers();
		this.setState({ users:users.map((user) => ({ _id: user._id,label: user.username, value: user._id })) });
	
		// this.Participants = this.state.users.map((option) => (
		// 	<option key={option._id} value={option._id}>
		// 		{option.username}
		// 	</option>
		// ));
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

	async populateListKanban() {
		try {
			const listkanbanId = this.props.match.params.id;
			if (listkanbanId === "new") return;

			const { data: listkanban } = await getListKanban(listkanbanId);
		 console.log("List kanban from backend when edited: ", listkanban);

			listkanban.userID = listkanban.userID;
			listkanban.listKanbanNo = listkanban.listKanbanNo;
			listkanban.kanbanNo = listkanban.kanbanNo._id;
			listkanban.name = listkanban.name;
			listkanban.owner = listkanban.owner;
			listkanban.participants = listkanban.participants;
			listkanban.note = listkanban.note;
			listkanban.color = listkanban.color;
			listkanban.status = listkanban.status;

			this.setState({ data: this.mapToViewModel(listkanban) });
		} catch (ex) {
			if (ex.response && ex.response.status === 404) this.props.history.replace("/error");
		}
	}

	async setKanbanInData() {
		if (this.state.kanbanFromScrumboard !== "") {
			this.setState({
				data: {
					...this.state.data,
					kanbanNo: this.state.kanbanFromScrumboard,
				},
			});
		}
	}

	async componentDidMount() {
		await this.populateListKanban();
		await this.populateStatus();
		await this.populateUsers();
		await this.populateKanbans();
		await this.setKanbanInData();
	}

	schema = Joi.object({
		userID: Joi.any().optional(),
		listKanbanNo: Joi.any().optional(),
		kanbanNo: Joi.any().optional(),
		name: Joi.any().optional(),
		owner: Joi.any().optional(),
		participants: Joi.any().optional(),
		note: Joi.any().optional(),
		color: Joi.any().optional(),
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

	doSubmit = async (listkanban) => {
		try {
			console.log("listkanban", this.state.data);
			await saveListKanban(this.state.data);
			let newPath =
				this.props.location.state.prevPage === "scrumboard"
					? `/kanban/allkanbans/${this.state.kanbanFromScrumboard}`
					: "/kanban/listkanbans/";
			this.props.history.push(newPath);
		} catch (ex) {
			//if(ex.response && ex.response.status === 404){
			if (ex.response) {
				const errors = { ...this.state.errors };
				errors.listkanbanname = ex.response.data;
				this.setState({ errors });
				//console.log(this.state.errors);
			}
		}
	};

	handleMultiChange = (name, options) => {
		const data = { ...this.state.data };
		console.log("value", options);
		data[name] = options?.map((o) => o.value);
		console.log(
			"options",
			options.map((o) => o.value)
		);
		this.setState({ data });
	};

	makelistKanbanNo() {
		let listKanbanNumber = "LK-";
		const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
		for (let i = 0; i <= 5; i++) listKanbanNumber += possible.charAt(Math.floor(Math.random() * possible.length));
		return listKanbanNumber;
	}

	mapToViewModel(listkanban) {
		return {
			_id: listkanban._id,
			userID: listkanban.userID,
			listKanbanNo: listkanban.listkanbanNo,
			kanbanNo: listkanban.kanbanNo,
			name: listkanban.name,
			owner: listkanban.owner,
			participants: listkanban.participants,
			note: listkanban.note,
			color: listkanban.color,
			status: listkanban.status,
		};
	}

	render() {
		const { data, errors } = this.state;
		console.log("data kan from listkanban: ", this.props.location);

		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li className="breadcrumb-item">
							<Link to="/kanban/listkanbans">ListKanbans</Link>
						</li>
						<li className="breadcrumb-item active">Add ListKanban</li>
					</ol>
					<h1 className="page-header">
						Add ListKanban-Solo <small>ListKanban-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add ListKanban</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit}>
										{this.renderInput("name", "Name of listkanban", "text", "Enter Name/Title/subject for listkanban" )}
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="kanbanNo">
												Kanban
											</label>
											<div className="col-lg-8">
												<select name="kanbanNo" id="kanbanNo" value={this.state.data.kanbanNo} onChange={this.handleChange} 
													className="form-control" disabled={this.state.kanbanFromScrumboard?true:false}>
													<option value="">Select Kanban</option>
													{this.selectKanbans}
												</select>
											</div>
											{errors.kanbans && <div className="alert alert-danger">{errors.kanbans}</div>}
										</div>
										{this.renderInput("color", "Color", "color", "Enter color")}
										{/* {this.renderInput("participants", "Participants", "participants", "Enter participants")} */}
										{/* {this.renderSelect("participants","Participants",this.state.users)} */}
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="participants" >Participants</label>
											<div className="col-lg-8">
										<Select isMulti options={this.state.users} placeholder={"Select Participants"} value={this.state.users.filter((opt) =>
											data.participants.includes(opt.value)
										)}
										onChange={(e) => this.handleMultiChange("participants", e)}
									/>
											</div>
											{errors.prefix && (<div className="alert alert-danger">{errors.participants}</div>)}
										</div>
										{this.renderTextarea("note", "Note", "Enter note")}

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="status">
												Status
											</label>
											<div className="col-lg-8">
												<select name="status" id="status" value={data.status?data.status:"active"} onChange={this.handleChange} className="form-control">
													<option value="">Select Status</option>
													{this.statusoptions}
												</select>
											</div>
											{errors.status && <div className="alert alert-danger">{errors.status}</div>}
										</div>

										<div className="form-group row">
											<div className="col-lg-8">
												<button type="submit" disabled={this.validate()} className="btn btn-primary width-65" >
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

export default withRouter(ListKanban);
