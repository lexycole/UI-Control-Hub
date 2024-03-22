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
import {saveAcupuncture,getAcupuncture} from './../../services/acupunctures';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class Acupuncture extends Form {
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
				letter_1: '',
				letter_2: '',
				name: '',				
				pinyin: '',				
				english: '',
				korean: '',
				japanese: '',
				vietnamese: '',
				physicalLocation: '',
				meridian: '',
				fiveElement: '',
				horarycycle: '',				
				functionality: '',
				indication: '',
				caution: '',
				videoLink: '',
				sharingLink: '',
				note: '',				
				references: '',
				
			},
            selectedFile: null,
			errors: {}
		}

		this.elementOptions = [
			{ value: "Jin-Metal 金", label: "Jin-Metal 金"},
			{ value: "Mu-Wood 木", label: "Mu-Wood 木"},
			{ value: "Shui-Water 水", label: "Shui-Water 水"},
			{ value: "Tu-Earth 土", label: "Tu-Earth 土"},
			{ value: "Huo-Fire 火", label: "Huo-Fire 火"},
		];

		this.horaryCycleOptions = [
			{ value: "1 PM to 3 PM", label: "1 PM to 3 PM"},
			{ value: "3 PM to 5 PM", label: "3 PM to 5 PM"},
			{ value: "5 PM to 7 PM", label: "5 PM to 7 PM"},
			{ value: "7 PM to 9 PM", label: "7 PM to 9 PM"},
			{ value: "9 PM to 11 PM", label: "9 PM to 11 PM"},
			{ value: "11 PM to 1 AM", label: "11 PM to 1 AM"},
			{ value: "1 AM to 3 AM", label: "1 AM to 3 AM"},			
			{ value: "1 AM to 3 AM", label: "1 AM to 3 AM"},						
			{ value: "3 AM to 5 AM", label: "3 AM to 5 AM"},						
			{ value: "5 AM to 7 AM", label: "5 AM to 7 AM"},						
			{ value: "7 AM to 9 AM", label: "7 AM to 9 AM"},						
			{ value: "9 AM to 11 AM", label: "9 AM to 11 AM"},									
			{ value: "11 AM to 1 PM", label: "11 AM to 1 PM"},									
		];

		this.meridianOptions = [
			{ value: "Hand Yin Lung Meridian(LU) 手太阴肺经", label: "Hand Yin Lung Meridian (LU) 手太阴肺经" },
			{ value: "Hand Yang Large Intestine Meridian(LI) 手阳明大肠经", label: "Hand Yang Large Intestine Meridian (LI) 手阳明大肠经" },
			{ value: "Foot Yang Stomach Meridian(ST) 足阳明胃经", label: "Foot Yang Stomach Meridian (ST) 足阳明胃经" },
			{ value: "Foot Yin Spleen Meridian(SP) 足太阴脾经", label: "Foot Yin Spleen Meridian (SP) 足太阴脾经" },
			{ value: "Hand Yin Heart Meridian(HT) 手少阴心经", label: "Hand Yin Heart Meridian (HT) 手少阴心经" },
			{ value: "Hand Yang Small Intestine Meridian(SI) 手太阳小肠经", label: "Hand Yang Small Intestine Meridian (SI) 手太阳小肠经" },			
			{ value: "Foot Yang Urinairy Bladder Meridian(BL) 足太阳膀胱经", label: "Foot Yang Urinairy Bladder Meridian (BL) 足太阳膀胱经" },			
			{ value: "Foot Yin Kidney Meridian(KI) 足少阴肾经", label: "Foot Yin Kidney Meridian(KI) 足少阴肾经" },			
			{ value: "Hand Yin Pericardium Meridian(PC) 手厥阴心包经", label: "Hand Yin Pericardium Meridian (PC) 手厥阴心包经" },			
			{ value: "Hand Yang San Jiao Meridian(SJ) 手少阳三焦经", label: "Hand Yang San Jiao Meridian (SJ) 手少阳三焦经" },
			{ value: "Foot Yang Gall Bladder Meridian(GB) 足少阳胆经", label: "Foot Yang Gall Bladder Meridian(GB) 足少阳胆经" },						
			{ value: "Foot Yin Liver Meridian(LV) 足厥阴肝经", label: "Foot Yin Liver Meridian(LV) 足厥阴肝经" },						
			{ value: "The Governing Vessel(DU), Du Channel 督脈", label: "The Governing Vessel(DU), Du Channel 督脈" },
			{ value: "The Conception Vessel(REN), Ren Channel 任脈", label: "The Conception Vessel(REN), Ren Channel 任脈" },						
			{ value: "Extra Points of the Chest and Abdomen, EX-CA", label: "Extra Points of the Chest and Abdomen, EX-CA" },						
			{ value: "Extra Points of the Head and Neck, EX-HN", label: "Extra Points of the Head and Neck, EX-HN" },			
			{ value: "Extra Points of Lower Extremities, EX-LE", label: "Extra Points of Lower Extremities, EX-LE" },									
			{ value: "Extra Points of Upper Extremities, EX-UE", label: "Extra Points of Upper Extremities, EX-UE" },									
			{ value: "Extra Points of Back, EX-B", label: "Extra Points of Back, EX-B" },
			{ value: "Extra Points jīng wài xué 经外穴", label: "Extra Points jīng wài xué 经外穴" },			
		];
	
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

	async populateUser() { 
		try {
		  const userId = this.props.match.params.id;
		
		  if (userId === "new") return;
	
		  const { data: user } = await getAcupuncture(userId);
            const acupuncture = user[0];
		    console.log(acupuncture);
		     
			acupuncture.firstName =acupuncture.contactName.first;
			acupuncture.lastName =acupuncture.contactName.last;
			acupuncture.initials =acupuncture.contactName.initials;
			// acupuncture.references = acupuncture.bankInfo.references;
			// acupuncture.bank = acupuncture.bankInfo.bank;
			// acupuncture.branchOfBank = acupuncture.bankInfo.branchOfBank;
			// acupuncture.healthcareProviderIdentifierOrganisation = acupuncture.professionalInfo.healthcareProviderIdentifierOrganisation;
			// acupuncture.healthcareProviderIdentifierIndividual = acupuncture.professionalInfo.healthcareProviderIdentifierIndividual;
			// acupuncture.treatments = acupuncture.professionalInfo.treatments;
			// acupuncture.licenseNo  = acupuncture.professionalInfo.licenseNo;
			// acupuncture.licenseValidTill = acupuncture.professionalInfo.licenseValidTill;
			// acupuncture.organizationAName = acupuncture.membership.organizationAName;
			// acupuncture.organizationAMemberNo = acupuncture.membership.organizationAMemberNo;
			// acupuncture.organizationBName =acupuncture.membership.organizationBName;
			// acupuncture.organizationBMemberNo =acupuncture.membership.organizationBMemberNo;
			// acupuncture.idPaper  =acupuncture.identification.idPaper;
			// acupuncture.idPaperValidTill =acupuncture.identification.idPaperValidTill;

		  this.setState({ data: this.mapToViewModel(acupuncture) });

		  console.log(this.horarycycle.data);
		} catch (ex) {
		  if (ex.response && ex.response.status === 404)
			this.props.history.replace("/error");
		}
	  }

