import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "./../../components/panel/panel.jsx";
import { getSubCategories, deleteSubCategorie, saveSubCategorie } from "./../../services/subcategories";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import SubCategoriesTable from "../../components/subcategoriesTable.jsx";
import SearchBox from "./../../common/searchBox";
import _ from "lodash";
import http from "./../../services/httpService";
import { apiUrl } from "./../../config/config.json";
import { ToastContainer, toast } from "react-toastify";

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



class SubCategoriesTableData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sCategories: [],
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

	// toggle() {
	// 	this.setState((prevState) => ({
	// 		toggleModal: !prevState.toggleModal,
	// 	}));
	// }

	async componentDidMount() {
		console.log("meryem")
		const { data } = await getSubCategories();
			

		console.log(data)
		this.setState({ sCategories: data });
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
		const { pageSize, currentPage, sCategories, sortColumn, searchQuery } = this.state;
console.log(sCategories)
		//filter maybe next time
		let filtered = sCategories;
		if (searchQuery) {
			console.log(searchQuery);
			filtered = sCategories.filter(
				(el) =>
					el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
					el.username.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		}

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const Cat = paginate(sorted, currentPage, pageSize);
		return { data: Cat };
	};

	handleDelete = async (category) => {
		///delete
		const originalCategories = this.state.sCategories;
		const Categories = this.state.sCategories.filter((category) => category._id !== category._id);
		this.setState({ Categories });
		try {
			await http.delete(apiUrl + "/Categories/" + category._id);
		} catch (ex) {
			//ex.request
			//ex.response

			if (ex.response && ex.response === 404) {
				alert("already deleted");
			}

			this.setState({ sCategories: originalCategories });
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
			const Categories = await this?.state?.sCategories?.filter(el => el?._id !== data[i]);
			this && this.setState({ sCategories: Categories });
            console.log("delete subcategory")
console.log(data[i])

			await deleteSubCategorie(data[i]);
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
	// 	const categoryData = { ...this.state.categoryData };
	// 	categoryData[input.name] = input.value;
	// 	this.setState({ categoryData });
	// };

	doSubmit = async (e) => {
		e.preventDefault();
		console.log("Categories form data: ", this.state.categoryData);
		try {
			await saveSubCategorie(this.state.categoryData);
		} catch (err) {
			if (err) {
				console.log("Error: ", err);
			}
		}
		this.toggle();
	};

	render() {
		const { length: count } = this.state.sCategories;
		const { pageSize, currentPage, sortColumn, searchQuery,checkedFields } = this.state;
		//if (count === 0) return <p>No data available</p>;

		const { data: Categories } = this.getDataPgnation();
		console.log(Categories)

		return (
			<div>
									<ToastContainer />
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item">
						<Link to="/">Sub Categories</Link>
					</li>
					<li className="breadcrumb-item active">Sub Categories Tables</li>
				</ol>
				<h1 className="page-header">Sub Categories </h1>
				<Panel>
					<PanelHeader>Sub Categories Management</PanelHeader>

					<React.Fragment>
						<ToastContainer />
						<div className="toolbar" style={toolbarStyles}>
						    <Icon
							to="/subCategory/subcategories/new"
							title="add category"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={newIcon}
							/>
                            <Icon
							to={checkedFields ? `/subCategory/subcategories/${checkedFields[0]}` : "/subCategory/subcategories"}
							title="edit category"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={editIcon}
							/>
                            <Icon
							handleClick={() => this.handleMassDelete(this.state.checkedFields)}
							title="delete category"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={trashIcon}
							/>
							<Icon
							to="/subCategory/subcategories/"
							title="Excel"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={xlsIcon}
							/>
							<Icon
							to="/subCategory/subcategories/"
							title="CSV"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={csvIcon}
							/>
                            <Icon
							to="/subCategory/subcategories/"
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
						{Categories?<SubCategoriesTable
								SubCategories={Categories}
								
								onSort={this.handleSort}
								sortColumn={sortColumn}
								handleCheckboxChange={this.handleCheckboxChange}
							/>
							:<div></div>
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
export default SubCategoriesTableData;