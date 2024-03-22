import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Panel,
  PanelHeader,
  PanelBody,
} from "./../../components/panel/panel.jsx";
import TextField from "@material-ui/core/TextField";

import FormControl from '@mui/material/FormControl';

import {getreqForAppointments} from "./../../services/reqforappointments";
import { getDoctors } from "./../../services/doctors";
import { getClinics } from "./../../services/clinics";
import { getPatients } from "./../../services/patients";
import jjj from "./../../services/patients";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
// import ReqforappointmentsTable from "../../components/reqForAppointmentsTable";
import ReqforappointmentsTable from "../../components/reqForAppointmentsTable";
// import ReqforappointmentsTable from "../../components/ReqforappointmentsTable.jsx";
import SearchBox from "./../../common/searchBox";
import _, { get, identity } from "lodash";
import http from "./../../services/httpService";
import { apiUrl } from "./../../config/config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons imports
import newIcon from "../../assets/Icons/new.svg";
import editIcon from "../../assets/Icons/edit.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";
import shareIcon from "../../assets/Icons/sharing.svg";
import ReactToPdf from "react-to-pdf";
import { data } from "jquery";
import { isConstructorDeclaration } from "typescript";

class Reqforappointment extends Component {

  appointmentTypeOptions = [
    { value: "clinic", label: "At Clinic" },
    { value: "home", label: "At home" },
    { value: "phone", label: "Telephone" },
    { value: "video", label: "Video" },
  ]
  appointmentStatusOptions = [
    { value: "active", label: "Active" },
    { value: "approved", label: "Approved" },
    { value: "canceled", label: "Canceled" },
  ];
  sessionTypeOptions = [
    { value: "intake", label: "Intake (new title)" },
    { value: "follow", label: "Follow" },
  ];
  doctordata = [];
  patientdata = [];
  clinicdata = [];


  constructor(props) {
    super(props);
    this.state = {
      reqforappointments: [],
      pageSize: 10,
      currentPage: 1,
      sortColumn: { path: "title", order: "asc" },
      searchQuery: "",
      errors: {},
      checkedFields: [],
      isOpen: "false",



    };

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleAllCheckboxChange = this.handleAllCheckboxChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.pdfRef = React.createRef();
  }

  async componentDidMount() {
		const { data } = await getreqForAppointments();
		console.log(data);
    data.map((data) => {
      return { ...data, isChecked: false };
    });
    let modifiedData = data.filter((data)=>{ return data.status !== "approved"})
		this.setState({ reqforappointments: modifiedData });
	}



  handleInputChange = (e) => {


    this.setState({ [e.target.id]: e.target.value });
    console.log(this.state);

  }
  





  // delete request for appointments
  handleDelete = async (reqforappointment) => {
    const originalreqforappointments = this.state.reqforappointments;
    const reqforappointments = this.state.reqforappointments.filter(
      (reqforappointment) => reqforappointment._id !== reqforappointment._id
    );
    this.setState({ reqforappointments });
    try {
      await http.delete(
        apiUrl + "/reqforappointments/" + reqforappointment._id
      );
    } catch (ex) {
      //ex.request
      //ex.response
      if (ex.response && ex.response === 404) {
        alert("already deleted");
      }



    }
  };

  // delete multiple requests for appointments
  handleMassDelete = (CheckedRequests) => {
    const originalRequests = this.state.reqforappointments;
    CheckedRequests.map(async (request) => {
      const requests = this.state.reqforappointments.filter(
        (Request) => Request._id !== request
      );
      this.setState({ reqforappointments: requests });
      try {
        await http.delete(apiUrl + "/reqforappointments/" + request);
      } catch (ex) {
        if (ex.response && ex.response === 404) {
          alert("already deleted");
        }

        this.setState({ reqforappointment: originalRequests });
      }

    });
  };

  handleAllCheckboxChange = ({ target: { checked, value } }) => {
    if (checked) {
      const Fields = [...this.state.checkedFields];
      const newreqforappointments = this.state.reqforappointments.map((reqforappointment) => {
        Fields.push(reqforappointment._id);
        return { ...reqforappointment, isChecked: checked };
      });
      this.setState({ checkedFields: Fields, reqforappointments: newreqforappointments });
    } else {
      const Fields = [];
      const newreqforappointments = this.state.reqforappointments.map((reqforappointment) => {
        return { ...reqforappointment, isChecked: checked };
      });
      this.setState({ checkedFields: Fields, reqforappointments: newreqforappointments });
    }
    console.log("checked users: ", this.state.checkedFields);
  };