schema = Joi.object({
		letter_1: Joi.string(),	
		letter_2: Joi.string(),			
		name: Joi.string(),
		pinyin: Joi.string(),
		english: Joi.string(),
		korean: Joi.any().optional(),
		indication: Joi.string().optional(),
		caution: Joi.string().optional(),
		japanese: Joi.string().optional(),
		vietnamese: Joi.any().optional(),		
		meridian: Joi.any().optional(),		
		physicalLocation: Joi.any().optional(),		
		fiveElement: Joi.any().optional(),		
		horarycycle: Joi.any().optional(),				
		functionality: Joi.string().optional(),
		references: Joi.any().optional(),
		note: Joi.any().optional(),		
	});

	onChangeImgHandler=event=>{

		this.setState({ imageSrc: event.target.files[0] });
	  console.log(event.target.files[0]);
	
	}

	doSubmit = async (acupuncture) => {
		//console.log('working');
	    try{
			console.log(this.horarycycle.data);
			await saveAcupuncture(this.horarycycle.data,this.horarycycle.imageSrc);
			//console.log(this.horarycycle.data);
			this.props.history.push("/clinic/acupunctures");
		}catch(ex){
			//if(ex.response && ex.response.status === 404){
			if(ex.response){
				const errors = {...this.horarycycle.errors};
				//console.log(ex.response.data.split('"')[1]);
				const path = ex.response.data.split('"')[1];
				//errors.acupuncturename = ex.response.data;
				errors[path] = ex.response.data;
				this.setState({errors});
				//console.log(this.horarycycle.errors);
			}
		}
		
	};
	
	mapToViewModel(acupunctures) {
		return {
            _id: acupunctures._id,
            name: acupunctures.name,
            //profile: acupunctures.profile,
            pinyin: acupunctures.pinyin,
            english: acupunctures.english,
            korean: acupunctures.korean,
            japanese: acupunctures.japanese,
			vietnamese: acupunctures.vietnamese,
            fiveElement : acupunctures.fiveElement,
            meridian : acupunctures.meridian,
			physicalLocation: acupunctures.physicalLocation,
            functionality: acupunctures.functionality,
            indication: acupunctures.indication,  
            caution: acupunctures.caution,			
            references : acupunctures.references,
			note: acupunctures.note,
		};
	  }


	render() {

		const { data, errors } = this.horarycycle;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
						<li className="breadcrumb-item"><Link to="/clinic/acupunctures">Acupunctures</Link></li>
						<li className="breadcrumb-item active">Add Acupuncture</li>
					</ol>
					<h1 className="page-header">
						Add Acupuncture <small>Acupuncture-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Acupuncture</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >
 
										{this.renderInput("name","Name","text","Name")}
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="imageSrc">Image</label>
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
										{this.renderInput("pinyin","Pinyin","text","pinyin")}
										{this.renderInput("korean","Korean","text","Enter Korean")}
										{this.renderInput("english","English","text","Enter English")}										
                                        {this.renderInput("japanese","Japanese","text","Enter Japanese")} 
										{this.renderInput("vietnamese","vietnamese","text","Enter Vietnamese")} 
										{this.renderInput("physicalLocation","physicalLocation","text","Enter Physical Location")}
										{this.renderInput("functionality","functionality","text","Enter functionality")}										
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="fiveElement" >Element</label>
											<div className="col-lg-8">
												<select name="fiveElement" id="fiveElement" value={data.fiveElement} onChange={this.handleChange} className="form-control" >
													<option value="">Select Element</option>
													{this.fiveElementoptions}
												</select>
											</div>
											{errors.fiveElement && (<div className="alert alert-danger">{errors.fiveElement}</div>)}
										</div>
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="meridian" >Meridian</label>
											<div className="col-lg-8">
												<select name="meridian" id="meridian" value={data.meridian} onChange={this.handleChange} className="form-control" >
													<option value="">Select Meridian</option>
													{this.meridianoptions}
												</select>
											</div>
											{errors.meridian && (<div className="alert alert-danger">{errors.meridian}</div>)}
										</div>
										
										{this.renderInput("horarycycle","horarycycle","text","Enter horarycycle")}
										{this.renderInput("references","references","text","Enter references")} 										
										{this.renderInput("note","Note","text","Enter note")} 
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

export default withRouter(Acupuncture);