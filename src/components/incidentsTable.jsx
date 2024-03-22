import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";
import moment from "moment"

class IncidentsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // values: [],
    };
  }

  columns = [
    //   {path: '_id', label: 'Id'},
    {
      key: "checkbox",
      label: (
        <input
          type="checkbox"
          style={{
            width: "15px",
            height: "15px",
            marginTop: "0.4rem",
            borderRadius: 0,
          }}
          onChange={this.props.handleCheckboxAll}
        />
      ),
      content: (user) => (
        <span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
          <input
            type="checkbox"
            style={{
              width: "15px",
              height: "15px",
              marginTop: "0.4rem",
              borderRadius: 0,
            }}
            onChange={this.props.handleCheckboxChange}
            value={user._id}
            // defaultChecked={this.props.allChecked}
          />
        </span>
      ),
    },
    { label: "IncidentNo", path: "incidentNo" },	
    {
      label: "Reporter", path: "reporter",
      content: (user) => (
        <span className="icon-img sm-r-5">
          <img
            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
            src={user.reporter?.imageSrc}
            alt=""
          />{" "}
          {user.reporter?.username}
        </span>
      ),
    },
    {
      label: "Victim", path: "victim",
      content: (user) => (
        <span className="icon-img sm-r-5">
          <img
            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
            src={user.victim?.imageSrc}
            alt=""
          />{" "}
          {user.victim?.username}
        </span>
      ),
    },
    {
      label: "Witness", path: "witness",
      content: (user) => (
        <span className="icon-img sm-r-5">
          <img
            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
            src={user.witness?.imageSrc}
            alt=""
          />{" "}
          {user.witness?.username}
        </span>
      ),
    },
	
    { label: "Name", path: "name" },
    { label: "Category", path: "category" },
    { label: "Department", path: "department" },
    { label: "Location", path: "location" },
    { 
      label: "Date & Time",
      path: "date",
      content : (user) => (
        <div className="w-100 h-100">
          {/* {moment(user.date).format("DD/MM/YYYY , HH:mm a")} */}
          {moment(user.date).format("LLL")}
        </div>
      ) 
    },	
    { label: "Narrative", path: "narrative" },
    {
      label: "LTI",
      path: "LTI",
      content: (user) => (
        <div className="w-100 h-100">
        </div>
      ),
    },
    { label: "Root-Cause", path: "rootCause" },	
    { label: "Note", path: "note" },	
    { label: "Status",path: "status",
      content: (user) => (
        <div
          className="w-100 h-100"
          style={{
            background: () => {
              this.props.tabMenus.map((tm, id) => {
                return user.status.toLowerCase() === tm.label.toLowerCase()
                  ? tm.background
                  : "#cccccc";
              });
            },
          }}
        >
          {user.status}
        </div>
      ),
    },
	
  ];

  render() {
    //console.log(this.columns) ;
    const { Incidents, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={Incidents}
        tabMenus={this.props.tabMenus}
        activeTab={this.props.activeTab}
        handleCheckboxAll={this.props.handleCheckboxAll}
        handlePrint={(a) => this.props.handlePrint(a)}
        // tableRef={this.props.tableRef}
      />
    );
  }
}

export default IncidentsTable;
