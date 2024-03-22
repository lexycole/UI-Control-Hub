import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";
import React, { Component } from "react";
//import { Link } from 'react-router-dom';
import { Link, NavLink } from "react-router-dom";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import banIcon from "../../assets/Icons/ban.svg";
import copy2clipboardIcon from "../../assets/Icons/copy2clipboard.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import editIcon from "../../assets/Icons/edit.svg";
import exportIcon from "../../assets/Icons/export.svg";
import importIcon from "../../assets/Icons/import.svg";
import lockIcon from "../../assets/Icons/lock.svg";
//icons
import newIcon from "../../assets/Icons/new.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";
import printIcon from "../../assets/Icons/printer-xxl.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
//import FloatSubMenu from './../../components/float-sub-menu/float-sub-menu';
import Pagination from "../../common/pagination";
import LabelsTable from "../../components/labelsTable.jsx";
import { getLabels } from "../../services/labels";
import { paginate } from "../../utils/paginate";
import SearchBox from "./../../common/searchBox";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "./../../components/panel/panel.jsx";
import { apiUrl } from "./../../config/config.json";
import http from "./../../services/httpService";

class LabelTableData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      pageSize: 10,
      currentPage: 1,
      sortColumn: { path: "title", order: "asc" },
      searchQuery: "",
      errors: {},
      checkedFields: [],
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    const { data } = await getLabels();
    console.log(data);
    this.setState({ labels: data });
  }

  //check box change
  handleCheckboxChange = ({ target: { checked, value } }) => {
    if (checked) {
      const checkedFields = [...this.state.checkedFields, value];
      this.setState({ checkedFields });
    } else {
      const checkedFields = [...this.state.checkedFields];
      this.setState({
        checkedFields: checkedFields.filter((e) => e !== value),
      });
    }
  };

  handleMassDelete = (CheckedFields) => {
    const originalLabels = this.state.labels;
    CheckedFields.map(async (label) => {
      const labels = this.state.labels.filter((Label) => Label._id !== label);

      try {
        await http.delete(apiUrl + "/labels/" + label);
        this.setState({ labels });
      } catch (ex) {
        if (ex.response && ex.response === 404) {
          alert("already deleted");
        }

        this.setState({ labels: originalLabels });
      }
    });
  };

  handleDelete = async (label) => {
    ///delete
    const originalLabels = this.state.labels;
    const labels = this.state.labels.filter((Label) => Label._id !== label._id);
    this.setState({ labels });
    try {
      await http.delete(apiUrl + "/labels/" + label._id);
    } catch (ex) {
      //ex.request
      //ex.response

      if (ex.response && ex.response === 404) {
        alert("already deleted");
      }

      this.setState({ labels: originalLabels });
    }
    ////
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
    const {
      pageSize,
      currentPage,
      labels: Labels,
      sortColumn,
      searchQuery,
    } = this.state;
    //
    //filter maybe next time
    let filtered = Labels;
    if (searchQuery) {
      console.log(searchQuery);
      filtered = Labels.filter(
        (el) =>
          el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          el.labelname.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const labels = paginate(sorted, currentPage, pageSize);
    return { data: labels };
  };

  render() {
    const { length: count } = this.state.labels;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    // if (count === 0) return "<p>No data available</p>";

    const { data: labels } = this.getDataPgnation();

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
        <h1 className="page-header">Labels </h1>
        <Panel>
          <PanelHeader>Labels Management</PanelHeader>

          <React.Fragment>
            <ToastContainer />

            <div className="toolbar" style={toolbarStyles}>
              <button
                className="btn btn-default active m-r-5 m-b-5"
                title="add Label"
                style={btnStyles}
              >
                {" "}
                <Link to="/label/labels/new/">
                  <img style={iconStyles} src={newIcon} />
                </Link>{" "}
              </button>
              <NavLink
                className="btn btn-default active m-r-5 m-b-5"
                title="edit label"
                style={btnStyles}
                to={
                  this.state.checkedFields
                    ? `/label/labels/${this.state.checkedFields[0]}`
                    : "/label/labels/"
                }
              >
                {/* {" "}
        <Link
          to={
            this.state.checkedFields
              ? `/clinic/users/${this.state.checkedFields[0]}`
              : "/clinic/users/"
          }
        > */}
                <img style={iconStyles} src={editIcon} />
                {/* </Link>{" "} */}
              </NavLink>
              <button
                className="btn btn-default active m-r-5 m-b-5"
                title="delete label"
                style={btnStyles}
                onClick={() => this.handleMassDelete(this.state.checkedFields)}
              >
                {" "}
                {/* <Link to="/clinic/users/del"> */}
                <img
                  style={{ width: "25px", height: "25px" }}
                  src={trashIcon}
                />
                {/* </Link>{" "} */}
              </button>
              <button
                className="btn btn-default active m-r-5 m-b-5"
                title="csv"
                style={btnStyles}
                value="csv"
                onClick={this.exportExcel}
              >
                <img style={iconStyles} src={csvIcon} />
              </button>

              <button
                className="btn btn-default active m-r-5 m-b-5"
                title="pdf"
                style={btnStyles}
                onClick={this.exportPdf}
              >
                <img style={iconStyles} src={pdfIcon} />
              </button>

              <button
                className="btn btn-default active m-r-5 m-b-5"
                title="excel"
                style={btnStyles}
                value="xlsx"
                onClick={this.exportExcel}
              >
                <img style={iconStyles} src={xlsIcon} />
              </button>

              <ReactToPrint content={() => this.tableRef}>
                <PrintContextConsumer>
                  {({ handlePrint }) => (
                    <button
                      className="btn btn-default active m-r-5 m-b-5"
                      title="print"
                      style={btnStyles}
                      onClick={handlePrint}
                    >
                      <img style={iconStyles} src={printIcon} />
                    </button>
                  )}
                </PrintContextConsumer>
              </ReactToPrint>

              <Dropdown
                as="button"
                className="btn btn-default active m-r-5 m-b-5"
                isOpen={this.state.exportDropdownOpen}
                toggle={this.toggleExport}
                style={btnStyles}
              >
                <DropdownToggle
                  caret
                  title="export"
                  style={{
                    padding: 0,
                    margin: 0,
                    border: 0,
                    background: "inherit",
                  }}
                >
                  <img style={iconStyles} src={exportIcon} />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem value="xlsx" onClick={this.exportExcel}>
                    <img style={iconStyles} src={xlsIcon} /> Excel
                  </DropdownItem>
                  <DropdownItem value="csv" onClick={this.exportExcel}>
                    <img style={iconStyles} src={csvIcon} /> CSV
                  </DropdownItem>
                  <DropdownItem onClick={this.exportPdf}>
                    <img style={iconStyles} src={pdfIcon} />
                    PDF
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <button
                className="btn btn-default active m-r-5 m-b-5"
                title="import"
                style={btnStyles}
              >
                {" "}
                <Link to="/label/labels/">
                  <img style={iconStyles} src={importIcon} />
                </Link>{" "}
              </button>

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

              <LabelsTable
                labels={labels}
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

const CustomDropdownItem = ({ path, order, handleSort, icon, label }) => {
  return (
    <DropdownItem
      onClick={() =>
        handleSort({
          path,
          order,
        })
      }
    >
      {/* <img src={icon} alt={label} style={{ height: "20px" }} /> */}
      <label>
        <input
          type="checkbox"
          style={{
            width: "15px",
            height: "15px",
            marginTop: "0.4rem",
            borderRadius: 0,
          }}
        />{" "}
        {label}
      </label>
    </DropdownItem>
  );
};

export default LabelTableData;
