import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "../../components/panel/panel.jsx";
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
import auth from "../../services/authservice";
import { saveGarageTreatment, getGarageTreatment } from "./../../services/garagetreatments";
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class GarageTreatment extends Form {
	constructor(props) {
		super(props);

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
			users: [],
			data: {
				userNo: "",
				name: "",
				description: "",
				category: "",
				tags: "",				
				code: "",
				businessName: "",
				duration: "",
				price: "",
				validTill: "",
				note: "",				
				createdOn: new Date(),
				status: "active",
			},
			selectedFile: null,
			errors: {},
		};

		this.categoryOptions = [
			{ value: "repair", label: "Repair" },
			{ value: "maintenance", label: "Maintenance" },
			{ value: "other", label: "Other" },
		];
		this.statusOptions = [
			{value: 'active', label: 'Active'},
			{value: 'inactive', label: 'Inactive'},
			{value: 'pending', label: 'Pending'}
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
	
	async populateGarageTreatment() {
		try {
			const garagetreatmentId = this.props.match.params.id;
			if (garagetreatmentId === "active") return;
			const { data: garagetreatment } = await getGarageTreatment(garagetreatmentId);

			// garagetreatment.name = garagetreatment.name;
			// garagetreatment.businessName = garagetreatment.businessName;
			// garagetreatment.description = garagetreatment.description;
			// garagetreatment.category = garagetreatment.category;
			// garagetreatment.priority = garagetreatment.priority;
			// garagetreatment.field = garagetreatment.field;
			// garagetreatment.tags = garagetreatment.tags;
			// garagetreatment.duration = garagetreatment.duration;
			// garagetreatment.price = garagetreatment.price;
			// garagetreatment.validTill = garagetreatment.validTill;
			// garagetreatment.garagetreatmentNo = garagetreatment.garagetreatmentNo;
			// garagetreatment.note = garagetreatment.note;
			// garagetreatment.garagetreatmentReference = garagetreatment.garagetreatmentReference;
			// garagetreatment.sharingLink = garagetreatment.sharingLink;
			// garagetreatment.sharedTo = garagetreatment.sharedTo;
			// garagetreatment.assignedTo = garagetreatment.assignedTo;
			// garagetreatment.createdOn = garagetreatment.createdOn;
			// garagetreatment.status = garagetreatment.status;

			this.setState({ data: this.mapToViewModel(garagetreatment) });

			console.log(this.state.data);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) this.props.history.replace("/error");
		}
	}

	schema = Joi.object({
		userNo: Joi.any().optional(),		
		name: Joi.string(),
		code: Joi.any().optional(),				
		description: Joi.any().optional(),
		category: Joi.any().optional(),		
		tags: Joi.any().optional(),		
		businessName: Joi.any().optional(),
		duration: Joi.any().optional(),
		price: Joi.any().optional(),
		createdOn: Joi.any().optional(),
		note: Joi.any().optional(),
		status: Joi.any().optional(),
	});


	onChangeImgHandler = (event) => {
		this.setState({ imageSrc: event.target.files[0] });
		console.log(event.target.files[0]);
	};

	doSubmit = async () => {
		console.log(this.state.data);
		const user = auth.getProfile();	
		const data = { ...this.state.data };
		data.username = user._id;
		this.setState({ data });
		try {
			await saveGarageTreatment(this.state.data);
			this.props.history.push("/salon/garagetreatments");
		} catch (ex) {
			if (ex.response) {
				const errors = { ...this.state.errors };
				errors.status = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	mapToViewModel(garagetreatment) {
		return {
			_id: garagetreatment._id,
			userNo: garagetreatment.userNo,
			name: garagetreatment.name,
			description: garagetreatment.description,
			category: garagetreatment.category,
			tags: garagetreatment.tags,			
			code: garagetreatment.code,
			businessName: garagetreatment.businessName,
			duration: garagetreatment.duration,
			price: garagetreatment.price,
			validTill: new Date(garagetreatment.validTill),
			createdOn: new Date(garagetreatment.createdOn),
			note: garagetreatment.note,
			status: garagetreatment.status,
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
							<Link to="/salon/garagetreatments">GarageTreatments</Link>
						</li>
						<li className="breadcrumb-item active">Add GarageTreatment</li>
					</ol>
					<h1 className="page-header">
						Add GarageTreatment-Solo <small>GarageTreatment-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add GarageTreatment</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit}>
										{this.renderInput( "name", "Name of garagetreatment", "text",
											"Enter Name/Title/subject for garagetreatment"
										)}

										{this.renderInput("description", "description", "text", "Enter description")}


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="category">Category
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
													{this.categoryOptions}
												</select>
											</div>
											{errors.category && <div className="alert alert-danger">{errors.category}</div>}
										</div>
										{this.renderInput("code", "Code", "text", "Enter code of treatment")}
										{this.renderInput("duration", "Duration", "text", "Enter Duration in minutes")}
										{this.renderInput("price", "price", "number", "Enter price")}
										{this.renderInput("validTill", "Locations", "text", "Enter Valid Till")}
										{this.renderInput("tags", "Tags", "text", "Enter Tags")}
										{this.renderInput("note", "Note", "text", "Enter Note")}

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="status">Status
											</label>
											<div className="col-lg-8">
												<select name="status" id="status" value={data.status}
													onChange={this.handleChange} className="form-control"
												>
													<option value="">Select Status</option>
													{this.statusOptions}
												</select>
											</div>
											{errors.status && <div className="alert alert-danger">{errors.status}</div>}
										</div>

										<div className="form-group row">
											<div className="col-lg-8">
												<button type="submit" disabled={this.validate()}
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

export default withRouter(GarageTreatment);