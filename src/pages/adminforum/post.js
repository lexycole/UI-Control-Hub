import React from 'react';
import { Link,withRouter} from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import CountryDropDown from '../../components/user/CountryDropDown';
import GenderDropDown from '../../components/user/GenderDropDown';
import ReactTags from 'react-tag-autocomplete';
import DatePicker from 'react-datepicker';
import DateTime from 'react-datetime';
import $ from "jquery";
import moment from "moment";
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
import {savePost,getPosts,getPost} from './../../services/posts.js';
import { getSubCategories } from '../../services/subcategories.js';
import { getcategories } from '../../services/categories.js';
import { getProfile } from '../../services/authservice.js';
import { gettopics } from '../../services/topics.js';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class Post extends Form {
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
			patients2: [],

			data: {
				title: 'mm',
				narrative: '',
				//tags: '',				
				//category: '',				
				//subCategory: '',
				topicId: '',								
								
				status:'',
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
 
		console.log(patients)
		
		this.setState({ patients });
		console.log(this.state.patients)
		this.selectPatients = this.state.patients.map((option) => (
			<option key={option._id} value={option._id} >
{option.name}
			</option>
		));
	
	

	}

	async populatesubCat(id) {
		if(id){
const patients1 = []
		const { data: patients } = await getSubCategories();
		console.log(this.state.data.category)
		patients.forEach(element => {
			if(element.catId._id===this.state.data.category) patients1.push(element)
		});
		console.log(patients)
		//console.log(m)
		this.setState({ patients1 });
	//	console.log(this.state)
	//	console.log(this.selectPatients1)
		this.selectPatients1 = this.state.patients1.map((option) => (
			<option key={option._id} value={option._id} >
{option.name}
			</option>
		));
		}
	}


	async populateTopic() {
	//	if(id){
//const patients2 = []
//		const { data: patients } = await gettopics();
//		console.log(patients)
//		patients.forEach(element => {
//			if(element.subCategory._id===this.state.data.subCategory) patients2.push(element)
//		});
//		console.log(patients2)
		//console.log(m)
		const { data: patients2 } = await gettopics();

		this.setState({ patients2 });

	//	console.log(this.state)
	//	console.log(this.selectPatients1)
		this.selectPatients2 = this.state.patients2.map((option) => (
			<option key={option._id} value={option._id} >
{option.title}
			</option>
		));
		//}
	}

	async populatePost() { 
		try {
		  const PostId = this.props.match.params.id;
		
		  if (PostId === "new") return;
	
		  const { data: Post } = await getPost(PostId);
console.log(Post)				 
		  this.setState({ data: this.mapToViewModel(Post) });

		  console.log(this.state.data);
		} catch (ex) {
		  if (ex.response && ex.response.status === 404)
			this.props.history.replace("/error");
		}
	  }

	async componentDidMount() {
	
		await this.populateStatus();
		//await this.populateCat();
		//console.log(this.state.data.category)
		//await this.populatesubCat(this.state.data.category);
		//console.log(this.state.data.subCategory)

		await this.populateTopic();
		await this.populatePost();

		const user = await getProfile();
		const data = { ...this.state.data };

		data.user = user._id;
		console.log(data.user)
		this.setState({ data });


	}


	


schema = Joi.object({
		title: Joi.string(),
		narrative: Joi.string(),
		//category: Joi.any().required(),
		//subCategory: Joi.string().optional(),
		topicId: Joi.any().required(),

		status: Joi.any().required(),			
	});


	onChangeImgHandler=event=>{

		this.setState({ imageSrc: event.target.files[0] });
	  console.log(event.target.files[0]);
	
	}

	doSubmit = async () => {
		console.log('working');
	    try{
			console.log(this.state.data);
			await savePost(this.state.data,this.state.imageSrc);

			//console.log(this.state.data);
			this.props.history.push("/clinic/Posts");
		}catch(ex){
			//if(ex.response && ex.response.status === 404){
			if(ex.response){
				const errors = {...this.state.errors};
				errors.Postname = ex.response.data;
				this.setState({errors});
				//console.log(this.state.errors);
			}
		}
		
	};

	
	
	
	mapToViewModel(Post) {
		return {
		  _id: Post._id,
		  title: Post.title,
		  narrative: Post.narrative,
		 // category: Post.category,
		  //subCategory: Post.subCategory,	
		  topicId: Post.topicId,		  
	  
		  //tags : Post.tags,		 		  
		  status: Post.status,
		};
	  }


	render() {

		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item"><Link to="/forum/forums">Home</Link></li>
						<li className="breadcrumb-item"><Link to="/forum/Posts">Posts</Link></li>
						<li className="breadcrumb-item active">Add Post</li>
					</ol>
					<h1 className="page-header">
						Add Post <small>Post-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Post</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >

									

									 <ReactSummernote
        
        options={{
          lang: 'ru-RU',
          height: 350,
          dialogsInBody: true,
          toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview']]
          ]
        }}
		
        onChange={
			(e)=>{
			console.log(e)
			let a = e.split(">")[1]
			console.log(a)
				let data = this.state.data
				data.narrative = a.split("<")[0]
				this.setState({data :data})
				
			}
		}
      /> 



							{	/*		<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="category" >Select Category</label>
											<div className="col-lg-8">
												<select name="category" id="category" value={data.category} onChange={this.handleChange} className="form-control" >
													<option value="">Select category</option>
													{this.selectPatients}
												</select>
											</div>
											{errors.status && (<div className="alert alert-danger">{errors.status}</div>)}
	</div>*/}
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
{/*
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="status" >Select Sub-Category</label>
											<div className="col-lg-8">
												<select name="subCategory" id="subCategory" value={data.subCategory} onChange={this.handleChange} className="form-control" >
													<option value="">Select Sub-Category</option>
													{this.selectPatients1}
												</select>
											</div>
											{errors.status && (<div className="alert alert-danger">{errors.status}</div>)}
										</div>*/
}
										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="topic" >Select Topic</label>
											<div className="col-lg-8">
												<select name="topicId" id="topicId" value={data.topicId} onChange={this.handleChange} className="form-control" >
													<option value="">Select Topic</option>
													{this.selectPatients2}
												</select>
											</div>
											{errors.topicId && (<div className="alert alert-danger">{errors.topicId}</div>)}
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

export default withRouter(Post);