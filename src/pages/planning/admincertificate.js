import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import DateTime from 'react-datetime';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Joi from 'joi';
import Form from '../../common/form.jsx';
import { saveAdminCertificate, getAdminCertificate } from './../../services/admincertificates';
import { getProfile } from '../../services/authservice.js';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class AdminCertificate extends Form {
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

			data: {
				userNo: "",
				name: "",
				note: "",
			},
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

	async populateAdminCertificate() {
		try {
			const admincertificateId = this.props.match.params.id;
			console.log(admincertificateId);
			if (admincertificateId === "new") return;

			const { data: admincertificate } = await getAdminCertificate(admincertificateId);
			console.log("edit ", admincertificate);

			this.setState({ data: this.mapToViewModel(admincertificate) });

			console.log(this.state.data);
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				this.props.history.replace("/error");
		}
	}


	async componentDidMount() {
		await this.populateAdminCertificate();
		const user = await getProfile();
		const data = { ...this.state.data };
		data.userNo = user._id;
		this.setState({ data });
	}


	schema = Joi.object({
		name: Joi.string(),
		note: Joi.any().optional(),

		admincertificate: Joi.any().optional(),
	});

	onChangeImgHandler = event => {
		this.setState({ imageSrc: event.target.files[0] });
		console.log(event.target.files[0]);
	}

	doSubmit = async () => {
		console.log('working');
		try {
			console.log(this.state.data);
		
			await saveAdminCertificate(this.state.data, this.state.imageSrc);
			console.log("done");
			this.props.history.push("/user/admincertificates");
		} catch (ex) {
		
			if (ex.response) {
				const errors = { ...this.state.errors };
			
				const path = ex.response.data.split('"')[1];
				
				errors[path] = ex.response.data;
				this.setState({ errors });
				console.log(this.state.errors);
			}
		}
	};

	mapToViewModel(admincertificate) {
		return {
			_id: admincertificate._id,
			userNo: admincertificate.userNo,
			name: admincertificate.name,
			note: admincertificate.note,			
		};
	}


	render() {
		const { data, errors } = this.state;
		
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
						<li className="breadcrumb-item"><Link to="/user/admincertificates">AdminCertificates</Link></li>
						<li className="breadcrumb-item active">Add AdminCertificate</li>
					</ol>
					<h1 className="page-header">
						Add AdminCertificate <small>AdminCertificate-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add AdminCertificate</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >

										{this.renderInput("name", "Name", "text", "*Enter name *")}										
										{this.renderInput("description", "description", "text", "Enter description")}										
										{this.renderInput("note", "note", "text", "Enter note")}

										<div className="form-group row">
											<div className="col-lg-8">
												<button type="submit" disabled={this.validate} className="btn btn-primary width-65">Submit</button>
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

export default withRouter(AdminCertificate);