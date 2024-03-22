import React from 'react';
import { Link,withRouter} from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../../components/panel/panel.jsx';
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
import Joi from 'joi';
import Form from '../../../common/form.jsx';
//import {apiUrl} from '../../config/config.json';
//import http from '../../services/httpService';
import {saveClarke,getClarke} from './../../../services/clarkes';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class Clarke extends Form {
	constructor(props) {
		super(props);

		this.state = {
			maxDateDisabled: true,
			data: {
				name: '',
				abbreviation: '',
				commonName: '',
				otherName: '',
				profile: '',
				generalInfo: '',				
				naturalHistory: '',
				relationship: '',
				dose: '',				
				symptoms: '',				
				SKU: '',
				note: '',
			},
            selectedFile: null,
			errors: {}
		}
		
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

	async populateClarke() { 
		try {
		  const clarkeId = this.props.match.params.id;
		
		  if (clarkeId === "new") return;
	
		  const { data: Clarke } = await getClarke(clarkeId);
            const clarke = Clarke[0];
		    console.log(Clarke);
			 if(clarke.dateBirth)clarke.dateBirth = new Date();
			clarke.name =clarke.name;
			clarke.abbreviation =clarke.abbreviation;
			clarke.commonName = clarke.commonName;
			clarke.otherName = clarke.otherName;						
			clarke.relationship =clarke.relationship;
			clarke.profile = clarke.profile;			
			clarke.generalInfo = clarke.generalInfo;
			clarke.naturalHistory = clarke.naturalHistory;			
			clarke.dose = clarke.dose;
			clarke.symptoms = clarke.symptoms;						
			clarke.SKU = clarke.SKU;			
			clarke.note = clarke.note;						

		  this.setState({ data: this.mapToViewModel(clarke) });

		  console.log(this.state.data);
		} catch (ex) {
		  if (ex.response && ex.response.status === 404)
			this.props.history.replace("/error");
		}
	  }


	async componentDidMount() {
		
		await this.populateClarke();
	
	}

schema = Joi.object({
		name: Joi.string(),
		abbreviation: Joi.string(),
		commonName: Joi.any().optional(),		
		otherName: Joi.any().optional(),		
		profile: Joi.any().optional(),		
		generalInfo: Joi.any().optional(),		
		naturalHistory: Joi.any().optional(),
		relationship: Joi.any().optional(),		
		dose: Joi.any().optional(),		
		symptoms: Joi.any().optional(),		
		SKU: Joi.any().optional(),
		note: Joi.any().optional(),						
	});

	onChangeImgHandler=event=>{

		this.setState({ imageSrc: event.target.files[0] });
	  console.log(event.target.files[0]);
	
	}


	doSubmit = async () => {
		//console.log('working');
	    try{
			console.log(this.state.data);
			await saveClarke(this.state.data,this.state.imageSrc);
			//console.log(this.state.data);
			this.props.history.push("/books/clarkes");
		}catch(ex){
			//if(ex.response && ex.response.status === 404){
			if(ex.response){
				const errors = {...this.state.errors};
				//console.log(ex.response.data.split('"')[1]);
				const path = ex.response.data.split('"')[1];
				//errors.Clarkename = ex.response.data;
				errors[path] = ex.response.data;
				this.setState({errors});
				//console.log(this.state.errors);
			}
		}
		
	};
	
	mapToViewModel(clarke) {
		return {
            _id: clarke._id,
            name: clarke.name,
            abbreviation: clarke.abbreviation,
			commonName: clarke.commonName,
			otherName: clarke.otherName,
            profile  : clarke.profile,			
            generalInfo : clarke.generalInfo,			
            naturalHistory: clarke.naturalHistory,			
            relationship: clarke.relationship,
            symptoms : clarke.symptoms,
            dose  : clarke.dose,			
            SKU: clarke.SKU,
            note: clarke.note,  
			};
	  }

	render() {

		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
						<li className="breadcrumb-item"><Link to="/form/plugins">Clarkes</Link></li>
						<li className="breadcrumb-item active">Add Clarke</li>
					</ol>
					<h1 className="page-header">
						Add Clarke <small>Clarke-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Clarke</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >
  										{this.renderInput("name","Name","text","* Enter Name")}
										{this.renderInput("abbreviation","Abbreviation","text","* Enter abbreviation")}
										{this.renderInput("commonName","Common Name","text","Enter Common Name")} 
										{this.renderInput("otherName","Other Name","text","Enter Other Name")}
										{this.renderInput("profile","profile","text","Enter profile")} 										
										{this.renderTextArea("generalInfo","generalInfo","text","Enter generalInfo")}										
										{this.renderTextArea("naturalHistory","Natural History","text","Enter Natural History")}										
										{this.renderTextArea("relationship","relationship","text","Enter relationship")}										
										{this.renderInput("dose","Dose","text","Enter Dose")}
                                        {this.renderInput("symptoms","Symptoms","text","Enter Symptoms")} 										
                                        {this.renderInput("SKU","SKU","text","Enter SKU")} 
										{this.renderTextArea("note","note","text","Enter note")}
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="imageSrc">Avatar</label>
											<div className="col-lg-8">
												<div className="row row-space-10">
													<input type="file" id="imageSrc" name="imageSrc" className="form-control-file m-b-5" onChange={this.onChangeImgHandler}/>
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

export default withRouter(Clarke);