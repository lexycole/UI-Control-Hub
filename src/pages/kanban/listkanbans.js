import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "./../../components/panel/panel.jsx";
import { Alert, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import axios from "axios";
import { getListKanbans as getListKanbans } from "./../../services/listkanbans";
import "bootstrap/dist/css/bootstrap.min.css";
//import FloatSubMenu from './../../components/float-sub-menu/float-sub-menu';
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import ListkanbanTable from "../../components/listkanbansTable.jsx";

import SearchBox from "./../../common/searchBox";
import _ from "lodash";
import http from "./../../services/httpService";
import { apiUrl } from "./../../config/config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Button, Form, FormGroup, Input, Modal, Label, ModalHeader, ModalBody, Row } from "reactstrap";

// Icons imports
import newIcon from "../../assets/Icons/new.svg";
import editIcon from "../../assets/Icons/edit.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";
import sharingIcon from "../../assets/Icons/sharing.svg";

import Icon from "./../../common/icon";

class ListKanbansTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listkanbans: [],
			checkedFields: [],
			pageSize: 10,
			count: 0,
			currentPage: 1,
			sortColumn: { path: "title", order: "asc" },
			searchQuery: "",
			errors: {},
			kanbanData: "",
		};
	}

	async componentDidMount() {
		const { data: listkanbans } = await getListKanbans();
		this.setState({ listkanbans });
	}

	handleDelete = (user) => {
		console.log(user);
		const listKanbans = this.state.listKanbans.filter((el) => el._id !== user._id);
		this.setState({ listKanbans: listKanbans });
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
		console.log("checked listkanbans: ", this.state.checkedFields);
	};

	handleMassDelete = (CheckedListKanbans) => {
		const originalListKanbans = this.state.listkanbans;
		CheckedListKanbans.map(async (listkanban) => {
			try {
				await http.delete(apiUrl + "/listkanbans/" + listkanban);
				const listkanbans = this.state.listkanbans.filter((ListKanban) => ListKanban._id !== listkanban);
				this.setState({ listkanbans });
			} catch (ex) {
				if (ex.response && ex.response === 404) {
					alert("already deleted");
				}

				this.setState({ listkanbans: originalListKanbans });
			}
			console.log("List Kanbans: ", this.state.listkanbans);
		});
	};

	//search need to be reviewed
	getDataPgnation = () => {
		const { pageSize, currentPage, listkanbans: ListKanbans, sortColumn, searchQuery } = this.state;
		//filter maybe next time
		let filtered = ListKanbans;
		if (searchQuery) {
			console.log(searchQuery);
			filtered = ListKanbans.filter(
				(el) =>
					el.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
					el.username.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		}

		//
		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const listKanbans = paginate(sorted, currentPage, pageSize);
		return { data: listKanbans };
	};

	render() {
		const { length: count } = this.state.listkanbans;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
		//  if(count === 0)  return "<p>No data available</p>";

		const { data: listKanbans } = this.getDataPgnation();

		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item">
						<Link to="/kanban/kanbans">Kanbans</Link>
					</li>
				</ol>
				<h1 className="page-header">ListKanbans </h1>
				<Panel>
					<PanelHeader>ListKanbans Management</PanelHeader>

					<React.Fragment>
						<ToastContainer />
						<div className="toolbar" style={toolbarStyles}>
							<Icon
								to={{
									pathname: "/kanban/listkanbans/new",
									state: {
										kan: "",
										prevPage: "",
									},
								}}
								title="add listkanban"
								btnStyle={btnStyles}
								iconStyle={iconStyles}
								icon={newIcon}
							/>

							<Icon
								to={{
									pathname: this.state.checkedFields
										? `/kanban/listkanbans/${this.state.checkedFields[0]}`
										: "/kanban/listkanbans/",
									state: {
										kan: this.state.kanbanData ? this.state.kanbanData.data?.kanbanNo?._id : "",
										prevPage: "listkanbans",
									},
								}}
								title="Edit listkanban"
								btnStyle={btnStyles}
								iconStyle={iconStyles}
								icon={editIcon}
							/>

							<Icon
								to="/kanban/listkanbans/"
								handleClick={() => this.handleMassDelete(this.state.checkedFields)}
								title="Delete listkanban"
								btnStyle={btnStyles}
								iconStyle={iconStyles}
								icon={trashIcon}
							/>

							<Icon
								to="/kanban/listkanbans/"
								title="excel"
								btnStyle={btnStyles}
								iconStyle={iconStyles}
								icon={xlsIcon}
							/>

							<Icon
								to="/kanban/listkanbans/"
								title="csv"
								btnStyle={btnStyles}
								iconStyle={iconStyles}
								icon={csvIcon}
							/>

							<Icon
								to="/kanban/listkanbans/"
								title="pdf"
								btnStyle={btnStyles}
								iconStyle={iconStyles}
								icon={pdfIcon}
							/>

							<Icon
								to="/kanban/listkanbans/"
								title="share"
								btnStyle={btnStyles}
								iconStyle={iconStyles}
								icon={sharingIcon}
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

							<ListkanbanTable
								listKanbans={listKanbans}
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

export default ListKanbansTable;
