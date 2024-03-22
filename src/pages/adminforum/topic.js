import React from 'react';
import { Link,withRouter} from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import CountryDropDown from '../../components/user/CountryDropDown';
import GenderDropDown from '../../components/user/GenderDropDown';
import ReactTags from 'react-tag-autocomplete';
import DatePicker from 'react-datepicker';
import DateTime from 'react-datetime';
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";

//import Select from 'react-select';
//import Select from "../../common/select";
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'react-datetime/css/react-datetime.css';
import 'react-datepicker/dist/react-datepicker.css';
import Joi from 'joi';
import Form from '../../common/form.jsx';
import {apiUrl} from '../../config/config.json';
import http from '../../services/httpService';
import {savetopic,gettopic} from './../../services/topics';
import {getSubCategorie, getSubCategories} from './../../services/subcategories';
import { getcategorie, getcategories} from "./../../services/categories";
import { getProfile } from '../../services/authservice.js';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class Topic extends Form {
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
			patients: [],
			patients1: [],
			attachments: [],
			data: {
				title: '',
				narrative: '',
				//category: '',
			
				subCategory: '',								
				status:'active',
				
			},
            selectedFile: null,
			errors: {}
		}


		this.statusOptions = [
			{value: 'active', label: 'Active'},
			{value: 'locked', label: 'Locked'},
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
		this.handleEditorChange = this.handleEditorChange.bind(this);
		this.onChangeImgHandler = this.onChangeImgHandler.bind(this);


	}

	handleEditorChange(e){
        console.log(e);
		const data = this.state.data
data.narrative=e
		this.setState({data: data});
      }

	async populateStatus(){
		this.statusoptions = this.statusOptions.map(option => (
			<option key={option.label} value={option.value}>
				{option.value}
			</option>
		));
	}



	async populateCat() {
		const { data: patients } = await getcategories();
 
		//console.log(patients)
		
		this.setState({ patients });
		//console.log(this.state.patients)
		this.selectPatients = this.state.patients.map((option) => (
			<option key={option._id} value={option._id} >
{option.name}
			</option>
		));
	
	

	}

	async populatesubCat() {
		
		const { data: patients } = await getSubCategories();
		
		this.setState({ patients });
	//	console.log(this.state)
	//	console.log(this.selectPatients1)
		this.selectPatients = this.state.patients.map((option) => (
			<option key={option._id} value={option._id} >
{option.name}
			</option>
		));
		
	}
	async populateTopic() { 
		try {
		  const TopicId = this.props.match.params.id;
		
		  if (TopicId === "new") return;

		  const { data: Topic } = await gettopic(TopicId);

		  console.log(Topic)
		  console.log("Topic")
		 
		 
		  this.setState({ data: this.mapToViewModel(Topic) });
		  console.log(this.mapToViewModel(Topic))

		 

		 // console.log(this.state.data);
		} catch (ex) {
		  if (ex.response && ex.response.status === 404)
			this.props.history.replace("/error");
		}
	  }

	  async componentDidMount() {
	


	




		await this.populateStatus();
		await this.populatesubCat();
		await this.populateTopic()
		const user = await getProfile();
		const data = { ...this.state.data };
		data.user = user._id;
		console.log(data.user)
		this.setState({ data });


	}


	  

	






  handleChange1 = async ({currentTarget:input}) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
	await this.populatePatients();
	console.log(this.state.pa)

	

  };





schema = Joi.object({
		title: Joi.string(),
		narrative: Joi.string(),
		
		subCategory: Joi.string().optional(),
		status: Joi.any().required(),	

		Topic: Joi.any().optional(),
		
	});


	onChangeImgHandler=event=>{

		this.setState({ attachments: event.target.files[0] });
	  console.log(event.target.files[0]);
	
	}

	doSubmit = async () => {
		console.log('working');
	    try{
	
		

			await savetopic(this.state.data,this.state.attachments);
			//console.log(this.state.data);
			this.props.history.push("/clinic/Topics");
		}catch(ex){
			//if(ex.response && ex.response.status === 404){
			if(ex.response){
				const errors = {...this.state.errors};
				errors.Topicname = ex.response.data;
				this.setState({errors});
				//console.log(this.state.errors);
			}
		}
		
	};
	
	
	 mapToViewModel(topic) {
		return {
		  _id: topic._id,
		  title: topic.title,
		  narrative: topic.narrative,
		// category: topic.subCategory,
		  subCategory: topic.subCategory,		  
		  status: topic.status,
		};
	  }


	render() {

		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item"><Link to="/forum/forums">Home</Link></li>
						<li className="breadcrumb-item"><Link to="/forum/topics">Topics</Link></li>
						<li className="breadcrumb-item active">Add Topic</li>
					</ol>
					<h1 className="page-header">
						Add Topic <small>Topic-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Topic</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >

										{this.renderInput("title","title","text","Enter Title")}


			
              <Editor
			  value={data.narrative}
			 
                init={{
					selector: '#myTextarea',
					
                  branding: false,
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}

				   onEditorChange={(newValue, editor) => {
        //setValue(newValue);
		const data = this.state.data
		data.narrative=editor.getContent({format: 'text'})
				this.setState({data: data});
				console.log(data.narrative)
        //setText(editor.getContent({format: 'text'}));
      }}
				
              />
		


{/*		<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="category" >Select Category</label>
											<div className="col-lg-8">
												<select name="category" id="category" value={this.state.data.category} onChange={this.handleChange} className="form-control" >
													<option value="">Select category</option>
													{this.selectPatients}
												</select>
											</div>
											{errors.status && (<div className="alert alert-danger">{errors.status}</div>)}
										</div>*/}
										{this.props.match.params.id!=="new" && <div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="status" >Select Status</label>
											<div className="col-lg-8">
												<select name="status" id="status" value={data.status} onChange={this.handleChange} className="form-control" >
													<option value="">Select Status</option>
													{this.statusoptions}
												</select>
											</div>
											{errors.status && (<div className="alert alert-danger">{errors.status}</div>)}
										</div> }  

								<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="subCategory" >Select Sub-Category</label>
											<div className="col-lg-8">
												<select name="subCategory" id="subCategory" value={data.subCategory} onChange={this.handleChange} className="form-control" >
													<option value="">Select Sub-Category</option>
													{this.selectPatients}
												</select>
											</div>
											{errors.subCategory && (<div className="alert alert-danger">{errors.subCategory}</div>)}
									</div>
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="attachments">Attachments</label>
											<div className="col-lg-8">
												<div className="row row-space-10">
													<input type="file" id="attachments" name="attachments"
													
														className="form-control-file m-b-5"
														onChange={this.onChangeImgHandler}
													/>
												
												</div>
											</div>
										</div>
										<div className="form-group row">
											<div className="col-lg-8">
												<button	type="submit" disabled={this.validate} className="btn btn-primary width-65">Submit</button>
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

export default withRouter(Topic);