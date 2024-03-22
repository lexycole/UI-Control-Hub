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
import {saveHahnemann,getHahnemann} from './../../../services/hahnemanns';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class Hahnemann extends Form {
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
				caution: '',				
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
					cautionCls="rc-slider-tooltip"
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

	async populateHahnemann() { 
		try {
		  const hahnemannId = this.props.match.params.id;
		
		  if (hahnemannId === "new") return;
	
		  const { data: Hahnemann } = await getHahnemann(hahnemannId);
            const hahnemann = Hahnemann[0];
		    console.log(Hahnemann);
			 if(hahnemann.dateBirth)hahnemann.dateBirth = new Date();

			hahnemann.name =hahnemann.name;
			hahnemann.abbreviation =hahnemann.abbreviation;
			hahnemann.commonName = hahnemann.commonName;
			hahnemann.otherName = hahnemann.otherName;						
			hahnemann.relationship =hahnemann.relationship;
			hahnemann.profile = hahnemann.profile;			
			hahnemann.generalInfo = hahnemann.generalInfo;
			hahnemann.naturalHistory = hahnemann.naturalHistory;			
			hahnemann.SKU = hahnemann.SKU;			
			hahnemann.note = hahnemann.note;						

		  this.setState({ data: this.mapToViewModel(Hahnemann) });

		  console.log(this.state.data);
		} catch (ex) {
		  if (ex.response && ex.response.status === 404)
			this.props.history.replace("/error");
		}
	  }


	async componentDidMount() {
		
		await this.populateHahnemann();
	
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
		caution: Joi.any().optional(),		
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
			await saveHahnemann(this.state.data,this.state.imageSrc);
			//console.log(this.state.data);
			this.props.history.push("/books/hahnemanns");
		}catch(ex){
			//if(ex.response && ex.response.status === 404){
			if(ex.response){
				const errors = {...this.state.errors};
				//console.log(ex.response.data.split('"')[1]);
				const path = ex.response.data.split('"')[1];
				//errors.Hahnemannname = ex.response.data;
				errors[path] = ex.response.data;
				this.setState({errors});
				//console.log(this.state.errors);
			}
		}
		
	};
	
	mapToViewModel(hahnemann) {
		return {
            _id: hahnemann._id,
            name: hahnemann.name,
            abbreviation: hahnemann.abbreviation,
			commonName: hahnemann.commonName,
			otherName: hahnemann.otherName,
            profile: hahnemann.profile,
            generalInfo: hahnemann.generalInfo,			
            naturalHistory: hahnemann.naturalHistory,
            relationship: hahnemann.relationship,			
            dose : hahnemann.dose,			
            symptoms  : hahnemann.symptoms,			
            caution : hahnemann.caution,			
            SKU: hahnemann.SKU,
            note: hahnemann.note,  
		};
	  }

	render() {

		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
						<li className="breadcrumb-item"><Link to="/form/plugins">Hahnemanns</Link></li>
						<li className="breadcrumb-item active">Add Hahnemann</li>
					</ol>
					<h1 className="page-header">
						Add Hahnemann <small>Hahnemann-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Hahnemann</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >
 										{this.renderInput("name","Name","text","* Enter Name")}
										{this.renderInput("abbreviation","Abbreviation","text","* Enter abbreviation")}
										{this.renderInput("commonName","Common Name","text","Enter Common Name")} 
										{this.renderInput("otherName","Other Name","text","Enter Other Name")}
										{this.renderInput("profile","profile","text","Enter profile")} 										
										{this.renderInput("generalInfo","generalInfo","text","Enter general Info")}
                                        {this.renderInput("naturalHistory","Natural History","text","Enter natural History")} 
										{this.renderInput("relationship","relationship","text","Enter relationship")}																				
										{this.renderInput("dose","Dose","text","Enter Dose")}
                                        {this.renderInput("symptoms","Symptoms","text","Enter Symptoms")} 										
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

export default withRouter(Hahnemann);