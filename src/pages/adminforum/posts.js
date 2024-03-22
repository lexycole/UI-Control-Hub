import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "./../../components/panel/panel.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import PostsTable from "../../components/postsTable.jsx";
import SearchBox from "./../../common/searchBox";
import _ from "lodash";
import http from "./../../services/httpService";
import {savePost,getPosts,getPost, deletePost} from './../../services/posts.js';
import {savetopic} from './../../services/topics';

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
import { getcategories } from "../../services/categories.js";
import CategoriesTable from "../../components/categoriesTable.jsx";

class PostsTableData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
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
		console.log("meryemm dif")

		const { data } = await getPosts();
		console.log("meryemm")
		console.log(data)
		this.setState({ posts: data });
		console.log("react")
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
		const { pageSize, currentPage, posts: Posts, sortColumn, searchQuery } = this.state;

		//filter maybe next time
		let filtered = Posts;
		if (searchQuery) {
			console.log(searchQuery);
			filtered = Posts.filter(
				(el) =>
					el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
					el.username.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		}

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const posts = paginate(sorted, currentPage, pageSize);
		return { data: posts };
	};

	handleDelete = async (post) => {
		///delete
		const originalPosts = this.state.posts;
		const posts = this.state.posts.filter((Post) => Post._id !== post._id);
		this.setState({ posts });
		try {
			await http.delete(apiUrl + "/Posts/" + post._id);
		} catch (ex) {
			//ex.request
			//ex.response

			if (ex.response && ex.response === 404) {
				alert("already deleted");
			}

			this.setState({ posts: originalPosts });
		}
	};

	handleCheckboxChange = ({ target: { checked, value } }) => {
		console.log("checkedFields")
		if (checked) {
			this.setState(({ checkedFields }) => ({
				checkedFields: [...checkedFields, value],
			}));
		} else {
			this.setState(({ checkedFields }) => ({
				checkedFields: checkedFields.filter((e) => e !== value),
			}));
		}
		console.log("checked posts: ", this.state.checkedFields);
	};

	async handleMassDelete(data){
		console.log(data);
		for (let i = 0; i <= data?.length; i++) {
			const posts = await this?.state?.posts?.filter(el => el?._id !== data[i]);
			this && this.setState({ posts: posts });
            console.log("delete Post")
console.log(data[i])

			await deletePost(data[i]);
			toast.success("Post Deleted!")

			this.setState(event => {
				const selectedPort = event.checkedFields;
				const falseIndex = selectedPort.indexOf(data[i]);
				i--;
				return selectedPort.splice(falseIndex, 1);
			})
		}
	
	};

	// handleChange = ({ currentTarget: input }) => {
	// 	const topicData = { ...this.state.topicData };
	// 	topicData[input.name] = input.value;
	// 	this.setState({ topicData });
	// };


    //not needed
	// doSubmit = async (e) => {
	// 	e.preventDefault();
	// 	console.log("Posts form data: ", this.state.topicData);
	// 	try {
	// 		await savetopic(this.state.topicData);
	// 	} catch (err) {
	// 		if (err) {
	// 			console.log("Error: ", err);
	// 		}
	// 	}
	// 	this.toggle();
	// };

	render() {
		const { length: count } = this.state.posts;
		const { pageSize, currentPage, sortColumn, searchQuery,checkedFields } = this.state;
		//if (count === 0) return <p>No data available</p>;

		const { data: posts } = this.getDataPgnation();
console.log(posts)
		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item">
						<Link to="/">Posts</Link>
					</li>
					<li className="breadcrumb-item active">Posts Tables</li>
				</ol>
				<h1 className="page-header">Posts </h1>
				<Panel>
					<PanelHeader>Posts Management</PanelHeader>

					<React.Fragment>
						<ToastContainer />
						<div className="toolbar" style={toolbarStyles}>
						    <Icon
							to="/clinic/Posts/new"
							title="add topic"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={newIcon}
							/>
                            <Icon
							to={checkedFields ? `/clinic/Posts/${checkedFields[0]}` : "/clinic/Posts/"}
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
							to="/clinic/Posts/"
							title="Excel"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={xlsIcon}
							/>
							<Icon
							to="/clinic/Posts/"
							title="CSV"
							btnStyle={btnStyles}
                            iconStyle={iconStyles}
                            icon={csvIcon}
							/>
                            <Icon
							to="/clinic/Posts/"
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

							{posts?<PostsTable
								Posts={posts}
								
								onSort={this.handleSort}
								sortColumn={sortColumn}
								handleCheckboxChange={this.handleCheckboxChange}
							/>
							:<div>meryeeem</div>
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
export default PostsTableData;