   //check box change
   handleCheckboxChange = ({ target: { checked, value } }) => {
    if (checked) {
      const Fields = [...this.state.checkedFields, value];
      const newreqforappointments = this.state.reqforappointments.map((reqforappointment) => {
        if (value === reqforappointment._id) {
          return { ...reqforappointment, isChecked: checked };
        }
        return { ...reqforappointment };
      });
      this.setState({ checkedFields: Fields, reqforappointments: newreqforappointments });
    } else {
      const Fields = [...this.state.checkedFields];
      const newreqforappointments = this.state.reqforappointments.map((reqforappointment) => {
        if (value === reqforappointment._id) {
          return { ...reqforappointment, isChecked: checked };
        }
        return { ...reqforappointment };
      });
      this.setState({
        checkedFields: Fields.filter((e) => e !== value),
        reqforappointments: newreqforappointments,
      });
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
    let reqforappointments = this.state.reqforappointments;
    const {
      pageSize,
      currentPage,

      sortColumn,
      searchQuery,
    } = this.state;
    //filter maybe next time
    let filtered = reqforappointments;
    //  if (searchQuery) {

    //     filtered = reqforappointments.filter(
    //       (el) =>
    //         el.title.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
    //         el.reqforappointmentname
    //           .toLowerCase()
    //           .startsWith(searchQuery.toLowerCase())
    //     );
    //   }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const reqforappointment = paginate(sorted, currentPage, pageSize);
    return { data: reqforappointment };
  };


  render() {
    const { length: count } = this.state.reqforappointments;
    const { pageSize, currentPage, sortColumn, searchQuery, checkedFields } =
      this.state;
    // if (count === 0) return <p>No data available</p>;

    const { data: reqforappointments } = this.getDataPgnation();


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
        <h1 className="page-header">Requests for Appointments </h1>
        <Panel>
          <PanelHeader>Requests for Appointments Management</PanelHeader>

          <React.Fragment>
            <ToastContainer />
            <div className="toolbar" style={toolbarStyles}>
              {/* Modal here for add form */}
              <Button
                className="btn btn-default active m-r-5 m-b-5"
                title="add Request for Appointment"
                style={btnStyles}

                // data-toggle="modal" data-target="#myModal"

              >
                
								<Link to="/clinic/reqforappointments/new">
									<img style={iconStyles} src={newIcon} />
								</Link>
							</Button>

              <button
                className="btn btn-default active m-r-5 m-b-5"
                title="edit Request for Appointment"
                style={btnStyles}
              >
                {" "}
                <Link


                  to={
                    checkedFields
                      ? `/clinic/reqforappointments/${checkedFields[0]}`
                      : "/clinic/reqforappointments/"

                  }
                >
                  <img style={iconStyles} src={editIcon} />
                </Link>{" "}

              </button>
              {/*  delete button */}
              <button
                className="btn btn-default active m-r-5 m-b-5"
                title="delete Request for Appointment"
                style={btnStyles}
                onClick={() => this.handleMassDelete(checkedFields)}
              >

                <img
                  style={{ width: "25px", height: "25px" }}
                  src={trashIcon}
                />
              </button>
              <button
                className="btn btn-default active m-r-5 m-b-5"
                title="Excel"
                style={btnStyles}
              >
                {" "}
                <Link to="/clinic/reqforappointments/">
                  <img style={iconStyles} src={xlsIcon} />
                </Link>{" "}
              </button>

              <button
                className="btn btn-default active m-r-5 m-b-5"
                title="csv"
                style={btnStyles}
              >
                {" "}
                <Link to="/clinic/reqforappointments/">
                  <img style={iconStyles} src={csvIcon} />
                </Link>{" "}
              </button>
              <button
                className="btn btn-default active m-r-5 m-b-5"
                title="PDF"
                style={btnStyles}
              >
                {" "}
                <Link to="/clinic/reqforappointments/">
                  <ReactToPdf targetRef={this.pdfRef}>
                    {({ toPdf }) => (
                      <div onClick={toPdf}>
                        <img style={iconStyles} src={pdfIcon} />
                      </div>
                    )}
                  </ReactToPdf>
                </Link>{" "}
              </button>
              <button
                className="btn btn-default active m-r-5 m-b-5"
                title="Share to other"
                style={btnStyles}
              >
                {" "}
                <Link to="/clinic/reqforappointments/">
                  <img style={iconStyles} src={shareIcon} />
                </Link>{" "}
              </button>
            </div>
            <div className="table-responsive">
              {/* <div   class="col-xs-4">
              <TextField  value={this.state.searchQuery} onChange={this.onChangeSearchTitle} 
              
                type="text"
                class="form-control"
                placeholder="Search by Complaint Title"/>
              </div> */}

              <div
                className="page-header float-xl-left"
                style={
                  ({ marginBottom: 5 }, { marginLeft: 20 }, { marginTop: 5 })
                }
              >
                {count} entries
              </div>
              <div ref={this.pdfRef}>
                <ReqforappointmentsTable
                  reqforappointments={reqforappointments}

                  onDelete={this.handleDelete}
                  onSort={this.handleSort}
                  sortColumn={sortColumn}
                  handleCheckboxChange={this.handleCheckboxChange}
                  handleAllCheckboxChange={this.handleAllCheckboxChange}
                />
              </div>
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

export default Reqforappointment;
