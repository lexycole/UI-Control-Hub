import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "./../../components/panel/panel.jsx";

import { getEROs, deleteERO } from "./../../services/eros";
import "bootstrap/dist/css/bootstrap.min.css";

import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import EROsTable from "../../components/erosTable.jsx";
import SearchBox from "./../../common/searchBox";
import _ from "lodash";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons imports
import newIcon from "../../assets/Icons/new.svg";
import editIcon from "../../assets/Icons/edit.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";
import sharingIcon from "../../assets/Icons/sharing.svg";

class EROsTableData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eros: [],
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

		const data = await getEROs();
		console.log(data.data);
		this.setState({ eros: data.data });
	}

	handleDelete = (user) => {
		console.log(user);
		const eros = this.state.eros.filter((el) => el._id !== user._id);
		this.setState({ eros: eros });
	};


	handleMassDelete = (CheckedFields) => {
		const originalEROs = this.state.eros;
		CheckedFields.map(async (ero) => {
			const eros = this.state.eros.filter((ERO) => ERO._id !== ero);

			this.setState({ eros });
			try {
				console.log({ero});
				await deleteERO(ero)
			} catch (ex) {
				if (ex.response && ex.response === 404) {
					alert("already deleted");
				}

				this.setState({ eros: originalEROs });
			}
			console.log("Users: ", this.state.eros);
		});
	};

	//check box change
	handleCheckboxChange = ({ target: { checked, value } }) => {
		if (checked) {
			const checkedFields = [...this.state.checkedFields, value];
			this.setState({ checkedFields });
		} else {
			const checkedFields = [...this.state.checkedFields];
			this.setState({ checkedFields: checkedFields.filter((e) => e !== value) });
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
		const { pageSize, currentPage, eros: EROs, sortColumn, searchQuery } = this.state;
		//
		//filter maybe next time
		let filtered = EROs;
		if (searchQuery) {
			console.log(searchQuery);
			filtered = EROs.filter(
				(el) =>
					el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
					el.username.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		}

		//
		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const eros = paginate(sorted, currentPage, pageSize);
		return { data: eros };
	};

	render() {
		const { length: count } = this.state.eros;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

		const { data: eros } = this.getDataPgnation();

		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item">
						<Link to="/">Tables</Link>
					</li>
					<li className="breadcrumb-item active">Data Tables</li>
				</ol>
				<h1 className="page-header">EROs </h1>
				<Panel>
					<PanelHeader>EROs Management</PanelHeader>

					<React.Fragment>
						<ToastContainer />
						<div className="toolbar" style={toolbarStyles}>
							<button className="btn btn-default active m-r-5 m-b-5" title="add ero" style={btnStyles}>
								{" "}
								<Link to="/ero/eros/new">
									<img style={iconStyles} src={newIcon} alt="..." />
								</Link>
							</button>

							<button className="btn btn-default active m-r-5 m-b-5" title="edit ero" style={btnStyles}>
								{" "}
								<Link
									to={
										this.state.checkedFields[0]
											? `/ero/eros/${this.state.checkedFields[0]}`
											: "/ero/eros/"
									}
								>
									<img style={iconStyles} src={editIcon} alt="..." />
								</Link>{" "}
							</button>
							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="delete ero"
								style={btnStyles}
								onClick={() => this.handleMassDelete(this.state.checkedFields)}
							>
								{" "}
								<img style={{ width: "25px", height: "25px" }} src={trashIcon} alt="..." />
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Excel" style={btnStyles}>
								{" "}
								<Link to="/ero/eros/">
									<img style={iconStyles} src={xlsIcon} alt="..." />
								</Link>{" "}
							</button>

							<button className="btn btn-default active m-r-5 m-b-5" title="csv" style={btnStyles}>
								{" "}
								<Link to="/ero/eros">
									<img style={iconStyles} src={csvIcon} alt="..." />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="PDF" style={btnStyles}>
								{" "}
								<Link to="/ero/eros/">
									<img style={iconStyles} src={pdfIcon} alt="..." />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Share to other" style={btnStyles}>
								{" "}
								<Link to="/ero/eros/">
									<img style={iconStyles} src={sharingIcon} alt="..." />
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

							<EROsTable
								eros={eros}
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

export default EROsTableData;
