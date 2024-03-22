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
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'react-datetime/css/react-datetime.css';
import 'react-datepicker/dist/react-datepicker.css';
import Joi from 'joi';
import Form from '../../common/form.jsx';
import {apiUrl} from '../../config/config.json';
import http from '../../services/httpService';
import {saveReview,getReview} from './../../services/reviews';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class Review extends Form {
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
				userID: '',
				parentID: '',				
				narrative: '',
				rating: '',
				createdOn: '',
			},
            selectedFile: null,
			errors: {}
		}

		this.RatingOptions = [
			{ value: '1star', label: '1 star' },
			{ value: '2star', label: '2 stars' },
			{ value: '3star', label: '3 stars' },
			{ value: '4star', label: '4 stars' },
			{ value: '5star', label: '5 stars' },
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

	async populateRating(){
		this.Ratingoptions = this.RatingOptions.map(option => (
			<option key={option.Rating} value={option.value}>
				{option.value}
			</option>
		));
	}

	async populateReview() { 
		try {
		  const ReviewId = this.props.match.params.id;
		
		  if (ReviewId === "new") return;
	
		  const { data: Review } = await getReview(ReviewId);
		     
			 review.userID = review.userID;
			 review.narrative = review.narrative;
			 review.rating = review.rating;
			 review.parentID = review.parentID;
			 rview.createdOn = review.createdOn;
		  this.setState({ data: this.mapToViewModel(Review) });

		  console.log(this.state.data);
		} catch (ex) {
		  if (ex.response && ex.response.status === 404)
			this.props.history.replace("/error");
		}
	  }

	async componentDidMount() {
	
		await this.populateRating();		
	}

	// schema = Joi.object({
	// 	userID: Joi.string().required().Review('userID')
	// 	//password: Joi.string().required().Review('Password'),
	// 	//email:Joi.string().required().Review('Email'),	
	// 	//gender:Joi.string().required().Review('Gender'),
	// 	//country:Joi.string().required().Review('Country')
	// });
	schema = Joi.object({

		userID : Joi.string().optional(),
		narrative     : Joi.string().optional(),		
		rating: Joi.string().optional(),		
		createdOn: Joi.date().optional(),		
	});

	handledateChange = (e) => {
		const errors = { ...this.state.errors };
		const obj = { ['date']: e };

		const data = { ...this.state.data };
		data['date'] = e;
		//const data = {...this.state.data};
		//data.date = e;
		this.setState({ data });
		console.log(this.state.data);
	};
	

	doSubmit = async (Review) => {
		//console.log('working');
	    try{
	
			await saveUser(this.state.data,this.state.imageSrc);
			//console.log(this.state.data);
			this.props.history.push("/clinic/users");
		}catch(ex){
			//if(ex.response && ex.response.status === 404){
			if(ex.response){
				const errors = {...this.state.errors};
				errors.userID = ex.response.data;
				this.setState({errors});
				//console.log(this.state.errors);
			}
		}
		
	};
	
	mapToViewModel(Review) {
		return {
            _id: review._id,
            userID: review.userID,
            parentID: review.parentID,			
            narrative: review.narrative,			
            rating: review.rating,		
            createdOn: new Date(review.date),
		};
	  }
		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<h1 className="page-header">
						Add Review <small>Review-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Review</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >

										{this.renderInput("printerName","Printer-Name","text","* Enter Name of Printer")}									
										{this.renderInput("name","Review-Name","text","* Enter Name for Review")}
										
										<div className="form-group row">
											<Review className="col-lg-4 col-form-Review" htmlFor="ReviewSize" >Review-Size</Review>
											<div className="col-lg-8">
												<select name="ReviewSize" id="ReviewSize" onChange={this.handleChange} className="form-control" >
													<option value="">Select Review-Size</option>
													{this.ReviewSizeoptions}
												</select>
											</div>
											{errors.ReviewType && (<div className="alert alert-danger">{errors.ReviewSize}</div>)}
										</div>

										{this.renderInput("fontSize","Fontsize","number","* Enter Size for font")}
										
										<div className="form-group row">
											<Review className="col-lg-4 col-form-Review" htmlFor="barcodeType" >Barcode Type</Review>
											<div className="col-lg-8">
												<select name="barcodeType" id="barcodeType" onChange={this.handleChange} className="form-control" >
													<option value="">Select Barcode-Type</option>
													{this.barcodeTypeoptions}
												</select>
											</div>
											{errors.barcodeType && (<div className="alert alert-danger">{errors.barcodeType}</div>)}
										</div>
										
										{this.renderSelect("countries","MadeIn",this.state.countries)}
										
										<div className="form-group row">
											<Review className="col-lg-4 col-form-Review" htmlFor="date" >Expired Date</Review>
											<div className="col-lg-8">
												<DatePicker
													onChange={this.handleDobChange}
													id={data.expiredDate}
													value={data.expiredDate}
													selected={data.expiredDate}
													inputProps={{ placeholder: "Datepicker" }}
													className="form-control"
												/>
												{errors.date && <div className="alert alert-danger">{errors.date}</div>}
											</div>
										</div>

   								    <div className="form-group row">
										<Review className="col-lg-4 col-form-Review">Orientation</Review>
										
										<div className="btn-group col-lg-8">
											<div className="custom-control custom-radio custom-control-inline">
												<input type="radio" name="orientation" id="customRadioInline1" class="custom-control-input"  onChange={this.handleChange} value="landscape"  checked={data.orientation === "landscape"  checked} />
												<Review class="custom-control-Review" for="customRadioInline1"> Landscape</Review>
											</div>
											<div className="custom-control custom-radio custom-control-inline">
												<input type="radio" name="orientation" id="customRadioInline2" class="custom-control-input" onChange={this.handleChange} value="portrait" checked={data.orientation === "portrait" } />
												<Review class="custom-control-Review" for="customRadioInline2"> Portrait</Review>
											</div>
										</div>
										{errors.orientation && (<div className="alert alert-danger">{errors.orientation}</div>)}
									</div>  
										
										
										<div className="form-group row">
											<Review className="col-lg-4 col-form-Review">Note</Review>
											<div className="col-lg-8">
												<div className="row row-space-5">
												<input type="textarea" className="form-control m-b-5" placeholder="Enter Note" />
												</div>
											</div>
										</div>
										
										<div className="form-group row">
											<div className="col-lg-8">
												<button	type="submit" disabled={this.validate()} className="btn btn-primary btn-block btn-lg">Submit</button>
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

export default withRouter(Review);