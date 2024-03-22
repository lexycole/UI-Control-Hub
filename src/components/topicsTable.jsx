import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";

class TopicsTable extends Component {
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
      content: (topic) => (
        <span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
          {/* {console.log(topic)} */}
          <input
            type="checkbox"
            style={{
              width: "15px",
              height: "15px",
              marginTop: "0.4rem",
              borderRadius: 0,
            }}
            onChange={this.props.handleCheckboxChange}
            value={topic._id}
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
    ,
    {
      label: "title", path: "title",
      content: (user) => (
        <span className="icon-img sm-r-5">     
          {user.title}
        </span>
      ),
    },
    
    
    {
      label: "narrative", path: "narrative",
      content: (user) => (
        <span className="icon-img sm-r-5">       
           {!this.props.open ? user.narrative.split(".")[0] : user.narrative }{" "}    
<button style={{borderRadius:'10%' , border:'none' ,backgroundColor:'lightblue'  }} onClick={this.props.handleOpen} >show more</button>
        </span>
      ),
    },
    {
      label: "category", path: "category",
      content: (user) => (
        <span className="icon-img sm-r-5">       
          {user.subCategory.catId.name}
        </span>
      ),
    },
    
    {
      label: "sub category", path: "subcategory",
      content: (user) => (
        <span className="icon-img sm-r-5">       
        {user.subCategory.name}
        </span>
      ),
    },
    { label: "Tags", path: "tags" },
    { label: "Views", path: "views" },	
    { label: "Status",path: "status",
      content: (topic) => (
        <div
          className="w-100 h-100"
          style={{
            background: () => {
              this.props.tabMenus.map((tm, id) => {
                return topic.status.toLowerCase() === tm.label.toLowerCase()
                  ? tm.background
                  : "#cccccc";
              });
            },
          }}
        >
          {topic.status}
        </div>
      ),
    },
  ];

  render() {
    //console.log(this.columns) ; 
    const { topics, onSort, sortColumn , open } = this.props;
     console.log(topics);
    return (
      <Table
      columns={this.columns}
      sortColumn={sortColumn}
      onSort={onSort}
      data={topics}
      tabMenus={this.props.tabMenus}
      activeTab={this.props.activeTab}
      handleCheckboxAll={this.props.handleCheckboxAll}
      handlePrint={(a) => this.props.handlePrint(a)}
      open={open}
      handleOpen={this.props.handleOpen}
      // tableRef={this.props.tableRef}
    />
    );
  }
}

export default TopicsTable;