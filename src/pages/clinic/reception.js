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
import CountryDropDown from '../../components/user/CountryDropDown';
import GenderDropDown from '../../components/user/GenderDropDown';
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
import {saveReception,getReception} from './../../services/receptions';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class Reception extends Form {
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
			countries: [],
			profiles: [],
			data: {
				username: '',
				password: '',
				email: '',
				firstName: '',
				lastName: '',
				initials: '',
				address1: '',
				address2: '',
				address3: '',
				zip: '',
				city: '',
				state: '',				
				country: '',
				dateBirth: new Date(),
				gender: '',
				imageSrc: null,				
				prefix: '',
				phone: '',
				mobile: '',
				skype: '',				
				IBAN: '',
				bank: '',
				branchOfBank: '',
				primInsuranceNo: '',
				primInsurance: '',
				primInsuranceValidTill: '',
				secInsuranceNo: '',
				secInsurance: '',
				secInsuranceValidTill: '',
				idPaper: '',
				idPaperValidTill: '',
				status: '',					
			},
            selectedFile: null,
			errors: {}
		}

		this.prefixOptions = [
			{ value: 'Mr', label: 'Mr.' },
			{ value: 'Mrs', label: 'Mrs.' },
			{ value: 'Mss', label: 'Mss.' },
			{ value: 'Ms', label: 'Ms.' },
			{ value: 'Prof', label: 'Prof.' },
			{ value: 'Dr', label: 'Dr.' }
		];

		this.genderOptions = [
			{ value: 'Female', label: 'Female' },
			{ value: 'Male', label: 'Male' },
			{ value: 'Other', label: 'Other' }
		];

		this.statusOptions = [
			{value: 'active', label: 'Active'},
			{value: 'banned', label: 'Banned'},
			{value: 'deleted', label: 'Deleted'},
			{value: 'inactive', label: 'Inactive'},
			{value: 'archived', label: 'Archived'}
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


	async populateCountries() {
		const { data: countries } = await http.get(apiUrl+"/countries");
		this.setState({ countries: countries });
		//this.selectCountries = this.state.countries.map((country)=>({label: country.name, value: country.name}) );
		this.selectCountries = this.state.countries.map((country) => ({ _id: country._id,label: country.name, value: country.name }));
	}
	
	async populateGenders(){
		this.genderoptions = this.genderOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}
	async populatePrefix(){
    this.prefixoptions = this.prefixOptions.map(option => (
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

	async populateUser() { 
		try {
		  const userId = this.props.match.params.id;
		
		  if (userId === "new") return;
	
		  const { data: user } = await getReception(userId);
            const reception = user[0];
		    console.log(reception);

			
        //reception.dateBirth = new Date(reception.dateBirth);
        if(reception.dateBirth)reception.dateBirth = moment(new Date(reception.dateBirth)).format("YYYY-MM-DD");
      else reception.dateBirth = new Date();
		     

			reception.firstName =reception.contactName.first;
			reception.lastName =reception.contactName.last;
			reception.initials =reception.contactName.initials;
			// reception.IBAN = reception.bankInfo.IBAN;
			// reception.bank = reception.bankInfo.bank;
			// reception.branchOfBank = reception.bankInfo.branchOfBank;
			// reception.healthcareProviderIdentifierOrganisation = reception.professionalInfo.healthcareProviderIdentifierOrganisation;
			// reception.healthcareProviderIdentifierIndividual = reception.professionalInfo.healthcareProviderIdentifierIndividual;
			// reception.treatments = reception.professionalInfo.treatments;
			// reception.licenseNo  = reception.professionalInfo.licenseNo;
			// reception.licenseValidTill = reception.professionalInfo.licenseValidTill;
			// reception.organizationAName = reception.membership.organizationAName;
			// reception.organizationAMemberNo = reception.membership.organizationAMemberNo;
			// reception.organizationBName =reception.membership.organizationBName;
			// reception.organizationBMemberNo =reception.membership.organizationBMemberNo;
			// reception.idPaper  =reception.identification.idPaper;
			// reception.idPaperValidTill =reception.identification.idPaperValidTill;

		  this.setState({ data: this.mapToViewModel(reception) });

		  console.log(this.state.data);
		} catch (ex) {
		  if (ex.response && ex.response.status === 404)
			this.props.history.replace("/error");
		}
	  }


	async componentDidMount() {
	
	
		//await this.populateProfiles();
		await this.populatePrefix();
		await this.populateGenders();
		await this.populateCountries();
		await this.populateStatus();		
		await this.populateUser();
	
	}

schema = Joi.object({
		username: Joi.string()
			.alphanum()
			.min(3)
			.max(30)
			.required(),

		password: Joi.string()
			.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
		firstName: Joi.string(),
		lastName: Joi.string(),
		initials: Joi.any().optional(),
		gender: Joi.string().optional(),
		prefix: Joi.string().optional(),
		address1: Joi.any().optional(),
		address2: Joi.any().optional(),		
		address3: Joi.any().optional(),		
		zip: Joi.any().optional(),
		city: Joi.any().optional(),		
		state: Joi.any().optional(),				
		country: Joi.string().optional(),
		//profile: Joi.any().required(),
		dateBirth: Joi.date().optional(),
		// email: Joi.string()
		// 	.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
		email: Joi.string().email({ tlds: { allow: false } }),
		IBAN: Joi.any().optional(),
		bank: Joi.any().optional(),
		branchOfBank: Joi.any().optional(),
		primInsuranceNo: Joi.any().optional(),
		primInsurance: Joi.any().optional(),  
		primInsuranceValidTill: Joi.any().optional(),		
		secInsuranceNo: Joi.any().optional(),
		secInsurance: Joi.any().optional(),  
		secInsuranceValidTill: Joi.any().optional(),		
		idPaper: Joi.any().optional(),        				
		idPaperValidTill: Joi.any().optional(),
		status: Joi.any().required(),				
	});

	handleDobChange = (e) => {
		const errors = { ...this.state.errors };
		const obj = { ['dateBirth']: e };

		const data = { ...this.state.data };
		data['dateBirth'] = e;
		//const data = {...this.state.data};
		//data.dateBirth = e;
		this.setState({ data });
		console.log(this.state.data);
	};
	
	onChangeImgHandler=event=>{

		this.setState({ imageSrc: event.target.files[0] });
	  console.log(event.target.files[0]);
	
	}


	doSubmit = async (user) => {
		//console.log('working');
	    try{
			console.log(this.state.data);
			await saveReception(this.state.data,this.state.imageSrc);
			//console.log(this.state.data);
			this.props.history.push("/clinic/receptions");
		}catch(ex){
			//if(ex.response && ex.response.status === 404){
			if(ex.response){
				const errors = {...this.state.errors};
				//console.log(ex.response.data.split('"')[1]);
				const path = ex.response.data.split('"')[1];
				//errors.username = ex.response.data;
				errors[path] = ex.response.data;
				this.setState({errors});
				//console.log(this.state.errors);
			}
		}
		
	};
	
	mapToViewModel(user) {
		return {
            _id: user._id,
            username: user.username,
            password: user.password,
            //profile: user.profile,
            email: user.email,
            dateBirth: new Date(user.dateBirth),
            firstName: user.firstName,
            lastName: user.lastName,
            initials: user.initials,
            prefix: user.prefix,
            address1: user.address1,
			address2: user.address2,
			address3: user.address3,
            city: user.city,			
            country: user.country,
            gender: user.gender,  
			imageSrc:user.imageSrc,			
            IBAN : user.IBAN,
            bank : user.bank,
            branchOfBank : user.branchOfBank,
			primInsuranceNo: user.primInsuranceNo,
			primInsurance: user.primInsurance,
			primInsuranceValidTill: user.primInsuranceValidTill,
			secInsuranceNo: user.secInsuranceNo,
			secInsurance: user.secInsurance,
			secInsuranceValidTill: user.secInsuranceValidTill,
            idPaper  : user.idPaper,
            idPaperValidTill : user.idPaperValidTill,
			status : user.status,     	  			
		};
	  }


	render() {

		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
						<li className="breadcrumb-item"><Link to="/form/plugins">Receptions</Link></li>
						<li className="breadcrumb-item active">Add Reception</li>
					</ol>
					<h1 className="page-header">
						Add Reception <small>Reception-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Reception</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >
 
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="prefix" >Prefix</label>
											<div className="col-lg-8">
												<select name="prefix" id="prefix" value={data.prefix} onChange={this.handleChange} className="form-control" >
													<option value="">Select Prefix</option>
													{this.prefixoptions}
												</select>
											</div>
											{errors.prefix && (<div className="alert alert-danger">{errors.prefix}</div>)}
										</div>

										{this.renderInput("firstName","First Name","text","* Enter Firstname")}
										{this.renderInput("initials","Initials","text","Enter Initials")}
										{this.renderInput("lastName","Last Name","text","* Enter Lastname")}
										
                                        {this.renderInput("address1","Address 1","text","Enter address1")} 
										{this.renderInput("address2","Address 2","text","Enter address2")} 
										{this.renderInput("address3","Address 3","text","Enter address3")}
										{this.renderInput("city","City","text","Enter City")}
										{this.renderInput("state","State","text","Enter State")}
										{this.renderInput("zip","Zip code","text","Enter zipcode")} 
										{this.renderSelect("country","Country",	this.state.countries)}										
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="gender" >Gender</label>
											<div className="col-lg-8">
												<select name="gender" id="gender" value={data.gender} onChange={this.handleChange} className="form-control" >
													<option value="">Select Gender</option>
													{this.genderoptions}
												</select>
											</div>
											{errors.gender && (<div className="alert alert-danger">{errors.gender}</div>)}
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="dateBirth" >Date of Birth</label>
											<div className="col-lg-8">
												<DatePicker
													onChange={this.handleDobChange}
													id={data.dateBirth}
													value={data.dateBirth}
													selected={data.dateBirth}
													inputProps={{ placeholder: "Datepicker" }}
													className="form-control"
												/>
												{errors.dateBirth && <div className="alert alert-danger">{errors.dateBirth}</div>}
											</div>
										</div>
										
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="username">UserName</label>
											<div className="col-lg-8">
												<div className="row row-space-10">
													<input type="text" id="username" name="username" value={data.username}
														className="form-control m-b-5" placeholder="Enter username"
														onChange={this.handleChange}
														autoFocus />
													{errors.username && (
														<div className="alert alert-danger">
															{errors.username}
														</div>
													)}
												</div>
											</div>
										</div>

										{this.renderInput("email", "Email", "email", "Enter email")}
										{this.renderInput("password", "Password", "password", "Enter Password")}
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="imageSrc">Avatar</label>
											<div className="col-lg-8">
												<div className="row row-space-10">
													<input type="file" id="imageSrc" name="imageSrc" className="form-control-file m-b-5" onChange={this.onChangeImgHandler}/>

													<img src={data.imageSrc} alt="" className="media-object"  style={{ width: "20px", height: "20px", borderRadius: "50%" }} />  
													{errors.imageSrc && (
														<div className="alert alert-danger">
															{errors.imageSrc}
														</div>
													)}
												</div>
											</div>
										</div>

                                        {this.renderInput("bank","Bank","text","Enter Bank")} 
                                        {this.renderInput("branchOfBank","branch Of Bank","text","Enter branchOfBank")}
                                        {this.renderInput("IBAN","IBAN","text","Enter IBAN")}                
                                        {this.renderInput("idPaper","ID-paper","text","Enter ID-Paper-type")} 
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="idPaperValidTill" >ID-paper Valid Till</label>																				
											<div className="col-lg-8">
												<DatePicker
													onChange={this.idPaperValidTillChange}
													id={data.idPaperValidTill}
													value={data.idPaperValidTill}
													selected={data.idPaperValidTill}
													inputProps={{ placeholder: "Datepicker" }}
													className="form-control"
												/>
												{errors.idPaperValidTill && <div className="alert alert-danger">{errors.idPaperValidTill}</div>}
											</div>
										</div>
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="status" >Select Status</label>
											<div className="col-lg-8">
												<select name="status" id="status" value={data.status} onChange={this.handleChange} className="form-control" >
													<option value="">Select Status</option>
													{this.statusoptions}
												</select>
											</div>
											{errors.status && (<div className="alert alert-danger">{errors.status}</div>)}
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

export default withRouter(Reception);