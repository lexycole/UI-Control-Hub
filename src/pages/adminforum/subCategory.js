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
import { saveSubCategorie, getSubCategorie, getSubCategories } from "./../../services/subcategories";
import { getProfile } from '../../services/authservice.js';
import { getUsers } from './../../services/users';


import { getcategorie, getcategories, savecategorie } from "../../services/categories";
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class SubCategory extends Form {
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
				catId: "",
				status: "",
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
		const { data: patients } = await getcategories();

		console.log(patients)
		this.setState({ patients });
		console.log(this.state)
		this.selectPatients = this.state.patients.map((option) => (
			<option key={option._id} value={option._id} >
{option.name}
			</option>
		));
	}

	async populateCategory() {
		try {
			const leaveId = this.props.match.params.id;
			console.log(leaveId);
			if (leaveId === "new") return;

			const { data: subCategory } = await getSubCategorie(leaveId);
			console.log("edit ", subCategory);

			this.setState({ data: this.mapToViewModel(subCategory) });

			console.log(this.state.data);
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				this.props.history.replace("/error");
		}
	}

	async componentDidMount() {
	
		await this.populatePatients();

		await this.populateStatus();
		console.log("hhhhhh")
	
		await this.populateCategory();
		const user = await getProfile();
		const data = { ...this.state.data };

		data.user = user._id;
		console.log(data.user)
		this.setState({ data });
	}

	schema = Joi.object({
		user: Joi.string(),
		name: Joi.string(),
		catId: Joi.any().optional(),		
		status: Joi.any().required(),
		subCategory: Joi.any().optional(),


	});

	onChangeImgHandler = (event) => {
		this.setState({ imageSrc: event.target.files[0] });
		console.log(event.target.files[0]);
	};

	doSubmit = async () => {
	
		//data.user = user._id;
		
		try {
			console.log(this.state.data)
			await saveSubCategorie(this.state.data);
			console.log("please")
			this.props.history.push("/subCategory/subcategories");
		} catch (ex) {
			if (ex.response) {
				const errors = { ...this.state.errors };
				errors.status = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	mapToViewModel(subcat) {
		return {
			_id: subcat._id,
			user: subcat.user,
			name: subcat.name,
			catId: subcat.catId,
			status: subcat.status,
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
							<Link to="/subCategory/subcategories">Sub Categories</Link>
						</li>
						<li className="breadcrumb-item active">Add sub Category</li>
					</ol>
					<h1 className="page-header">
						Add Sub Category<small>Sub Category-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Sub Category</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit}>
									<div className="form-group row">
											<label className="col-lg-4 col-form-label" >
												category
											</label>
											<div className="col-lg-8">
												<select
													name="catId"
													id="catId"
													value={data.catId}
													onChange={this.handleChange}
													className="form-control"
												>
													<option value="">Select Category</option>
													{this.selectPatients}
												</select>
											</div>
										</div>
										{this.renderInput("name","name", "text","Enter Name/Title for sub Category")}										
									
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

export default withRouter(SubCategory);