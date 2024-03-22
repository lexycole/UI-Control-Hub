import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Link, withRouter } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
//import axios from 'axios';
import { getAppointments, deleteAppointment } from './../../services/appointments';
import 'bootstrap/dist/css/bootstrap.min.css';
//import FloatSubMenu from './../../components/float-sub-menu/float-sub-menu';
import Pagination from '../../common/pagination';
import { paginate } from '../../utils/paginate';
import AppointmentsTable from '../../components/appointmentsTable.jsx';
import SearchBox from './../../common/searchBox';
import _ from 'lodash';
import http from './../../services/httpService';
import { apiUrl } from './../../config/config.json';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Icons imports
import newIcon from "../../assets/Icons/new.svg";
import eyeIcon from "../../assets/Icons/eye.svg";
import editIcon from "../../assets/Icons/edit.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";
import sharingIcon from "../../assets/Icons/sharing.svg";

class AppointmentTable extends Component {

	constructor(props) {
		super(props);
		this.state = {
			appointments: [],
			pageSize: 10,
			currentPage: 1,
			sortColumn: { path: 'title', order: 'asc' },
			searchQuery: "",
			checkedFields: [],
			errors: {},
		}

		this.handleDelete = this.handleDelete.bind(this);
	}

	async componentDidMount() {
		const { data } = await getAppointments();
		console.log(data);
		this.setState({ appointments: data });
	}

	handleDelete = async (appointment) => {


		///delete
		const originalAppointments = this.state.appointments;
		const appointments = this.state.appointments.filter(Appointment => Appointment._id !== appointment._id);
		this.setState({ appointments });
		try {
			await http.delete(apiUrl + "/appointments/" + appointment._id);
		}
		catch (ex) {
			//ex.request
			//ex.response

			if (ex.response && ex.response === 404) {
				alert("already deleted");
			}

			this.setState({ appointments: originalAppointments });
		}
		////

	};


	// delete multiple  appointments
	handleMassDelete = (CheckedAppointments) => {
		const originalAppointments = this.state.appointments;
		CheckedAppointments.map(async (appointment) => {
			const appointments = this.state.appointments.filter((Appointment) => Appointment._id !== appointment);
			this.setState({ appointments });
			try {
				await http.delete(apiUrl + "/appointments/" + appointment);
			} catch (ex) {
				if (ex.response && ex.response === 404) {
					alert("already deleted");
				}

				this.setState({ appointment: originalAppointments });
			}
			console.log("appointments: ", this.state.appointments);
		});
	};


	handleCheckboxChange = ({ target: { checked, value } }) => {
		if (checked) {
			const checkedFields = [...this.state.checkedFields, value];
			this.setState({ checkedFields: checkedFields });
		} else {
			const checkedFields = [...this.state.checkedFields];
			this.setState({ checkedFields: checkedFields.filter((e) => e !== value) });
		}
	};






	//sorting columns
	handleSort = (sortColumn) => {
		this.setState({ sortColumn })
	};
	handlePageChange = (page) => {
		console.log(page);
		this.setState({ currentPage: page });

	};

	handleSearch = (query) => {
		console.log(query);
		this.setState({ searchQuery: query, currentPage: 1 });
	};


	getDataPgnation = () => {
		const { pageSize, currentPage, appointments: Appointments, sortColumn, searchQuery } = this.state;
		//
		//filter maybe next time
		let filtered = Appointments;
		if (searchQuery) {
			console.log(searchQuery);
			filtered = Appointments.filter((el) => el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
				el.appointmentname.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		}

		//
		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const appointments = paginate(sorted, currentPage, pageSize);
		return { data: appointments };
	}

	render() {
		const { length: count } = this.state.appointments;
		const { pageSize, currentPage, sortColumn, searchQuery, checkedFields } = this.state;
		//if(count === 0)  return "<p>No data available</p>";

		const { data: appointments } = this.getDataPgnation();

		console.log(checkedFields);
		return (

			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item"><Link to="/">Home</Link></li>
					<li className="breadcrumb-item"><Link to="/">Tables</Link></li>
					<li className="breadcrumb-item active">Data Tables</li>
				</ol>
				<h1 className="page-header">Appointments </h1>
				<Panel>
					<PanelHeader>
						Appointments Management
					</PanelHeader>

					<React.Fragment>
						<ToastContainer />
						<div className="toolbar" style={toolbarStyles}>
							<button className="btn btn-default active m-r-5 m-b-5" title="add appointment" style={btnStyles}>
								{" "}
								<Link to="/planning/appointments/new">
									<img style={iconStyles} src={newIcon} />
								</Link>
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="view Appointment-profile" style={btnStyles}>
								{" "}
								<Link to={
									checkedFields
										? `/appointmentprofile/${checkedFields[0]}`
										: "/planning/appointments/"
								}>
									<img style={iconStyles} src={eyeIcon} />
								</Link>
							</button> 

							<button className="btn btn-default active m-r-5 m-b-5" title="edit appointment" style={btnStyles}>
								{" "}
								<Link
									to={
										checkedFields
											? `/planning/appointments/${checkedFields[0]}`
											: "/planning/appointments/"
									}
								>
									<img style={iconStyles} src={editIcon} />
								</Link>{" "}
							</button>
							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="delete appointment"
								style={btnStyles}
								onClick={() => this.handleMassDelete(checkedFields)}
							>
								{" "}
								<img style={{ width: "25px", height: "25px" }} src={trashIcon} />
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Excel" style={btnStyles}>
								{" "}
								<Link to="/planning/appointments/">
									<img style={iconStyles} src={xlsIcon} />
								</Link>{" "}
							</button>

							<button className="btn btn-default active m-r-5 m-b-5" title="csv" style={btnStyles}>
								{" "}
								<Link to="/planning/appointments/">
									<img style={iconStyles} src={csvIcon} />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="PDF" style={btnStyles}>
								{" "}
								<Link to="/planning/appointments/">
									<img style={iconStyles} src={pdfIcon} />
								</Link>{" "}
							</button>

						</div>
						<div className="table-responsive">

							<SearchBox value={searchQuery} onChange={this.handleSearch} />
							<p className="page-header float-xl-left" style={{ marginBottom: 5, marginLeft: 20, marginTop: 5 }} > {count} entries</p>

							<AppointmentsTable appointments={appointments}
								onDelete={this.handleDelete}
								onSort={this.handleSort}
								sortColumn={sortColumn}
								handleCheckboxChange={this.handleCheckboxChange}
							/>

						</div>

					</React.Fragment>

					<hr className="m-0" />
					<PanelBody>
						<div className="d-flex align-items-center justify-content-center">
							<Pagination
								itemsCount={count}
								pageSize={pageSize}
								onPageChange={this.handlePageChange}
								currentPage={currentPage}
							/>
						</div>
					</PanelBody>
				</Panel>
			</div >

		)
	}
}
const toolbarStyles = {
	background: "#c8e9f3",
	padding: "10px",
};

const btnStyles = { background: "#348fe2", margin: "0rem" };

const iconStyles = {
	width: "25px",
	height: "25px",
	marginRight: "0rem",
};
export default AppointmentTable