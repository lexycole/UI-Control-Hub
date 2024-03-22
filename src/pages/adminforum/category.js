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
import { savecategorie, getcategorie } from "./../../services/categories";
import { getProfile } from '../../services/authservice.js';

import { getUsers } from "../../services/users.js";
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class Category extends Form {
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
				user: "",
				name: "",
				description: "",
				status: ""
			},
		
			selectedFile: null,
			errors: {},
		};

		this.statusOptions = [
			{ value: "inactive", label: "Inactive" },
			{ value: "active", label: "active" },
		];
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onChangeImgHandler = this.onChangeImgHandler.bind(this);
	}

	async populateStatus() {
		this.statusoptions = this.statusOptions.map((option) => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}

	
	async populatePatients() {
		const { data: patients } = await getUsers();
		console.log(patients)
		this.setState({ patients });
		this.selectPatients = this.state.patients.map((option) => (
			<option key={option._id} value={option._id} >
{option.contactName.first + " " + option.contactName.last }
			</option>
		));
		console.log(this.selectPatients)
	}

	async populateCategory() {
		try {
			const leaveId = this.props.match.params.id;
			console.log(leaveId);
			if (leaveId === "new") return;

			const { data: Category } = await getcategorie(leaveId);
			console.log("edit ", Category);

			this.setState({ data: this.mapToViewModel(Category) });

			console.log(this.state.data);
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				this.props.history.replace("/error");
		}
	}

	async componentDidMount() {
		const user = await getProfile();
		const data = { ...this.state.data };

		data.user = user._id;
		console.log(data.user)
		this.setState({ data });
		await this.populateStatus();
	
		await this.populateCategory();
	}

	schema = Joi.object({
		user: Joi.string(),
		name: Joi.string(),
		
		description: Joi.any().optional(),		
		status: Joi.any().required(),
		Category: Joi.any().optional(),
	});

	onChangeImgHandler = (event) => {
	
		this.setState({ icon:  event.target.files[0]});
		
		console.log(this.state)
		
	
	};

	doSubmit = async () => {
	
		//data.user = user._id;
		
		try {
			console.log(this.state.data)
			
			await savecategorie(this.state.data,this.state.icon);
			this.props.history.push("/Category/Categories");
		} catch (ex) {
			if (ex.response) {
				const errors = { ...this.state.errors };
				errors.status = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	mapToViewModel(Category) {
		return {
			_id: Category._id,
			user: Category.user,
			name: Category.name,
		
			description: Category.description,
			status: Category.status,
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
							<Link to="/Category/Categorys">Categorys</Link>
						</li>
						<li className="breadcrumb-item active">Add Category</li>
					</ol>
					<h1 className="page-header">
						Add Category<small>Category-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Category</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit}>
										{this.renderInput("name","name", "text","Enter Name/Title for Category")}										
										{this.renderInput("description", "description", "text", "Enter the description...")}								
									
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
										</div>
										
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="icon">Attachments</label>
											<div className="col-lg-8">
												<div className="row row-space-10">
													<input type="file" id="icon" name="icon"
													
														className="form-control-file m-b-5"
														onChange={this.onChangeImgHandler}
													/>
												
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

export default withRouter(Category);