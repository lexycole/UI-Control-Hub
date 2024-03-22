import React, { Component } from "react";
import Table from "./../common/table";

class EeventTable extends Component {
  columns = [
    {
      key: "checkbox",
      label: (
        <input
          type="checkbox"
          style={checkboxStyles}
          onChange={this.props.toggle}
        />
      ),
      content: (listEevent) => (
        <span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
          <input
            type="checkbox"
            style={checkboxStyles}
            onChange={this.props.handleCheckboxChange}
            value={listEevent._id}
          />
        </span>
      ),
    },
    { label: "Name", path: "name" },
    { label: "Action", path: "action" },	
    { label: "Step", path: "step" },	  
    },
  ];
  render() {
    const { Eevents, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={Eevents}
      />
    );
  }
}

const checkboxStyles = {
  width: "15px",
  height: "15px",
  marginTop: "0.4rem",
  borderRadius: 0,
};

export default EeventTable;
