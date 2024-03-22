import React, { Component } from "react";
import Table from "./../newcommon/table";
import { Link, withRouter } from "react-router-dom";
import moment from "moment"

class PostsTable extends Component {
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
      content: (post) => (
        <span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
          {/* {console.log(post)} */}
          <input
            type="checkbox"
            style={{
              width: "15px",
              height: "15px",
              marginTop: "0.4rem",
              borderRadius: 0,
            }}
            onChange={this.props.handleCheckboxChange}
            value={post._id}
            // defaultChecked={this.props.allChecked}
          />
        </span>
      ),
    },
    {
      label: "username",
      path: "username",
      content: (post) => (
        <span className="icon-img sm-r-5">
          <img
            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
            src={post.imageSrc}
            alt=""
          />{" "}
          {post.postname}
        </span>
      ),
    },
    { label: "TopicIDt", path: "topicId" },	
    { label: "CreatedAt", path: "createdAt" },
    { label: "Title", path: "title" },
    { label: "Narrative", path: "narrative" },
    { label: "Slug", path: "slug" },	
    { label: "Likes", path: "likes" },
    { label: "Views", path: "views" },	
    { label: "CreatedOn", path: "createdOn" },	
    {
      label: "Status",
      path: "status",
      content: (post) => (
        <div
          className="w-100 h-100"
          style={{
            background: () => {
              this.props.tabMenus.map((tm, id) => {
                return post.status.toLowerCase() === tm.label.toLowerCase()
                  ? tm.background
                  : "#cccccc";
              });
            },
          }}
        >
          {post.status}
        </div>
      ),
    },
  ];

  render() {
    //console.log(this.columns) ;
    const { posts, onSort, sortColumn } = this.props;
    // console.log(posts);
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={posts}
        tabMenus={this.props.tabMenus}
        activeTab={this.props.activeTab}
        handleCheckboxAll={this.props.handleCheckboxAll}
        handlePrint={(a) => this.props.handlePrint(a)}
        // tableRef={this.props.tableRef}
      />
    );
  }
}

export default PostsTable;
