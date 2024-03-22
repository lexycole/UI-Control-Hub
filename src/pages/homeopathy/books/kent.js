import React from 'react';
import { Link,withRouter} from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../../components/panel/panel.jsx';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import ReactTags from 'react-tag-autocomplete';
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
import {saveKent,getKent} from './../../../services/kents';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class Kent extends Form {
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
				relationship: '',				
				
				SKU: '',
				note: '',
				prefix: '',
				phone: '',
				mobile: '',
				skype: '',				
				skills: '',
				licenseNo: '',
				organizationAName: '',
				organizationAMemberNo: '',				
				organizationBName: '',
			    organizationBMemberNo: '',				
				idPaper: '',

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

	async populateKent() { 
		try {
		  const clarkeId = this.props.match.params.id;
		
		  if (clarkeId === "new") return;
	
		  const { data: Kent } = await getKent(clarkeId);
            const kent = Kent[0];
		    console.log(Kent);
			 if(kent.dateBirth)kent.dateBirth = new Date();
		     
			kent.name =kent.name;
			kent.abbreviation =kent.abbreviation;
			kent.commonName = kent.commonName;
			kent.otherName = kent.otherName;						
			kent.relationship =kent.relationship;
			kent.profile = kent.profile;			
			kent.generalInfo = kent.generalInfo;
			kent.naturalHistory = kent.naturalHistory;			
			kent.SKU = kent.SKU;			
			kent.note = kent.note;						

		  this.setState({ data: this.mapToViewModel(Kent) });

		  console.log(this.state.data);
		} catch (ex) {
		  if (ex.response && ex.response.status === 404)
			this.props.history.replace("/error");
		}
	  }


	async componentDidMount() {
		
		await this.populateKent();
	
	}


schema = Joi.object({
		name: Joi.string(),
		abbreviation: Joi.string(),
		commonName: Joi.any().optional(),		
		otherName: Joi.any().optional(),		
		profile: Joi.any().optional(),
		relationship: Joi.any().optional(),
		note: Joi.any().optional(),
		prefix: Joi.any().optional(),
		naturalHistory: Joi.any().optional(),
		generalInfo: Joi.any().optional(),		
		state: Joi.any().optional(),				
		SKU: Joi.any().optional(),
		//profile: Joi.any().required(),
		skills: Joi.any().optional(),
		licenseNo: Joi.any().optional(),        				
		licenseValidTill: Joi.any().optional(),
		organizationAName: Joi.any().optional(),        				
		organizationAMemberNo: Joi.any().optional(),
		organizationBName: Joi.any().optional(),        				
		organizationBMemberNo: Joi.any().optional(),
		idPaper: Joi.any().optional(),        				
		idPaperValidTill: Joi.any().optional(),		
	});

	onChangeImgHandler=event=>{

		this.setState({ imageSrc: event.target.files[0] });
	  console.log(event.target.files[0]);
	
	}


	doSubmit = async () => {
		//console.log('working');
	    try{
			console.log(this.state.data);
			await saveKent(this.state.data,this.state.imageSrc);
			//console.log(this.state.data);
			this.props.history.push("/books/kents");
		}catch(ex){
			//if(ex.response && ex.response.status === 404){
			if(ex.response){
				const errors = {...this.state.errors};
				//console.log(ex.response.data.split('"')[1]);
				const path = ex.response.data.split('"')[1];
				//errors.Kentname = ex.response.data;
				errors[path] = ex.response.data;
				this.setState({errors});
				//console.log(this.state.errors);
			}
		}
		
	};
	
	mapToViewModel(kent) {
		return {
            _id: kent._id,
            name: kent.name,
            abbreviation: kent.abbreviation,
			commonName: kent.commonName,
			otherName: kent.otherName,
            profile: kent.profile,
            naturalHistory: kent.naturalHistory,
            relationship: kent.relationship,			
            dose : kent.dose,			
            caution : kent.caution,			
            SKU: kent.SKU,
            note: kent.note,
		};
	  }

	render() {

		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
						<li className="breadcrumb-item"><Link to="/form/plugins">Kents</Link></li>
						<li className="breadcrumb-item active">Add Kent</li>
					</ol>
					<h1 className="page-header">
						Add Kent <small>Kent-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Kent</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >
 										{this.renderInput("name","Name","text","* Enter Name")}
										{this.renderInput("abbreviation","Abbreviation","text","* Enter abbreviation")}
										{this.renderInput("commonName","Common Name","text","Enter Common Name")} 
										{this.renderInput("otherName","Other Name","text","Enter Other Name")}
										{this.renderInput("profile","profile","text","Enter profile")} 										
										{this.renderInput("relationship","relationship","text","Enter relationship")}										
                                        {this.renderInput("naturalHistory","Natural History","text","Enter natural History")} 
										{this.renderInput("dose","Dose","text","Enter Dose")}
                                        {this.renderInput("caution","Caution","text","Enter caution")} 
                                        {this.renderInput("SKU","SKU","text","Enter SKU")} 
										{this.renderInput("note","note","text","Enter note")}
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="imageSrc">Avatar</label>
											<div className="col-lg-8">
												<div className="row row-space-10">
													<input type="file" id="imageSrc" name="imageSrc" className="form-control-file m-b-5"onChange={this.onChangeImgHandler}/>
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

export default withRouter(Kent);