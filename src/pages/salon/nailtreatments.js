import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "./../../components/panel/panel.jsx";
import { getNailTreatments, deleteNailTreatment, saveNailTreatment } from "./../../services/nailtreatments";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import NailTreatmentsTable from "../../components/nailtreatmentsTable.jsx";
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
import eyeIcon from "../../assets/Icons/eye.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";
import sharingIcon from "../../assets/Icons/sharing.svg";
import archiveIcon from "../../assets/Icons/archive.svg";

class NailTreatmentsTableData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nailtreatments: [],
			pageSize: 10,
			currentPage: 1,
			sortColumn: { path: "title", order: "asc" },
			searchQuery: "",
			errors: {},
			checkedNailTreatments: [],
		};

		this.handleDelete = this.handleDelete.bind(this);
		this.handleMassDelete = this.handleMassDelete.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	}

	// toggle() {
	// 	this.setState((prevState) => ({
	// 		toggleModal: !prevState.toggleModal,
	// 	}));
	// }

	async componentDidMount() {
		const { data } = await getNailTreatments();
		this.setState({ nailtreatments: data });
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
		const { pageSize, currentPage, nailtreatments: NailTreatments, sortColumn, searchQuery } = this.state;

		//filter maybe next time
		let filtered = NailTreatments;
		if (searchQuery) {
			console.log(searchQuery);
			filtered = NailTreatments.filter(
				(el) =>
					el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
					el.username.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		}

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const nailtreatments = paginate(sorted, currentPage, pageSize);
		return { data: nailtreatments };
	};

	handleDelete = async (nailtreatment) => {
		///delete
		const originalNailTreatments = this.state.nailtreatments;
		const nailtreatments = this.state.nailtreatments.filter((NailTreatment) => NailTreatment._id !== nailtreatment._id);
		this.setState({ nailtreatments });
		try {
			await http.delete(apiUrl + "/nailtreatments/" + nailtreatment._id);
		} catch (ex) {
			//ex.request
			//ex.response

			if (ex.response && ex.response === 404) {
				alert("already deleted");
			}

			this.setState({ nailtreatments: originalNailTreatments });
		}
	};

	handleCheckboxChange = ({ target: { checked, value } }) => {
		if (checked) {
			this.setState(({ checkedNailTreatments }) => ({
				checkedNailTreatments: [...checkedNailTreatments, value],
			}));
		} else {
			this.setState(({ checkedNailTreatments }) => ({
				checkedNailTreatments: checkedNailTreatments.filter((e) => e !== value),
			}));
		}
		console.log("checked users: ", this.state.checkedNailTreatments);
	};

	handleMassDelete = (CheckedNailTreatments) => {
		const originalNailTreatments = this.state.nailtreatments;
		CheckedNailTreatments.map(async (nailtreatment) => {
			const nailtreatments = this.state.nailtreatments.filter((NailTreatment) => NailTreatment._id !== nailtreatment);
			this.setState({ nailtreatments });
			try {
				await http.delete(apiUrl + "/nailtreatments/" + nailtreatment);
			} catch (ex) {
				if (ex.response && ex.response === 404) {
					alert("already deleted");
				}

				this.setState({ nailtreatments: originalNailTreatments });
			}
			console.log("NailTreatments: ", this.state.nailtreatments);
		});
	};

	// handleChange = ({ currentTarget: input }) => {
	// 	const nailtreatmentData = { ...this.state.nailtreatmentData };
	// 	nailtreatmentData[input.name] = input.value;
	// 	this.setState({ nailtreatmentData });
	// };

	doSubmit = async (e) => {
		e.preventDefault();
		console.log("nailtreatments form data: ", this.state.nailtreatmentData);
		try {
			await saveNailTreatment(this.state.nailtreatmentData);
		} catch (err) {
			if (err) {
				console.log("Error: ", err);
			}
		}
		this.toggle();
	};

	render() {
		const { length: count } = this.state.nailtreatments;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
		//if (count === 0) return <p>No data available</p>;

		const { data: nailtreatments } = this.getDataPgnation();

		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item">
						<Link to="/">NailTreatments</Link>
					</li>
					<li className="breadcrumb-item active">NailTreatments Tables</li>
				</ol>
				<h1 className="page-header">NailTreatments </h1>
				<Panel>
					<PanelHeader>NailTreatments Management</PanelHeader>

					<React.Fragment>
						<ToastContainer />
						<div className="toolbar" style={toolbarStyles}>
							<button className="btn btn-default active m-r-5 m-b-5" title="add nailtreatment" style={btnStyles}>
								{" "}
								<Link to="/salon/nailtreatments/new">
									<img style={iconStyles} src={newIcon} />
								</Link>
							</button>
							
							<button className="btn btn-default active m-r-5 m-b-5" title="View the nailtreatment" style={btnStyles}>
								{" "}
								<Link to="/salon/nailtreatments/">
									<img style={iconStyles} src={eyeIcon} />
								</Link>{" "}
							</button>
							
							<button className="btn btn-default active m-r-5 m-b-5" title="edit nailtreatment" style={btnStyles}>
								{" "}
								<Link
									to={
										this.state.checkedNailTreatments
											? `/salon/nailtreatments/${this.state.checkedNailTreatments[0]}`
											: "/salon/nailtreatments/"
									}
								>
									<img style={iconStyles} src={editIcon} />
								</Link>{" "}
							</button>
							<button
								className="btn btn-default active m-r-5 m-b-5"
								title="delete nailtreatments"
								style={btnStyles}
								onClick={() => this.handleMassDelete(this.state.checkedNailTreatments)}
							>
								{" "}
								<img style={{ width: "25px", height: "25px" }} src={trashIcon} />
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Excel" style={btnStyles}>
								{" "}
								<Link to="/salon/nailtreatments/">
									<img style={iconStyles} src={xlsIcon} />
								</Link>{" "}
							</button>
							
							<button className="btn btn-default active m-r-5 m-b-5" title="csv" style={btnStyles}>
								{" "}
								<Link to="/salon/nailtreatments/">
									<img style={iconStyles} src={csvIcon} />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="PDF" style={btnStyles}>
								{" "}
								<Link to="/salon/nailtreatments/">
									<img style={iconStyles} src={pdfIcon} />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Share to other" style={btnStyles}>
								{" "}
								<Link to="/salon/nailtreatments/">
									<img style={iconStyles} src={sharingIcon} />
								</Link>{" "}
							</button>
							<button className="btn btn-default active m-r-5 m-b-5" title="Archive the nailtreatment" style={btnStyles}>
								{" "}
								<Link to="/salon/nailtreatments/">
									<img style={iconStyles} src={archiveIcon} />
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

							<NailTreatmentsTable
								nailtreatments={nailtreatments}
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

export default NailTreatmentsTableData;

{
	/* <div>
	<Modal isOpen={this.state.toggleModal} toggle={this.toggle}>
		<ModalHeader toggle={this.toggle}>Add NailTreatment</ModalHeader>
		<ModalBody>
			<Form onSubmit={this.handleSubmit}>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="name"
								placeholder="name"
								value={this.state.nailtreatmentData.name}
								onChange={this.handleChange}
								required
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="participants"
								placeholder="participants"
								value={this.state.nailtreatmentData.participants}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={12}>
						<FormGroup>
							<Input
								type="textarea"
								name="narrative"
								placeholder="narrative"
								value={this.state.nailtreatmentData.narrative}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<Input
								type="select"
								name="category"
								placeholder="category"
								value={this.state.nailtreatmentData.category}
								onChange={this.handleChange}
							>
								<option value="orders">Orders</option>
								<option value="bug-error">Bug Error</option>
								<option value="complaint">Complaint</option>
								<option value="disconnection">Disconnection</option>
								<option value="feature-request">Feature Request</option>
								<option value="sales">Sales</option>
								<option value="others">Others</option>
							</Input>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="select"
								name="priority"
								placeholder="priority"
								value={this.state.nailtreatmentData.priority}
								onChange={this.handleChange}
							>
								<option value="normal">Normal</option>
								<option value="low">Low</option>
								<option value="high">High</option>
								<option value="urgent">Urgent</option>
							</Input>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<Label>Created on</Label>
							<Input
								type="date"
								name="createdon"
								placeholder="created on"
								value={this.state.nailtreatmentData.createdOn}
								onChange={(e) =>
									this.setState({
										nailtreatmentData: { ...this.state.nailtreatmentData, createdOn: e.target.value },
									})
								}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label>Deadline</Label>
							<Input
								type="date"
								name="deadline"
								placeholder="deadline"
								value={this.state.nailtreatmentData.deadline}
								onChange={(e) =>
									this.setState({
										nailtreatmentData: { ...this.state.nailtreatmentData, deadline: e.target.value },
									})
								}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="department"
								placeholder="department"
								value={this.state.nailtreatmentData.department}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="sub-department"
								placeholder="sub-department"
								value={this.state.nailtreatmentData.subDepartment}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="location"
								placeholder="location"
								value={this.state.nailtreatmentData.location}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="field"
								placeholder="field"
								value={this.state.nailtreatmentData.field}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="tags"
								placeholder="tags"
								value={this.state.nailtreatmentData.tags}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="reference"
								placeholder="reference"
								value={this.state.nailtreatmentData.reference}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="sharinglink"
								placeholder="sharing link"
								value={this.state.nailtreatmentData.sharingLink}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="assignedto"
								placeholder="assigned to"
								value={this.state.nailtreatmentData.assignedto}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
				</Row>

				<Row form>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="sharedto"
								placeholder="sharedto"
								value={this.state.nailtreatmentData.sharedTo}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="note"
								placeholder="note"
								value={this.state.nailtreatmentData.note}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<Input
								type="text"
								name="businessname"
								placeholder="business name"
								value={this.state.nailtreatmentData.businessName}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Input
								type="select"
								name="status"
								placeholder="status"
								value={this.state.nailtreatmentData.status}
								onChange={this.handleChange}
							>
								<option value="active">Active</option>
								<option value="pending">Pending</option>
								<option value="new">New</option>
								<option value="archive">Archive</option>
							</Input>
						</FormGroup>
					</Col>
				</Row>
				<Row form>
					<Col md={6}>
						<Button style={{ float: "right" }} type="submit" color="primary">
							Submit
						</Button>
					</Col>
					<Col md={6}>
						<Button color="secondary" onClick={this.toggle}>
							Cancel
						</Button>
					</Col>
				</Row>
			</Form>
		</ModalBody>
	</Modal>
</div> */
}