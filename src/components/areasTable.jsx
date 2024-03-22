import React, { Component } from "react";
import Table from "./../common/table";

class AreaTable extends Component {
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
      content: (listArea) => (
        <span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
          <input
            type="checkbox"
            style={checkboxStyles}
            onChange={this.props.handleCheckboxChange}
            value={listArea._id}
          />
        </span>
      ),
    },
    { label: "Name", path: "name" },
    { label: "Description",path: "description",
      content: (listArea) => {
        return (
          <div dangerouslySetInnerHTML={{ __html: listArea.description }} />
        );
      },
    { label: "Floor", path: "floor" },	  
    { label: "Location", path: "location" },	  
    },
  ];
  render() {
    const { TermofUses, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={TermofUses}
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

export default AreaTable;
