import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "./../../components/panel/panel.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "../../common/pagination";
import { gettopics, deletetopic, savetopic } from "./../../services/topics";

import { paginate } from "../../utils/paginate";
import TopicsTable from "../../components/topicsTable.jsx";
import SearchBox from "./../../common/searchBox";
import _ from "lodash";
import http from "./../../services/httpService";
import { apiUrl } from "./../../config/config.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Button, Form, FormGroup, Input, Modal, Label, ModalHeader, ModalBody, Row } from "reactstrap";

// Icons imports
import newIcon from "../../assets/Icons/new.svg";
import editIcon from "../../assets/Icons/edit.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";

import Icon from './../../common/icon';



class TopicsTableData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open:false,
			Topics: [],
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
		this.handleOpen = this.handleOpen.bind(this);

	}

	// toggle() {
	// 	this.setState((prevState) => ({
	// 		toggleModal: !prevState.toggleModal,
	// 	}));
	// }

	 handleOpen() {
	 const data = this.state 
	 data.open=!data.open
	 this.setState({ data });

	 }

	async componentDidMount() {
		const { data } = await gettopics();
		console.log(data)
		this.setState({ Topics: data });
	}

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
		const { pageSize, currentPage, Topics, sortColumn, searchQuery } = this.state;

		//filter maybe next time
		let filtered = Topics;
		if (searchQuery) {
			console.log(searchQuery);
			filtered = Topics.filter(
				(el) =>
					el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
					el.username.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		}

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const topics = paginate(sorted, currentPage, pageSize);
		return { data: topics };
	};

	handleDelete = async (topic) => {
		///delete
		const originalTopics = this.state.Topics;
		const Topics = this.state.Topics.filter((topic) => topic._id !== topic._id);
		this.setState({ Topics });
		try {
			await http.delete(apiUrl + "/Topics/" + topic._id);
		} catch (ex) {
			//ex.request
			//ex.response

			if (ex.response && ex.response === 404) {
				alert("already deleted");
			}

			this.setState({ Topics: originalTopics });
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


	async handleMassDelete(data) {
		console.log(data);
		for (let i = 0; i <= data?.length; i++) {
			const Topics = await this?.state?.Topics?.filter(el => el?._id !== data[i]);
			this && this.setState({ Topics: Topics });
            console.log("delete subcategory")
console.log(data[i])

			await deletetopic(data[i]);
			toast.success("Sub category Deleted!")

			this.setState(event => {
				const selectedPort = event.checkedFields;
				const falseIndex = selectedPort.indexOf(data[i]);
				i--;
				return selectedPort.splice(falseIndex, 1);
			})
		}
	}


	// handleChange = ({ currentTarget: input }) => {
	// 	const topicData = { ...this.state.topicData };
	// 	topicData[input.name] = input.value;
	// 	this.setState({ topicData });
	// };

	doSubmit = async (e) => {
		e.preventDefault();
		console.log("Topics form data: ", this.state.topicData);
		try {
			await savetopic(this.state.topicData);
		} catch (err) {
			if (err) {
				console.log("Error: ", err);
			}
		}
		this.toggle();
	};

	render() {
		const { length: count } = this.state.Topics;
		const { pageSize, currentPage, sortColumn, searchQuery,checkedFields } = this.state;
		//if (count === 0) return <p>No data available</p>;

		const { data: Topics } = this.getDataPgnation();

		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item">
						<Link to="/clinic/Topics">Topics</Link>
					</li>
					<li className="breadcrumb-item active">Topics Tables</li>
				</ol>
				<h1 className="page-header">Topics </h1>
				<Panel>
					<PanelHeader>Topics Management</PanelHeader>

					<React.Fragment>
						<ToastContainer />
						<div className="toolbar" style={toolbarStyles}>
						    <Icon
							to="/clinic/Topics/new"
							title="add topic"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={newIcon}
							/>
                            <Icon
							to={checkedFields ? `/clinic/Topics/${checkedFields[0]}` : "/topic/Topics/"}
							title="edit topic"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={editIcon}
							/>
                            <Icon
							handleClick={() => this.handleMassDelete(checkedFields)}
							title="delete topic"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={trashIcon}
							/>
							<Icon
							to="/topic/Topics/"
							title="Excel"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={xlsIcon}
							/>
							<Icon
							to="/topic/Topics/"
							title="CSV"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={csvIcon}
							/>
                            <Icon
							to="/topic/Topics/"
							title="PDF"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={pdfIcon}
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

							{Topics?<TopicsTable
								topics={Topics}
								onSort={this.handleSort}
								sortColumn={sortColumn}
								handleCheckboxChange={this.handleCheckboxChange}
								handleOpen={this.handleOpen}

								open={this.state.open}
							/>:<div></div>
						}
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
export default TopicsTableData;