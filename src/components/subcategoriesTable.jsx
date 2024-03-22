import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class SubCategoriesTable extends Component {
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
    }
    ,
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
    {
      label: "name", path: "name",
      content: (user) => (
        <span className="icon-img sm-r-5">  
             {user.name}
        </span>
      ),
    },
    {
      label: "category", path: "",
      content: (user) => (
        <span className="icon-img sm-r-5">  
             {user.catId.name}
        </span>
      ),
    },
    {
      label: "status", path: "status",
      content: (user) => (
        <span className="icon-img sm-r-5">  
             {user.status}
        </span>
      ),
    },

   
    

  ];

  render() {
    //console.log(this.columns) ;
    const { SubCategories, onSort, sortColumn } = this.props;
    // console.log(categorys);
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={SubCategories}
        tabMenus={this.props.tabMenus}
        activeTab={this.props.activeTab}
        handleCheckboxAll={this.props.handleCheckboxAll}
        handlePrint={(a) => this.props.handlePrint(a)}
        // tableRef={this.props.tableRef}
      />
    );
  }
}

export default SubCategoriesTable;
