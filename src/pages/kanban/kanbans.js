import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Panel,
  PanelHeader,
  PanelBody,
} from "./../../components/panel/panel.jsx";
// import {
//   UncontrolledButtonDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from "reactstrap";
// import axios from "axios";
import { getKanbans } from "./../../services/kanbans";
import "bootstrap/dist/css/bootstrap.min.css";
//import FloatSubMenu from './../../components/float-sub-menu/float-sub-menu';
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import KanbansTable from "../../components/kanbansTable.jsx";
import SearchBox from "./../../common/searchBox";
import _ from "lodash";
import http from "./../../services/httpService";
import { apiUrl } from "./../../config/config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import {
//   Col,
//   Button,
//   Form,
//   FormGroup,
//   Input,
//   Modal,
//   Label,
//   ModalHeader,
//   ModalBody,
//   Row,
// } from "reactstrap";

// Icons imports
import newIcon from "../../assets/Icons/new.svg";
import editIcon from "../../assets/Icons/edit.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";
import sharingIcon from "../../assets/Icons/sharing.svg";

import Icon from "./../../common/icon";

class KanbansDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kanbans: [],
      checkedkanbans: [],
      pageSize: 10,
      currentPage: 1,
      sortColumn: { path: "title", order: "asc" },
      searchQuery: "",
      errors: {},
    };
  }

  async componentDidMount() {
    const data = await getKanbans();
    const kanbansWithPartNames=data.data ?.map((kanban) => {
      kanban.participants = kanban?.participants?.map((part) => {
            return `${part?.username} `;
      });
      return kanban;
    });
    this.setState({kanbans:kanbansWithPartNames})
  }

  handleDelete = (user) => {
    console.log(user);
    const kanbans = this.state.kanbans.filter((el) => el._id !== user._id);
    this.setState({ kanbans: kanbans });
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
      this.setState(({ checkedkanbans }) => ({
        checkedkanbans: [...checkedkanbans, value],
      }));
    } else {
      this.setState(({ checkedkanbans }) => ({
        checkedkanbans: checkedkanbans.filter((e) => e !== value),
      }));
    }
    console.log("checked kanbans: ", this.state.checkedkanbans);
  };

  handleMassDelete = (CheckedKanbans) => {
    const originalKanbans = this.state.kanbans;
    CheckedKanbans.map(async (kanban) => {
      try {
        await http.delete(apiUrl + "/kanbans/" + kanban);
        const kanbans = this.state.kanbans.filter(
          (Kanban) => Kanban._id !== kanban
        );
        this.setState({ kanbans });
      } catch (ex) {
        if (ex.response && ex.response === 404) {
          alert("already deleted");
        }

        this.setState({ kanbans: originalKanbans });
      }
      console.log("Kanbans: ", this.state.kanbans);
    });
  };

  getDataPgnation = () => {
    const {
      pageSize,
      currentPage,
      kanbans: Kanbans,
      sortColumn,
      searchQuery,
    } = this.state;
    //
    //filter maybe next time
    let filtered = Kanbans;
    if (searchQuery) {
      console.log(searchQuery);
      filtered = Kanbans.filter(
        (el) =>
          el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          el.userID.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    //
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const kanbans = paginate(sorted, currentPage, pageSize);
    return { data: kanbans };
  };

  render() {
    const { length: count } = this.state.kanbans;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    // if(count === 0)  return "<p>No data available</p>";

    const { data: kanbans } = this.getDataPgnation();

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/kanban/kanbans">Kanbans</Link>
          </li>
          <li className="breadcrumb-item active">Data Tables</li>
        </ol>
        <h1 className="page-header">Kanbans </h1>
        <Panel>
          <PanelHeader>Kanbans Management</PanelHeader>

          <React.Fragment>
            <ToastContainer />
            <div className="toolbar" style={toolbarStyles}>
              <Icon
                to="/kanban/kanbans/new"
                title="Add kanban"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={newIcon}
              />
              <Icon
                to={
                  this.state.checkedkanbans
                    ? `/kanban/kanbans/${this.state.checkedkanbans[0]}`
                    : "/kanban/kanbans/"
                }
                title="Edit kanban"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={editIcon}
              />
              <Icon
                to="/kanban/kanbans/"
                handleClick={() =>
                  this.handleMassDelete(this.state.checkedkanbans)
                }
                title="Delete kanban"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={trashIcon}
              />
              <Icon
                to="/kanban/kanbans/"
                title="Xlsx kanban"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={xlsIcon}
              />
              <Icon
                to="/kanban/kanbans/"
                title="CSV kanban"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={csvIcon}
              />
              <Icon
                to="/kanban/kanbans/"
                title="pdf kanban"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={pdfIcon}
              />
              <Icon
                to="/kanban/kanbans/"
                title="share kanban"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={sharingIcon}
              />
            </div>
            <div className="table-responsive">
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              <p
                className="page-header float-xl-left"
                style={
                  ({ marginBottom: 5 }, { marginLeft: 20 }, { marginTop: 5 })
                }
              >
                {count} entries
              </p>

              <KanbansTable
                kanbans={this.state.kanbans}
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

export default KanbansDataTable;
