import React, { Component } from "react";
//import { Link } from 'react-router-dom';
import { Link } from "react-router-dom";

import {
  Panel,
  PanelBody,
  PanelHeader,
} from "./../../components/panel/panel.jsx";
//import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { getPhysicalConditions } from "./../../services/physicalconditions";
//import FloatSubMenu from './../../components/float-sub-menu/float-sub-menu';
import _ from "lodash";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import avatar from "../../assets/images/user-12.jpg";
import Pagination from "../../common/pagination";
import MainPhysicalConditionsTable from "../../components/mainPhysicalconditionsTable";
import { paginate } from "../../utils/paginate";
import Icon from "./../../common/icon";
import SearchBox from "./../../common/searchBox";
import { apiUrl } from "./../../config/config.json";
import http from "./../../services/httpService";

// Icons imports
import csvIcon from "../../assets/Icons/csv.svg";
import editIcon from "../../assets/Icons/edit.svg";
import newIcon from "../../assets/Icons/new.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import xlsIcon from "../../assets/Icons/xls.svg";

class PhysicalConditionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      physicalConditions: [],
      allPhysicalConditions: [],
      pageSize: 10,
      currentPage: 1,
      sortColumn: { path: "title", order: "asc" },
      searchQuery: "",
      checkedFields: [],
      errors: {},
      isPatientInfoShow: false,
    };
  }

  async componentDidMount() {
    const { data } = await getPhysicalConditions();
    console.log("Data: ", data);

    const conditions = [];
    data.map((item) => {
      if (
        item.doctorNo?.user._id &&
        item.clinicNo?.user._id &&
        item.patientNo?.user._id
      ) {
        conditions.push({
          ...item,
          isChecked: false,
        });
      }
    });

    this.setState({
      allPhysicalConditions: conditions,
    });
    console.log("Conditions in c: ", conditions);

    var flags = {};
    var uniquePatients = [];
    console.log("after all data", data);
    let sortedData = _.reverse(data);
    sortedData.filter((item) => {
      if (
        !flags[item.patientNo?.user._id] &&
        item.doctorNo?.user._id &&
        item.clinicNo?.user._id &&
        item.patientNo?.user._id
      ) {
        flags[item.patientNo?.user._id] = true;
        uniquePatients.push({
          ...item,
          isVisible: true,
          showPatientInfo: false,
          isChecked: false,
        });
      }
    });
    console.log("Collection:", uniquePatients);
    this.setState({
      physicalConditions: uniquePatients,
      count: uniquePatients.length,
    });
  }

  // delete multiple physicalConditions
  handleMassDelete = (CheckedPhysicalConditions) => {
    const originalAllPhysicalConditions = this.state.allPhysicalConditions;
    const originalPhysicalConditions = this.state.physicalConditions;
    CheckedPhysicalConditions.map(async (pc) => {
      const allPhysicalConditions = this.state.allPhysicalConditions.filter(
        (PhysicalCondition) => PhysicalCondition._id !== pc
      );
      const physicalConditions = this.state.physicalConditions.filter(
        (PhysicalCondition) => PhysicalCondition._id !== pc
      );
      this.setState({ allPhysicalConditions, physicalConditions });
      try {
        await http.delete(apiUrl + "/physicalConditions/" + pc);
      } catch (ex) {
        if (ex.response && ex.response === 404) {
          alert("already deleted");
        }

        this.setState({
          allPhysicalConditions: originalAllPhysicalConditions,
          physicalConditions: originalPhysicalConditions,
        });
      }
      console.log("physicalConditions: ", this.state.allPhysicalConditions);
    });
  };

  handleCheckboxChange = ({ target: { checked, value } }) => {
    if (checked) {
      const Fields = [...this.state.checkedFields, value];
      const newAllPhysicalConditions = this.state.allPhysicalConditions.map(
        (item) => {
          if (value === item._id) {
            return { ...item, isChecked: checked };
          }
          return { ...item };
        }
      );
      this.setState({
        checkedFields: Fields,
        allPhysicalConditions: newAllPhysicalConditions,
      });
    } else {
      const Fields = [...this.state.checkedFields];
      const newAllPhysicalConditions = this.state.allPhysicalConditions.map(
        (item) => {
          if (value === item._id) {
            return { ...item, isChecked: checked };
          }
          return { ...item };
        }
      );
      this.setState({
        checkedFields: Fields.filter((e) => e !== value),
        allPhysicalConditions: newAllPhysicalConditions,
      });
    }
  };

  handleALlPatientsCheckboxChange = (checked, value) => {
    if (checked) {
      const Fields = [...this.state.checkedFields];
      const newAllPhysicalConditions = this.state.allPhysicalConditions.map(
        (item) => {
          if (item.patientNo.user._id === value) {
            Fields.push(item._id);
            return {
              ...item,
              isChecked: checked,
            };
          } else {
            return item;
          }
        }
      );
      const newPhysicalConditions = this.state.physicalConditions.map(
        (item) => {
          if (item.patientNo.user._id === value) {
            return {
              ...item,
              isChecked: checked,
            };
          } else {
            return item;
          }
        }
      );
      this.setState({
        checkedFields: Fields,
        allPhysicalConditions: newAllPhysicalConditions,
        physicalConditions: newPhysicalConditions,
      });
    } else {
      const Fields = [...this.state.checkedFields];
      const newAllPhysicalConditions = this.state.allPhysicalConditions.map(
        (item) => {
          if (item.patientNo.user._id === value) {
            let index = Fields.indexOf(item._id);
            if (index > -1) {
              Fields.splice(index, 1);
            }
            return {
              ...item,
              isChecked: checked,
            };
          } else {
            return item;
          }
        }
      );
      const newPhysicalConditions = this.state.physicalConditions.map(
        (item) => {
          if (item.patientNo.user._id === value) {
            return {
              ...item,
              isChecked: checked,
            };
          } else {
            return item;
          }
        }
      );
      this.setState({
        checkedFields: Fields,
        allPhysicalConditions: newAllPhysicalConditions,
        physicalConditions: newPhysicalConditions,
      });
    }
  };

  selectItem = (e) => {
    const { checked } = e.target;
    const { allPhysicalConditions } = this.state;
    const collection = [];

    if (checked) {
      allPhysicalConditions.map((item) => {
        collection.push(item._id);
        return {
          ...item,
          isChecked: true,
        };
      });
    }

    this.setState({
      checkedFields: collection,
      allPhysicalConditions: allPhysicalConditions,
    });
  };

  viewSession = (physicalCondition) => {
    let newPhysicalConditions = this.state.physicalConditions.map((item) => {
      if (physicalCondition._id === item._id) {
        return { ...item, showPatientInfo: !item.showPatientInfo };
      } else {
        return { ...item, isVisible: !item.isVisible };
      }
    });
    if (physicalCondition.showPatientInfo) {
      this.setState({
        physicalConditions: newPhysicalConditions,
        count: this.state.physicalConditions.length,
        isPatientInfoShow: false,
      });
    } else {
      let selectedPatientSessions = this.state.allPhysicalConditions?.filter(
        (item) => {
          return (
            item?.patientNo.user._id == physicalCondition?.patientNo.user._id
          );
        }
      );
      this.setState({
        physicalConditions: newPhysicalConditions,
        count: selectedPatientSessions.length,
        isPatientInfoShow: true,
      });
    }
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
      physicalConditions: PhysicalConditions,
      sortColumn,
      searchQuery,
    } = this.state;
    //filter maybe next time
    let filtered = PhysicalConditions;
    if (searchQuery) {
      console.log(searchQuery);
      filtered = PhysicalConditions.filter(
        (el) =>
          el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          el.physicalConditionname
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase())
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const physicalConditions = paginate(sorted, currentPage, pageSize);
    return { data: physicalConditions };
  };

  render() {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      checkedFields,
      count,
      isPatientInfoShow,
    } = this.state;
    //if(count === 0)  return "<p>No data available</p>";
    const { data: physicalConditions } = this.getDataPgnation();

    return (
      <div>
        {console.log("Checked fields: ", checkedFields)}
        <ol className="breadcrumb float-xl-right">
          <ol className="breadcrumb float-xl-right">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/clinic/physicalconditions">Physical contitions</Link>
            </li>
            <li className="breadcrumb-item active">
              Add/Edit PhysicalCondition
            </li>
          </ol>
        </ol>
        <h1 className="page-header">PhysicalConditions </h1>
        <Panel>
          <PanelHeader>PhysicalConditions Management</PanelHeader>

          <React.Fragment>
            <ToastContainer />
            {physicalConditions &&
              physicalConditions.map((physicalCondition) => {
                const {
                  contactName,
                  dateBirth,
                  gender,
                  imageSrc,
                  prefix,
                  phones,
                } = physicalCondition.patientNo.user;
                return (
                  physicalCondition.showPatientInfo && (
                    <div
                      style={{ width: "90%", marginLeft: "5%" }}
                      className="row mt-4 row-no-margin"
                    >
                      <div className="col-12 col-sm-2">
                        <img
                          src={imageSrc ? imageSrc : avatar}
                          style={{
                            marginBottom: "1.5rem",
                            height: "140px",
                            width: "140px",
                          }}
                        />
                      </div>
                      <div className="col-12 col-sm-10">
                        <div className="row">
                          <div className="col-12 col-sm-4">
                            <div className="form-group">
                              <label>
                                <b>Prefix</b>
                              </label>
                              <input
                                type="text"
                                disabled
                                className="form-control"
                                placeholder="Prefix"
                                name="prefix"
                                value={prefix}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-4">
                            <div className="form-group">
                              <label>
                                <b>First Name</b>
                              </label>
                              <input
                                type="text"
                                disabled
                                className="form-control"
                                name="firstName"
                                placeholder="First Name"
                                value={contactName.first}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-4">
                            <div className="form-group">
                              <label>
                                <b>Last Name</b>
                              </label>
                              <input
                                disabled
                                type="text"
                                className="form-control"
                                name="lastName"
                                placeholder="Last Name"
                                value={contactName.last}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-4">
                            <div className="form-group">
                              <div className="d-flex flex-column">
                                <label>
                                  <b>Date of Birth *</b>
                                </label>
                                <input
                                  disabled
                                  type="text"
                                  className="form-control"
                                  name="lastName"
                                  placeholder="Date of birth"
                                  value={new Date(dateBirth).toDateString()}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-4">
                            <div className="form-group">
                              <label>
                                <b>Mobile Phone</b>
                              </label>
                              <input
                                disabled
                                type="text"
                                className="form-control"
                                name="mobilePhone"
                                placeholder="Mobile Phone"
                                value={phones.phone}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-4">
                            <div className="form-group">
                              <label>
                                <b>Gender</b>
                              </label>
                              <input
                                disabled
                                type="text"
                                className="form-control"
                                name="gender"
                                placeholder="Gender"
                                value={gender}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            <div className="toolbar" style={toolbarStyles}>
              <Icon
                to="/clinic/physicalconditions/new"
                title="add physical condition"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={newIcon}
              />
              <Icon
                to={
                  checkedFields.length > 0
                    ? `/clinic/physicalconditions/${checkedFields[0]}`
                    : "/clinic/physicalconditions/"
                }
                title="Edit physical condition"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={editIcon}
              />
              <button
                className="btn btn-default active m-r-5 m-b-5"
                title="delete"
                style={btnStyles}
                onClick={() => this.handleMassDelete(checkedFields)}
              >
                {" "}
                {/* <Link to="/accounting/services/del"> */}
                <img
                  style={{ width: "25px", height: "25px" }}
                  src={trashIcon}
                />
                {/* </Link>{" "} */}
              </button>
              <Icon
                to="/clinic/physicalconditions"
                title="xls"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={xlsIcon}
              />

              <Icon
                to="/clinic/physicalconditions"
                title="csv"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={csvIcon}
              />
              <Icon
                to="/clinic/physicalconditions"
                title="pdf"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={pdfIcon}
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

              <MainPhysicalConditionsTable
                selectItem={this.selectItem}
                physicalConditions={physicalConditions}
                checkedFields={checkedFields}
                handleALlPatientsCheckboxChange={
                  this.handleALlPatientsCheckboxChange
                }
                viewSession={this.viewSession}
                handleSort={this.handleSort}
                sortColumn={sortColumn}
                handleCheckboxChange={this.handleCheckboxChange}
                allPhysicalConditions={this.state.allPhysicalConditions}
                isPatientInfoShow={isPatientInfoShow}
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

export default PhysicalConditionTable;
