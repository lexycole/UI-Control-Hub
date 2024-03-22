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
import {saveNash,getNash} from './../../../services/nashs';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class Nash extends Form {
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
				naturalHistory: '',				
				relationship: '',
				dose: '',
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

	async populateNash() { 
		try {
		  const nashId = this.props.match.params.id;
		
		  if (nashId === "new") return;
	
		  const { data: Nash } = await getNash(nashId);
            const nash = Nash[0];
		    console.log(Nash);
			 if(nash.dateBirth)nash.dateBirth = new Date();
		     
			nash.name =nash.name;
			nash.abbreviation =nash.abbreviation;
			nash.commonName = nash.commonName;
			nash.otherName = nash.otherName;						
			nash.relationship =nash.relationship;
			nash.profile = nash.profile;			
			nash.generalInfo = nash.generalInfo;
			nash.naturalHistory = nash.naturalHistory;			
			nash.dose = nash.dose;						
			nash.SKU = nash.SKU;			
			nash.note = nash.note;						

		  this.setState({ data: this.mapToViewModel(Nash) });

		  console.log(this.state.data);
		} catch (ex) {
		  if (ex.response && ex.response.status === 404)
			this.props.history.replace("/error");
		}
	  }


	async componentDidMount() {
		
		await this.populateNash();
	
	}


schema = Joi.object({
		name: Joi.string(),
		abbreviation: Joi.string(),
		commonName: Joi.any().optional(),		
		otherName: Joi.any().optional(),		
		profile: Joi.any().optional(),
		naturalHistory: Joi.any().optional(),		
		relationship: Joi.any().optional(),
		dose: Joi.any().optional(),        						
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
			await saveNash(this.state.data,this.state.imageSrc);
			//console.log(this.state.data);
			this.props.history.push("/books/nashs");
		}catch(ex){
			//if(ex.response && ex.response.status === 404){
			if(ex.response){
				const errors = {...this.state.errors};
				//console.log(ex.response.data.split('"')[1]);
				const path = ex.response.data.split('"')[1];
				//errors.Nashname = ex.response.data;
				errors[path] = ex.response.data;
				this.setState({errors});
				//console.log(this.state.errors);
			}
		}
		
	};
	
	mapToViewModel(nash) {
		return {
            _id: nash._id,
            name: nash.name,
            abbreviation: nash.abbreviation,
			commonName: nash.commonName,
			otherName: nash.otherName,
            profile: nash.profile,
            naturalHistory: nash.naturalHistory,
            relationship: nash.relationship,
            dose : nash.dose,			
            SKU: nash.SKU,
            note: nash.note,  
		};
	  }

	render() {

		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
						<li className="breadcrumb-item"><Link to="/form/plugins">Nashs</Link></li>
						<li className="breadcrumb-item active">Add Nash</li>
					</ol>
					<h1 className="page-header">
						Add Nash <small>Nash-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Nash</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >
 										{this.renderInput("name","Name","text","* Enter Name")}
										{this.renderInput("abbreviation","Abbreviation","text","* Enter abbreviation")}
										{this.renderInput("commonName","Common Name","text","Enter Common Name")} 
										{this.renderInput("otherName","Other Name","text","Enter Other Name")}
										{this.renderTextArea("profile","profile","text","Enter profile")} 										
                                        {this.renderTextArea("naturalHistory","Natural History","text","Enter natural History")} 										
										{this.renderTextArea("relationship","relationship","text","Enter relationship")}										
										{this.renderInput("dose","Dose","text","Enter Dose")}										
                                        {this.renderInput("SKU","SKU","text","Enter SKU")} 
										{this.renderTextArea("note","note","text","Enter note")}
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

export default withRouter(Nash);