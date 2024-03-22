import React from 'react';
import { Link,withRouter} from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import ReactTags from 'react-tag-autocomplete';
import DatePicker from 'react-datepicker';
import DateTime from 'react-datetime';
import moment from "moment";
//import Select from 'react-select';
//import Select from "../../common/select";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'react-datetime/css/react-datetime.css';
import 'react-datepicker/dist/react-datepicker.css';
import Joi from 'joi';
import Form from '../../common/form.jsx';
import {apiUrl} from '../../config/config.json';
import http from '../../services/httpService';
import {saveVehicle,getVehicle} from './../../services/vehicles';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class Vehicle extends Form {
	constructor(props) {
		super(props);

		var maxYesterday = '';
		var minYesterday = DateTime.moment().subtract(1, 'day');

		this.minDateRange = (current) => {
			return current.isAfter(minYesterday);
		};
		this.maxDateRange = (current) => {
			return current.isAfter(maxYesterday);
		};
		this.minDateChange = (value) => {
			this.setState({
				maxDateDisabled: false
			});
			maxYesterday = value;
		};
	
		this.state = {
			maxDateDisabled: true,
			profiles: [],
			data: {
			    username     : '',
				vehicleNo    : '',	  
				brand       : '',	  
				numberPlate : '',
				model       : '',		  
				poweredBy   : '',		  				
				mileage     : '',
				note     	 : '',	  				
				createdOn    : new Date(),				
				status   	 : '',	  				
			},
            selectedFile: null,
			errors: {}
		}

		this.brandOptions = [
			{ value: 'mercedes', label: 'Mercedes' },
			{ value: 'BMW', label: 'BMW' },
			{ value: 'opel', label: 'Opel' },
			{ value: 'ford', label: 'Ford' },
			{ value: 'tesla', label: 'Tesla' },
			{ value: 'honda', label: 'Honda' },
			{ value: 'volkswagen', label: 'Volkswagen' },
			{ value: 'renault', label: 'Renault' },
			{ value: 'pegaut', label: 'Pegaut' },
			{ value: 'hyundai', label: 'Hyundai' },			
			{ value: 'toyota', label: 'Toyota' }
		];

		this.statusOptions = [
			{ value: 'in progress', label: 'In Progress' },
			{ value: 'pending', label: 'Pending' },
			{ value: 'new', label: 'New' },
			{ value: 'archive', label: 'Archive' }
		];

		this.poweredByOptions = [
			{ value: 'solar', label: 'Solar' },
			{ value: 'gasoline', label: 'Gasoline' },
			{ value: 'electricity', label: 'Electricity' },
			{ value: 'diesel', label: 'Diesel' },
			{ value: 'lgp', label: 'lgp' }			
		];
		this.statusOptions = [
			{value: 'active', label: 'Active'},
			{value: 'outoforder', label: 'Out of Order'},
			{value: 'inactive', label: 'Inactive'},
			{value: 'inrepair', label: 'In repair'}
		];
		
		this.handleSlider = (props) => {
			const { value, dragging, index, ...restProps } = props;
			return (
				<Tooltip
					prefixCls="rc-slider-tooltip"
					overlay={value}
					visible={dragging}
					placement="top"
					key={index}
				>
					<Handle value={value} {...restProps} />
				</Tooltip>
			);
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onChangeImgHandler = this.onChangeImgHandler.bind(this);
	}

	async populateCategory(){
		this.brandoptions = this.brandOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}

	async populateStatus(){
    this.statusoptions = this.statusOptions.map(option => (
		<option key={option.label} value={option.value}>
			{option.value}
		</option>
	));
	}
	
	async populatevehicle() { 
		try {
		  const vehicleId = this.props.match.params.id;
		
		  if (vehicleId === "new") return;
	
		  const { data: vehicle } = await getVehicle(vehicleId);
		  
			 vehicle.name = vehicle.name;
			 vehicle.vehicleNo = vehicle.vehicleNo;
			 vehicle.brand = vehicle.brand;
			 vehicle.model = vehicle.model;		  			 
			 vehicle.poweredBy = vehicle.poweredBy;		  			 			 
			 vehicle.mileage = vehicle.mileage;
			 vehicle.note = vehicle.note;
			 vehicle.createdOn = vehicle.creadOn;			 
			 vehicle.status = vehicle.status;

		  this.setState({ data: this.mapToViewModel(vehicle) });

		  console.log(this.state.data);
		} catch (ex) {
		  if (ex.response && ex.response.status === 404)
			this.props.history.replace("/error");
		}
	  }

	async componentDidMount() {
	
		await this.populateCategory();
		await this.populatePoweredBy();
		await this.populateStatus();						
		await this.populatevehicle();
	}

schema = Joi.object({
		vehicleNo: Joi.string().optional(),
		brand: Joi.string().optional(),		
		model: Joi.string(),
		numberPlate: Joi.any().optional(),
		vehicleNo: Joi.string().optional(),
		poweredBy: Joi.string().optional(),				
		mileage: Joi.string().optional(),
		note: Joi.string().optional(),		
		createdOn: Joi.date().optional(),		
		status: Joi.string().optional(),			
	});


	handlecreatedOnChange = (e) => {
		const errors = { ...this.state.errors };
		const data = { ...this.state.data };
		data['createdOn'] = e;
		this.setState({ data });
		console.log(this.state.data);
	};

	handledeadlineChange = (e) => {
		const errors = { ...this.state.errors };
		const data = { ...this.state.data };
		data['deadline'] = e;
		this.setState({ data });
		console.log(this.state.data);
	};
	
	onChangeImgHandler=event=>{

		this.setState({ imageSrc: event.target.files[0] });
	  console.log(event.target.files[0]);
	
	}

	doSubmit = async (vehicle) => {
	    try{
			console.log(this.state.data);
			await saveVehicle(this.state.data,this.state.imageSrc);
			this.props.history.push("/clinic/vehicles");
		}catch(ex){
			//if(ex.response && ex.response.status === 404){
			if(ex.response){
				const errors = {...this.state.errors};
				errors.vehiclename = ex.response.data;
				this.setState({errors});
				//console.log(this.state.errors);
			}
		}
		
	};
	
	makevehicleNo() {
		let vehicleNumber = "VH-";
		const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
		for (let i = 0; i <= 5; i++) vehicleNumber += possible.charAt(Math.floor(Math.random() * possible.length));
		return vehicleNumber;
	}
	
	mapToViewModel(vehicle) {
		return {
            _id: vehicle._id,
            vehicleNo	: vehicle.vehicleNo,
            brand	: vehicle.brand,
            model	: vehicle.model,			
			numberPlate: vehicle.numberPlate,
            poweredBy	: vehicle.poweredBy,						
			mileage	: vehicle.mileage,
            note        : vehicle.note,			
            createdOn	: new Date(vehicle.createdOn),									
            status      : vehicle.status,     
		};
	  }

	render() {

		const { data, errors } = this.state;
		return (
			<React.Fragment>

				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
						<li className="breadcrumb-item"><Link to="/clinic/vehicles">vehicles</Link></li>
						<li className="breadcrumb-item active">Add vehicle</li>
					</ol>
					<h1 className="page-header">
						Add vehicle<small>vehicle-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add vehicle</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >
 
									   {this.renderInput("name","Name of vehicle","text","Enter Name/Title/subject for vehicle")}
									   {this.renderInput("vehicleNo","Narrative","text","* Tell your story/issue....")}                                    
                                           
									{/* <div className="form-group row">
										<label className="col-lg-4 col-form-label">Subscription Type</label>
										<div className="btn-group col-lg-8">
											<div className="btn btn-secondary active">
												<input type="radio" name="subscription" onChange={this.handleChange} value="vehicle"  checked={data.subscription === "vehicle" } />
												<label>vehicle</label>
											</div>
											<div className="btn btn-secondary">
												<input type="radio" name="subscription" onChange={this.handleChange} value="Solo" checked={data.subscription === "Solo" } />
												<label>SoloPractice</label>
											</div>
										</div>
										{errors.subscription && (<div className="alert alert-danger">{errors.subscription}</div>)}
									</div>  */}

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="brand" >Brand</label>
											<div className="col-lg-8">
												<select name="brand" id="brand" value={data.brand} onChange={this.handleChange} className="form-control" >
													<option value="">Select Brand</option>
												
													{this.brandoptions}
												</select>
											</div>
											{errors.brand && (<div className="alert alert-danger">{errors.brand}</div>)}
										</div>

										{this.renderInput("mileage","Mileage","text","Enter mileage")} 
										{this.renderInput("model","Model","text","Enter Model")}

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="poweredBy" >Powered By</label>
											<div className="col-lg-8">
												<select name="poweredBy" id="poweredBy" value={data.poweredBy} onChange={this.handleChange} className="form-control" >
													<option value="">Select Fuel-Category</option>
													{this.poweredByoptions}
												</select>
											</div>
											{errors.poweredBy && (<div className="alert alert-danger">{errors.poweredBy}</div>)}
										</div>
										
										{this.renderInput("numberPlate","Number-plate","text","Enter Number-plate")}
										
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="imageSrc">Image</label>
											<div className="col-lg-8">
												<div className="row row-space-10">
													<input type="file" id="imageSrc" name="imageSrc" className="form-control-file m-b-5"
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
											<label className="col-lg-4 col-form-label" htmlFor="status" >Status</label>
											<div className="col-lg-8">
												<select name="status" id="status" value={data.status} onChange={this.handleChange} className="form-control" >
													<option value="">Select Status</option>
													{this.statusoptions}
												</select>
											</div>
											{errors.poweredBy && (<div className="alert alert-danger">{errors.status}</div>)}
										</div>
										
										<div className="form-group row">
											<div className="col-lg-8">
												<button	type="submit" disabled={this.validate()} className="btn btn-primary width-65">Submit</button>
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

export default withRouter(Vehicle);