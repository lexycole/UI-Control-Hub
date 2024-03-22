import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "./../../components/panel/panel.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import IncidentsTable from "../../components/incidentsTable.jsx";
import SearchBox from "./../../common/searchBox";
import _ from "lodash";
import http from "./../../services/httpService";
import { apiUrl } from "./../../config/config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons imports
import newIcon from "../../assets/Icons/new.svg";
import eyeIcon from "../../assets/Icons/eye.svg";
import editIcon from "../../assets/Icons/edit.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";
import sharingIcon from "../../assets/Icons/sharing.svg";
import archiveIcon from "../../assets/Icons/archive.svg";

import Icon from './../../common/icon';

//import functions
import { getIncidents , saveIncident } from '../../services/incidents.js'

class IncidentsTableData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Incidents: [],
			pageSize: 10,
			currentPage: 1,
			sortColumn: { path: "title", order: "asc" },
			searchQuery: "",
			errors: {},
			checkedFields: [],
		};

		this.handleDelete = this.handleDelete.bind(this);
		this.handleMassDelete = this.handleMassDelete.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	}

	

	async componentDidMount() {
		const { data } = await getIncidents();
		this.setState({ Incidents: data });
	}

	//sorting columns
	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};
	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleSearch = (query) => {
		this.setState({ searchQuery: query, currentPage: 1 });
	};

	getDataPgnation = () => {
		const { pageSize, currentPage, Incidents: Incidents, sortColumn, searchQuery } = this.state;

		//filter maybe next time
		let filtered = Incidents 
		if (searchQuery) {
			console.log(searchQuery);
			filtered = Incidents.filter(
				(el) =>
					el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
					el.username.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		}

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		let newIncidents = paginate(sorted, currentPage, pageSize);
		return { data: newIncidents };
	};

	handleDelete = async (incident) => {
		///delete
		const originalIncidents = this.state.Incidents;
		const Incidents = originalIncidents.filter((incident) => incident._id !== incident._id);
		this.setState({ Incidents });
		try {
			await http.delete(apiUrl + "/Incidents/" + incident._id);
		} catch (ex) {
			if (ex.response && ex.response === 404) {
				alert("already deleted");
			}

			this.setState({ Incidents: originalIncidents });
		}
	};

	handleCheckboxChange = ({ target: { checked, value } }) => {
		if (checked) {
			this.setState(({ checkedFields }) => ({
				checkedFields: [...checkedFields, value],
			}));
		} else {
			this.setState(({ checkedFields }) => ({
				checkedFields: checkedFields.filter((e) => e !== value),
			}));
		}
		console.log("checked users: ", this.state.checkedFields);
	};

	handleCheckboxAll = ( checked , incidents) => {

		if( checked )
		{
			let checkedIds = incidents.map( el => el._id)
			this.setState(({ checkedFields }) => ({
				checkedFields:  checkedIds ,
			}))
		}
		else
		{
			this.setState(({ checkedFields }) => ({
				checkedFields: [ ],
			}))
		}

		console.log("IS THIS WORKING ?? ")
		console.log("is checked  ? " , checked)

	}

	handleMassDelete = (CheckedIncidents) => {
		
		let Incidents = this.state.Incidents
		CheckedIncidents.map(async (incident) => {
			Incidents = Incidents.filter(( el ) => incident !== el._id )
			try {
				await http.delete(apiUrl + "/Incidents/" + incident);
			} catch (ex) {
				if (ex.response && ex.response === 404) {
					alert("already deleted");
				}
				
			}
		});
		this.setState({ Incidents })
	};



	doSubmit = async (e) => {
		e.preventDefault();
		console.log("Incidents form data: ", this.state.incidentData);
		try {
			await saveIncident(this.state.incidentData);
		} catch (err) {
			console.log("Error: ", err);
		}
		this.toggle();
		
	};

	render() {
		const { length: count } = this.state.Incidents;
		const { pageSize, currentPage, sortColumn, searchQuery,checkedFields } = this.state;
		
		let { data: Incidents } = this.getDataPgnation();
		console.log("INCIDENTS FETCHED : " , this.state.Incidents)
		console.log("checked fields : " , checkedFields)

		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item">
						<Link to="/">Incidents</Link>
					</li>
					<li className="breadcrumb-item active">Incidents Tables</li>
				</ol>
				<h1 className="page-header">Incidents </h1>
				<Panel>
					<PanelHeader>Incidents Management</PanelHeader>

					<React.Fragment>
						<ToastContainer />
						<div className="toolbar" style={toolbarStyles}>
						    <Icon
							to="/ero/incidents/new"
							title="add incident"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={newIcon}
							/>
                            <Icon
							to={checkedFields ? `/ero/incidents/${checkedFields[0]}`: "/ero/incidents/"}
							title="view incident"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={eyeIcon}
							/>
                            <Icon
							to={checkedFields ? `/ero/incidents/${checkedFields[0]}` : "/ero/incidents/"}
							title="edit incident"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={editIcon}
							/>
                            <Icon
							handleClick={() => this.handleMassDelete(checkedFields)}
							title="delete Incidents"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={trashIcon}
							/>
							<Icon
							to="/incident/Incidents/"
							title="Excel"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={xlsIcon}
							/>
							<Icon
							to="/incident/Incidents/"
							title="CSV"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={csvIcon}
							/>
                            <Icon
							to="/incident/Incidents/"
							title="PDF"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={pdfIcon}
							/>
                            <Icon
							to="/incident/Incidents/"
							title="Share to other"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={sharingIcon}
							/>
                            <Icon
							to="/incident/Incidents/"
							title="archive incident"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={archiveIcon}
							/>

						</div>

						<div className="table-responsive">
							<SearchBox value={searchQuery} onChange={this.handleSearch} />
							<p
								className="page-header float-xl-left"
								style={({ marginBottom: 5 }, { marginLeft: 20 }, { marginTop: 5 })}
							>
								{count} entries
							</p>

							<IncidentsTable
								Incidents={Incidents}
								onDelete={this.handleDelete}
								onSort={this.handleSort}
								sortColumn={sortColumn}
								handleCheckboxChange={this.handleCheckboxChange}
								handleCheckboxAll = {this.handleCheckboxAll}
							//tabMenus = {[{label:"none"}]}
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
			</div>
		);
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
export default IncidentsTableData;