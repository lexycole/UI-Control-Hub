import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "./../../../components/panel/panel.jsx";
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import axios from "axios";
import { getDunhams } from "./../../../services/dunhams";
import "bootstrap/dist/css/bootstrap.min.css";
//import FloatSubMenu from './../../components/float-sub-menu/float-sub-menu';
import Pagination from "../../../common/pagination";
import { paginate } from "../../../utils/paginate";
import DunhamsTable from "../../../components/dunhamsTable.jsx";
import SearchBox from "./../../../common/searchBox";
import _ from "lodash";
import http from "./../../../services/httpService";
import { apiUrl } from "./../../../config/config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Button, Form, FormGroup, Input, Modal, Label, ModalHeader, ModalBody, Row } from "reactstrap";

// Icons imports
import newIcon from "../../../assets/Icons/new.svg";
import editIcon from "../../../assets/Icons/edit.svg";
import trashIcon from "../../../assets/Icons/trash.svg";
import csvIcon from "../../../assets/Icons/csv.svg";
import xlsIcon from "../../../assets/Icons/xls.svg";
import pdfIcon from "../../../assets/Icons/pdf.svg";
import sharingIcon from "../../../assets/Icons/sharing.svg";
import Icon from "./../../../common/icon";
class DunhamsTableData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dunhams: [],
			pageSize: 10,
			currentPage: 1,
			sortColumn: { path: "title", order: "asc" },
			searchQuery: "",
			checkedFields: [],
			errors: {},
		};
		this.handleDelete = this.handleDelete.bind(this);
		this.handleMassDelete = this.handleMassDelete.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	}

	async componentDidMount() {
		//const {data:Dunhams} = await axios.get("http://localhost:4500/api/Dunhams");
		const data = await getDunhams();
		console.log(data.data);
		this.setState({ dunhams: data.data });
	}

	handleDelete = (user) => {
		console.log(user);
		const Dunhams = this.state.dunhams.filter((el) => el._id !== user._id);
		this.setState({ dunhams: Dunhams });
	};


	handleMassDelete = (CheckedFields) => {
		const originalDunhams = this.state.dunhams;
		CheckedFields.map(async (Dunham) => {
			const Dunhams = this.state.dunhams.filter((Dunham) => Dunham._id !== Dunham);
		
			this.setState({ Dunhams });
			try {
				await http.delete(apiUrl + "/Dunhams/" + Dunham);
			} catch (ex) {
				if (ex.response && ex.response === 404) {
					alert("already deleted");
				}

				this.setState({ dunhams: originalDunhams });
			}
			console.log("Users: ", this.state.dunhams);
		});
	};

//check box change
handleCheckboxChange = ({ target: { checked, value } }) => {
	if (checked) {
	const checkedFields = [...this.state.checkedFields,value];
	this.setState({checkedFields});
	} else {
	const checkedFields = [...this.state.checkedFields];
	this.setState({ checkedFields:checkedFields.filter((e) => e !== value)});
	}
	  console.log("checked users: ", this.state.checkedFields);
};


	//sorting columns
	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
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
		const { pageSize, currentPage, dunhams: Dunhams, sortColumn, searchQuery } = this.state;
		//
		//filter maybe next time
		let filtered = Dunhams;
		if (searchQuery) {
			console.log(searchQuery);
			filtered = Dunhams.filter(
				(el) =>
					el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
					el.username.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		}

		//
		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const dunhams = paginate(sorted, currentPage, pageSize);
		return { data: dunhams };
	};

	render() {
		const { length: count } = this.state.dunhams;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
		// if(count === 0)  return "<p>No data available</p>";

		const { data: dunhams } = this.getDataPgnation();

		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item">
						<Link to="/homeopathy/books/dunhams">Tables</Link>
					</li>
					<li className="breadcrumb-item active">Data Tables</li>
				</ol>
				<h1 className="page-header">Dunhams </h1>
				<Panel>
					<PanelHeader>Dunhams Management</PanelHeader>

					<React.Fragment>
						<ToastContainer />
						<div className="toolbar" style={toolbarStyles}>
							<button className="btn btn-default active m-r-5 m-b-5" title="add Dunham" style={btnStyles}>
								{" "}
								<Link to="/books/dunhams/new">
									<img style={iconStyles} src={newIcon} />
								</Link>
							</button>

							<button className="btn btn-default active m-r-5 m-b-5" title="edit Dunham" style={btnStyles}>
								{" "}
								<Link
									to={
										this.state.checkedFields
											? `/books/dunhams/${this.state.checkedFields[0]}`
											: "/books/dunhams/"
									}
								>
									<img style={iconStyles} src={editIcon} />
								</Link>{" "}
							</button>
							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="delete Dunham"
								style={btnStyles}
								onClick={() => this.handleMassDelete(this.state.checkedFields)}
							>
								{" "}
								<img style={{ width: "25px", height: "25px" }} src={trashIcon} />
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Excel" style={btnStyles}>
								{" "}
								<Link to="/books/dunhams/">
									<img style={iconStyles} src={xlsIcon} />
								</Link>{" "}
							</button>

							<button className="btn btn-default active m-r-5 m-b-5" title="csv" style={btnStyles}>
								{" "}
								<Link to="/books/dunhams/">
									<img style={iconStyles} src={csvIcon} />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="PDF" style={btnStyles}>
								{" "}
								<Link to="/books/dunhams/">
									<img style={iconStyles} src={pdfIcon} />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Share to other" style={btnStyles}>
								{" "}
								<Link to="/books/dunhams/">
									<img style={iconStyles} src={sharingIcon} />
								</Link>{" "}
							</button>
						</div>
						<div className="table-responsive">
							<SearchBox value={searchQuery} onChange={this.handleSearch} />
							<p
								className="page-header float-xl-left"
								style={({ marginBottom: 5 }, { marginLeft: 20 }, { marginTop: 5 })}
							>
								{count} entries
							</p>

							<DunhamsTable
								dunhams={dunhams}
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

export default DunhamsTableData;
