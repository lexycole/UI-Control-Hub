import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Panel,
  PanelHeader,
  PanelBody,
} from "./../../components/panel/panel.jsx";
import {
  getCOAs,
  deleteCOA,
  saveCOA,
} from "./../../services/coas";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import COAsTable from "../../components/coasTable.jsx";
import SearchBox from "./../../common/searchBox";
import _ from "lodash";
import http from "./../../services/httpService";
import { apiUrl } from "./../../config/config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  Label,
  ModalHeader,
  ModalBody,
  Row,
} from "reactstrap";
import ReusableTabNavs from "../ticketprofile/ReusableTabNavs";
import ReusableTab from "../ticketprofile/ReusableTab";
import { TabContent } from "reactstrap";
// Icons imports
import newIcon from "../../assets/Icons/new.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";
import archiveIcon from "../../assets/Icons/archive.svg";
import printerIcon from "../../assets/Icons/printer-xxl.svg";
import clipboardIcon from "../../assets/Icons/copy2clipboard.svg";
import importIcon from "../../assets/Icons/import.svg";
import { useTable } from "react-table";

const tabMenus = [
  { label: "Tab-view", background: "#2BD62E" },
  { label: "Tree-view", background: "#939993" },
];

function COAsTableData() {
  const data = React.useMemo(
    () => [
      
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Patient",
        accessor: "col1", // accessor is the "key" in the data
        sortable: true,
      },
      {
        Header: "Complaint",
        accessor: "col2",
        sortable: true,
      },
      {
        Header: "Date",
        accessor: "col3", // accessor is the "key" in the data
        sortable: true,
      },
      {
        Header: "Session",
        accessor: "col4",
        sortable: true,
      },
      {
        Header: "Practitioner",
        accessor: "col6", // accessor is the "key" in the data
        sortable: true,
      },
      {
        Header: "Clinic",
        accessor: "col7", // accessor is the "key" in the data
        sortable: true,
      },
      {
        Header: (
          <a            
            data-toggle="collapse"
            href="#multiCollapseExample1"
            role="button"
            aria-expanded="false"
            aria-controls="multiCollapseExample1"
          >
            View sessions
          </a>
        ),
        accessor: "col8",
        sortable: false,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const [activeTab, setActiveTab] = React.useState(1);
  const [entries, setEntries] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState("");

  const setActiveView = (n) => setActiveTab(n);

  const targetHeight = 34;

  const customStyles = {
    control: (styles) => ({
      ...styles,
      minHeight: "initial",
    }),

    option: (provided) => ({
      ...provided,
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 8px",
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
    }),
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="page-header text-center">Medical Files of Patients </h1>
      </div>
      <Panel>
        <PanelHeader>Chart of Accounting</PanelHeader>
        <React.Fragment>
          <ToastContainer />
          <div className="toolbar" style={toolbarStyles}>
            <button
              className="btn btn-default active m-r-5 m-b-5"
              title="Add COA"
              style={btnStyles}
            >
              {" "}
              <img style={{ width: "25px", height: "25px" }} src={newIcon} />
            </button>
		  
            <button
              className="btn btn-default active m-r-5 m-b-5"
              title="delete coa"
              style={btnStyles}
            >
              {" "}
              <img style={{ width: "25px", height: "25px" }} src={trashIcon} />
            </button>

            <button
              className="btn btn-default active m-r-5 m-b-5"
              title="csv"
              style={btnStyles}
            >
              {" "}
              <Link to="/accounting/coas/">
                <img style={iconStyles} src={csvIcon} />
              </Link>{" "}
            </button>

            <button
              className="btn btn-default active m-r-5 m-b-5"
              title="PDF"
              style={btnStyles}
            >
              {" "}
              <Link to="/accounting/coas/">
                <img style={iconStyles} src={pdfIcon} />
              </Link>{" "}
            </button>

            <button
              className="btn btn-default active m-r-5 m-b-5"
              title="Excel"
              style={btnStyles}
            >
              {" "}
              <Link to="/accounting/coas/">
                <img style={iconStyles} src={xlsIcon} />
              </Link>{" "}
            </button>

            <button
              className="btn btn-default active m-r-5 m-b-5"
              title="Print"
              style={btnStyles}
            >
              {" "}
              <Link to="/accounting/coas/">
                <img style={iconStyles} src={printerIcon} />
              </Link>{" "}
            </button>

            <button
              className="btn btn-default active m-r-5 m-b-5"
              title="Copy"
              style={btnStyles}
            >
              {" "}
              <Link to="/accounting/coas/">
                <img style={iconStyles} src={clipboardIcon} />
              </Link>{" "}
            </button>

            <button
              className="btn btn-default active m-r-5 m-b-5"
              title="Archive"
              style={btnStyles}
            >
              {" "}
              <Link to="/accounting/coas/">
                <img style={iconStyles} src={archiveIcon} />
              </Link>{" "}
            </button>

            <button
              className="btn btn-default active m-r-5 m-b-5"
              title="Import"
              style={btnStyles}
            >
              {" "}
              <Link to="/accounting/coas/">
                <img style={iconStyles} src={importIcon} />
              </Link>{" "}
            </button>
          </div>
        </React.Fragment>

        <hr className="m-0" />
        <PanelBody>
          <ReusableTabNavs
            setActiveTab={(n) => setActiveView(n)}
            activeTab={activeTab}
            navprops={tabMenus}
          />
          <TabContent activeTab={activeTab}>
            <ReusableTab id={1}>
              <div className="d-flex justify-content-between align-items-center mt-4">
                <div className="d-flex align-items-center">
                  Show&nbsp;
                  <div style={{ width: "70px" }}>
                    <Select
                      styles={customStyles}
                      options={[
                        {
                          value: 10,
                          label: 10,
                        },
                      ]}
                      placeholder={"Entries..."}
                      value={{
                        value: entries,
                        label: entries,
                      }}
                      onChange={(e) => setEntries(e.value)}
                    />
                  </div>
                  &nbsp;entries
                </div>
                <div className="d-flex align-items-center">
                  <span>Search:&nbsp;</span>
                  <input className="form-control" type="text" />
                </div>
              </div>

              <div className="table-responsive mt-3">
                <table class="table table-bordered" {...getTableProps()}>
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps()}>
                            <div class="d-flex">
                              <span>{column.render("Header")}</span>
                              <span class="ml-auto">
                                {column.sortable ? (
                                  column.isSorted ? (
                                    column.isSortedDesc ? (
                                      <i className="fa fa-sort-down fa-fw f-s-14 text-blue"></i>
                                    ) : (
                                      <i className="fa fa-sort-up fa-fw f-s-14 text-blue"></i>
                                    )
                                  ) : (
                                    <i className="fa fa-sort fa-fw f-s-14 opacity-3"></i>
                                  )
                                ) : (
                                  ""
                                )}
                              </span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    <tr>
                      <td colspan="7" className="text-center text-muted">
                        No data available in table
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-muted">Showing 0 to 0 of 0 entries</div>
                <div className="d-flex">
                  <button className="btn btn-green btn-sm mr-2">Previous</button>
                  <button className="btn btn-green btn-sm">Next</button>
                </div>
              </div>
            </ReusableTab>
            <ReusableTab id={2} height={"100%"} width={"100%"}>
              <div className="mt-5">Tab 2</div>
            </ReusableTab>
          </TabContent>
        </PanelBody>
      </Panel>
    </div>
  );
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

export default COAsTableData;