import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "../../components/panel/panel.jsx";
import DateTime from "react-datetime";

import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "react-datetime/css/react-datetime.css";
import "react-datepicker/dist/react-datepicker.css";
import Joi from "joi";
import Form from "../../common/form.jsx";

import auth from "../../services/authservice";
import { saveIncident, getIncident } from "./../../services/incidents";
import { getPatients } from "./../../services/patients";
const Handle = Slider.Handle;

class Incident extends Form {
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
				user: auth.getProfile()._id,
				name: "",
				narrative: "",
				category: "",
				//businessName: "",
				rootCause: "",
				department: "",
				location: "",
				date : new Date () , 
				incidentNo: this.makeIncidentNo() ,
				victim: [],
				witness: auth.getProfile()._id,
				reporter : auth.getProfile()._id ,
				LTI: "",				
				note: "",
				reference: "",				
				createdOn: new Date().toString(),				
				status: "",
			},
			selectedFile: null,
			errors: {},
		};

		this.categoryOptions = [
			{ value: "burned", label: "Burned" },
			{ value: "fire", label: "Fire" },
			{ value: "heart-attack", label: "Heart-attack" },
			{ value: "stroke", label: "Stroke" },
			{ value: "insect-bite", label: "Insect-bite" },			
			{ value: "cut", label: "Cut-wounded" },
			{ value: "scrape", label: "Scrape" },
			{ value: "splinter", label: "Splinter" },			
			{ value: "other", label: "Other" },
		];

		this.statusOptions = [
			{ value: "active", label: "Active" },
			{ value: "pending", label: "Pending" },
			{ value: "in-research", label: "In research" },			
			{ value: "reported to Authority", label: "reported to Authority" },						
			{ value: "new", label: "New" },
			{ value: "archived", label: "Archive" },
		];

		this.handleSlider = (props) => {
			const { value, dragging, index, ...restProps } = props;
			return (
				<Tooltip prefixCls="rc-slider-tooltip" overlay={value} visible={dragging} placement="top" key={index}>
					<Handle value={value} {...restProps} />
				</Tooltip>
			);
		};

		this.handleDateChange = (date) => {
			this.setState({
				data: {...this.state.data , date : date }
			})
		}

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

	async populateIncident() {
		try {
			const IncidentId = this.props.match.params.id;
			if (IncidentId === "new") return;
			const { data: Incident } = await getIncident(IncidentId);

			this.setState({ data: this.mapToViewModel(Incident) });

			console.log(this.state.data);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) this.props.history.replace("/error");
		}
	}

	async populatePatients() {
		const { data: victim } = await getPatients()
		this.selectVictim = victim.map(option => (
			<option key={option.user} value={option.user}>
				{option.patients.contactName.first+" "+option.patients.contactName.last}
			</option>
		));
		}

	async populateWitness() {
		const { data: victim } = await getPatients()
		this.selectWitness = victim.map(option => (
			<option key={option.user} value={option.user}>
				{option.patients.contactName.first+" "+option.patients.contactName.last}
			</option>
		));
		}


	async componentDidMount() {
		await this.populateCategory()
		await this.populateStatus()
		await this.populateIncident()
		await this.populatePatients()
		await this.populateWitness()
	}

	schema = Joi.object({
		reporter : Joi.any().optional(),		
		name: Joi.string(),
		narrative: Joi.any().optional(),
		priority: Joi.any().optional(),
		category: Joi.any().optional(),
		department: Joi.any().optional(),
		subDepartment: Joi.any().optional(),
		rootCause: Joi.any().optional(),		
		createdOn: Joi.any().optional(),
		date : Joi.any().optional(),
		location: Joi.any().optional(),
		incidentNo: Joi.any().optional(),
		victim: Joi.any().optional(),
		witness: Joi.any().optional(),
		note: Joi.any().optional(),
		LTI: Joi.any().optional(),		
		status: Joi.any().required(),
		reference : Joi.any().optional()		
	});

	handlecreatedOnChange = (e) => {
		const data = { ...this.state.data };
		data["createdOn"] = e;
		this.setState({ data });
		console.log(this.state.data);
	};

	handlesharedTillChange = (e) => {
		const data = { ...this.state.data };
		data["sharedTill"] = e;
		this.setState({ data });
		console.log(this.state.data);
	};


	onChangeImgHandler = (event) => {
		this.setState({ imageSrc: event.target.files[0] });
		console.log(event.target.files[0]);
	};

	doSubmit = async () => {
		console.log("submitting incident data ...")
		console.log(this.state.data);
		const user = auth.getProfile();	
		const data = { ...this.state.data };
		data.user = user._id;
		//delete this.state.data._id
		this.setState({ data });
		try {
			await saveIncident(this.state.data,this.state.imageSrc);
			this.props.history.push("/ero/incidents");
		} catch (ex) {
			if (ex.response) {
				const errors = { ...this.state.errors };
				errors.status = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	makeIncidentNo() {
		let IncidentNumber = "ICD-";
		const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
		for (let i = 0; i <= 6; i++) IncidentNumber += possible.charAt(Math.floor(Math.random() * possible.length));
		return IncidentNumber;
	}

	mapToViewModel(Incident) {
		return {
			_id: Incident._id,
			user: Incident.user,
			name: Incident.name,
			narrative: Incident.narrative,
			category: Incident.category,
			priority: Incident.priority,
			department: Incident.department,
			subDepartment: Incident.subDepartment,
			rootCause: Incident.rootCause,			
			location: Incident.location,
			incidentNo: Incident.incidentNo,
			date : Incident.date ,
			createdOn: Incident.createdOn,
			victim: Incident.victim,
			witness: Incident.witness,
			LTI: Incident.LTI,
			note: Incident.note,
			reference: Incident.reference,
			status: Incident.status,
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
							<Link to="/Incident/Incidents">Incidents</Link>
						</li>
						<li className="breadcrumb-item active">Add Incident</li>
					</ol>
					<h1 className="page-header">
						Add Incident<small>Incident-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Incident</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit}>
										{this.renderInput(
											"name",
											"Name of Incident",
											"text",
											"Enter Name/Title/subject for Incident"
										)}


										{this.renderTextarea("narrative", "Narrative", "text", "Enter your story...")}										


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

										{this.renderInput("department", "Department", "text", "Enter Department")}
										{this.renderInput("subDepartment", "Sub-Department", "text", "Enter Sub-department")}
										{this.renderInput("rootCause", "Root-Cause", "text", "Enter Root-Cause")}										
										{this.renderInput("LTI", "LTI", "number", "Enter LTI (days)")}																				
										{this.renderInput("location", "location", "text", "Enter location")}
										<div className="form-group row">
										<label className="col-lg-4 col-form-label">Victim</label>
										<div className="col-lg-8">
											<select
											name="victim"
											id="victim"
											value={data.victim}
											onChange={this.handleChange}
											className="form-control"
											>
											<option value="">Select victim</option>
											{this.selectVictim}
											</select>
										</div>
										{errors.victim && (
											<div className="alert alert-danger">
											{errors.victim}
											</div> )}
										</div>

										<div className="form-group row">
										<label className="col-lg-4 col-form-label">Witness</label>
										<div className="col-lg-8">
											<select
											name="witness"
											id="witness"
											value={data.witness}
											onChange={this.handleChange}
											className="form-control"
											>
											<option value="">Select witness</option>
											{this.selectWitness}
											</select>
										</div>
										{errors.witness && (
											<div className="alert alert-danger">
											{errors.witness}
											</div> )}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="date">
												Date and Time
											</label>
											<div className="col-lg-8">
												<DateTime value = {data.date}  onChange={ (date) => this.handleDateChange(date._d) }/>
												{errors.date && <div className="alert alert-danger">{errors.date}</div>}
											</div>
										</div>

										{this.renderTextarea("note", "note", "text", "Enter note")}
										{this.renderInput("reference", "References", "text", "Enter References")}


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
											<label className="col-lg-4 col-form-label" htmlFor="imageSrc">Attachments</label>
											<div className="col-lg-8">
												<div className="row row-space-10">
													<input type="file" id="imageSrc" name="imageSrc"

														className="form-control-file m-b-5"
														onChange={this.onChangeImgHandler}
													/>
													{errors.imageSrc && (
														<div className="alert alert-danger">
															{errors.imageSrc}
														</div>
													)}
												</div>
											</div>
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

export default withRouter(Incident);