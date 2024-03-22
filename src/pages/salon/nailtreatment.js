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
import { saveNailTreatment, getNailTreatment } from "./../../services/nailtreatments";
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class NailTreatment extends Form {
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
			{ value: "manicure", label: "Manicure" },
			{ value: "waxing", label: "waxing" },
			{ value: "massage", label: "Massage" },
			{ value: "washing", label: "Washing" },
			{ value: "other", label: "Other" },
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
	
	async populateNailTreatment() {
		try {
			const nailtreatmentId = this.props.match.params.id;
			if (nailtreatmentId === "active") return;
			const { data: nailtreatment } = await getNailTreatment(nailtreatmentId);

			// nailtreatment.name = nailtreatment.name;
			// nailtreatment.businessName = nailtreatment.businessName;
			// nailtreatment.description = nailtreatment.description;
			// nailtreatment.category = nailtreatment.category;
			// nailtreatment.priority = nailtreatment.priority;
			// nailtreatment.field = nailtreatment.field;
			// nailtreatment.tags = nailtreatment.tags;
			// nailtreatment.duration = nailtreatment.duration;
			// nailtreatment.price = nailtreatment.price;
			// nailtreatment.validTill = nailtreatment.validTill;
			// nailtreatment.nailtreatmentNo = nailtreatment.nailtreatmentNo;
			// nailtreatment.note = nailtreatment.note;
			// nailtreatment.nailtreatmentReference = nailtreatment.nailtreatmentReference;
			// nailtreatment.sharingLink = nailtreatment.sharingLink;
			// nailtreatment.sharedTo = nailtreatment.sharedTo;
			// nailtreatment.assignedTo = nailtreatment.assignedTo;
			// nailtreatment.createdOn = nailtreatment.createdOn;
			// nailtreatment.status = nailtreatment.status;

			this.setState({ data: this.mapToViewModel(nailtreatment) });

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
			await saveNailTreatment(this.state.data);
			this.props.history.push("/salon/nailtreatments");
		} catch (ex) {
			if (ex.response) {
				const errors = { ...this.state.errors };
				errors.status = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	mapToViewModel(nailtreatment) {
		return {
			_id: nailtreatment._id,
			userNo: nailtreatment.userNo,
			name: nailtreatment.name,
			description: nailtreatment.description,
			category: nailtreatment.category,
			tags: nailtreatment.tags,			
			code: nailtreatment.code,
			businessName: nailtreatment.businessName,
			duration: nailtreatment.duration,
			price: nailtreatment.price,
			validTill: new Date(nailtreatment.validTill),
			createdOn: new Date(nailtreatment.createdOn),
			note: nailtreatment.note,
			status: nailtreatment.status,
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
							<Link to="/serives/nailtreatments">NailTreatments</Link>
						</li>
						<li className="breadcrumb-item active">Add NailTreatment</li>
					</ol>
					<h1 className="page-header">
						Add NailTreatment<small>NailTreatment-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add NailTreatment</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit}>
										{this.renderInput(
											"name",
											"Name of nailtreatment",
											"text",
											"Enter Name/Title/subject for nailtreatment"
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
													{this.categoryoptions}
												</select>
											</div>
											{errors.category && <div className="alert alert-danger">{errors.category}</div>}
										</div>
										{this.renderInput("code", "Code", "text", "Enter code of treatment")}
										{this.renderInput("duration", "Duration", "number", "Enter Duration in minutes")}
										{this.renderInput("price", "price", "number", "Enter price")}
										{this.renderInput("validTill", "Valid Till", "text", "Enter Valid Till")}
										{this.renderInput("tags", "Tags", "text", "Enter Tags")}
										{this.renderInput("note", "Note", "text", "Enter Note")}
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

export default withRouter(NailTreatment);