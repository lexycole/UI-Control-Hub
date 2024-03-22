import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class CategoriesTable extends Component {
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
      content: (category) => (
        <span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
          {/* {console.log(category)} */}
          <input
            type="checkbox"
            style={{
              width: "15px",
              height: "15px",
              marginTop: "0.4rem",
              borderRadius: 0,
            }}
            onChange={this.props.handleCheckboxChange}
            value={category._id}
            // defaultChecked={this.props.allChecked}
          />
        </span>
      ),
    },
    {
      label: "user", path: "user",
      content: (user) => (
        <span className="icon-img sm-r-5">  
          <img
            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
            src={user.user.imageSrc}
            alt=""
          />{" "}      
          {user.user.contactName.first +' ' +user.user.contactName.last}
        </span>
      ),
    },
   

    { label: "Name", path: "name" },
    { label: "Description", path: "description" },
    { label: "Note", path: "note" },
    { label: "icon", path: "icon",
    content: (category) => (
      <img
      style={{ width: "20px", height: "20px", borderRadius: "50%" }}
      src={category.icon}
      alt=""
    />

    ),
  },
    { label: "Status", path: "status",
      content: (category) => (
        <div
          className="w-100 h-100"
          style={{
            background: () => {
              this.props.tabMenus.map((tm, id) => {
                return category.status.toLowerCase() === tm.label.toLowerCase()
                  ? tm.background
                  : "#cccccc";
              });
            },
          }}
        >
          {category.status}
        </div>
      ),
    },
  ];

  render() {
    //console.log(this.columns) ;
    const { Categories, onSort, sortColumn } = this.props;
    // console.log(categorys);
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={Categories}
        tabMenus={this.props.tabMenus}
        activeTab={this.props.activeTab}
        handleCheckboxAll={this.props.handleCheckboxAll}
        handlePrint={(a) => this.props.handlePrint(a)}
        // tableRef={this.props.tableRef}
      />
    );
  }
}

export default CategoriesTable;
