import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'react-datetime/css/react-datetime.css';
import 'react-datepicker/dist/react-datepicker.css';
import Joi from 'joi';
import Form from '../../common/form.jsx';
import { saveLeaveReason, getLeaveReason } from './../../services/leavesreasons';
import { getUsers } from './../../services/users';

import { getProfile } from '../../services/authservice.js';
import axios from 'axios';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class Leave extends Form {
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
				status: "",
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
	}

	async populateLeave() {
		try {
			const leaveId = this.props.match.params.id;
			console.log(leaveId);
			if (leaveId === "new") return;

			const { data: leave } = await getLeave(leaveId);
			console.log("edit ", leave);

			this.setState({ data: this.mapToViewModel(leave) });

			console.log(this.state.data);
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				this.props.history.replace("/error");
		}
	}


	async componentDidMount() {
		await this.populateName();
		await this.populateLeaveReason();
		
	}


	schema = Joi.object({
		name: Joi.string(),
		note: Joi.any().optional(),

	});

	doSubmit = async () => {
		console.log('working');
		const user = await getProfile();
		const data = { ...this.state.data };

		data.userNo = user._id;
		console.log(data.user)
		this.setState({ data });
		console.log(this.state.data.name);

	};

	mapToViewModel(leaveReason) {
		return {
			_id: leave._id,
			userNo: leave.userNo,
			name: leave.name,
			note: leave.note,
		
		};
	}


	render() {
		const { data, errors } = this.state;
		
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item"><Link to="/planning/leaves">Leaves</Link></li>
						<li className="breadcrumb-item active">{data.name}</li>
					</ol>
					<h1 className="page-header">
						Add Leave-Reason <small>Leave-Reason-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add Leave</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >

										<div className="form-group row">
										{this.renderInput("name", "Name", "text", "*Enter Name")}
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

export default withRouter(Leavereason);