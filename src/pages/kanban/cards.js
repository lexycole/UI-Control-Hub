import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Panel, PanelHeader, PanelBody } from "./../../components/panel/panel.jsx";
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { getCards } from "./../../services/cards";
import "bootstrap/dist/css/bootstrap.min.css";
//import FloatSubMenu from './../../components/float-sub-menu/float-sub-menu';
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import CardTable from "../../components/cardsTable.jsx";
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

class CardsTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: [],
			pageSize: 10,
			currentPage: 1,
			checkedCards: [],
			sortColumn: { path: "title", order: "asc" },
			searchQuery: "",
			errors: {},
		};
	}

	async componentDidMount() {
		const data = await getCards();
		console.log(data.data);
		this.setState({ cards: data.data });
	}

	handleDelete = (user) => {
		console.log(user);
		const cards = this.state.cards.filter((el) => el._id !== user._id);
		this.setState({ cards: cards });
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
			this.setState(({ checkedCards }) => ({
				checkedCards: [...checkedCards, value],
			}));
		} else {
			this.setState(({ checkedCards }) => ({
				checkedCards: checkedCards.filter((e) => e !== value),
			}));
		}
		console.log("checked cards: ", this.state.checkedCards);
	};

	handleMassDelete = (CheckedCards) => {
		const originalCards = this.state.cards;
		CheckedCards.map(async (card) => {
			try {
				await http.delete(apiUrl + "/cards/" + card);
				const cards = this.state.cards.filter((Card) => Card._id !== card);
				this.setState({ cards });
			} catch (ex) {
				if (ex.response && ex.response === 404) {
					alert("already deleted");
				}

				this.setState({ cards: originalCards });
			}
			console.log("Cards: ", this.state.cards);
		});
	};

	getDataPgnation = () => {
		const { pageSize, currentPage, cards: Cards, sortColumn, searchQuery } = this.state;
		//
		//filter maybe next time
		let filtered = Cards;
		if (searchQuery) {
			console.log(searchQuery);
			filtered = Cards.filter(
				(el) =>
					el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
					el.username.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		}

		//
		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const cards = paginate(sorted, currentPage, pageSize);
		return { data: cards };
	};

	render() {
		const { length: count } = this.state.cards;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
		// if(count === 0)  return "<p>No data available</p>";

		const { data: cards } = this.getDataPgnation();

		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item">
						<Link to="/kanban/cards">cards</Link>
					</li>
					<li className="breadcrumb-item active">Listkanbans</li>
				</ol>
				<h1 className="page-header">Cards </h1>
				<Panel>
					<PanelHeader>Cards Management</PanelHeader>

					<React.Fragment>
						<ToastContainer />
						<div className="toolbar" style={toolbarStyles}>
							<Icon
								to="/kanban/cards/new"
								title="Add Card"
								btnStyle={btnStyles}
								iconStyle={iconStyles}
								icon={newIcon}
							/>
							<Icon
								to={this.state.checkedCards ? `/kanban/cards/${this.state.checkedCards[0]}` : "/kanban/cards/"}
								title="Edit Card"
								btnStyle={btnStyles}
								iconStyle={iconStyles}
								icon={editIcon}
							/>
							<Icon
								to="/kanban/cards/"
								handleClick={() => this.handleMassDelete(this.state.checkedCards)}
								title="Delete card"
								btnStyle={btnStyles}
								iconStyle={iconStyles}
								icon={trashIcon}
							/>
							<Icon
								to="/kanban/cards/"
								title="Xlsx card"
								btnStyle={btnStyles}
								iconStyle={iconStyles}
								icon={xlsIcon}
							/>
							<Icon
								to="/kanban/cards/"
								title="CSV card"
								btnStyle={btnStyles}
								iconStyle={iconStyles}
								icon={csvIcon}
							/>

							<Icon
								to="/kanban/cards/"
								title="pdf card"
								btnStyle={btnStyles}
								iconStyle={iconStyles}
								icon={pdfIcon}
							/>

							<Icon
								to="/kanban/cards/"
								title="share card"
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

							<CardTable
								cards={cards}
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
								// handleCheckboxChange={this.handleCheckboxChange}
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

export default CardsTable;
