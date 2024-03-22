import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";
import moment from "moment"

class VideoMeetingsTable extends Component {
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
      content: (VideoMeeting) => (
        <span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
          {/* {console.log(VideoMeeting)} */}
          <input
            type="checkbox"
            style={{
              width: "15px",
              height: "15px",
              marginTop: "0.4rem",
              borderRadius: 0,
            }}
            onChange={this.props.handleCheckboxChange}
            value={VideoMeeting._id}
            // defaultChecked={this.props.allChecked}
          />
        </span>
      ),
    },
    // {
    //   key: "avatar",
    //   label: "avatar",
    //   content: (VideoMeeting) => (
    //     <span className="icon-img sm-r-5">
    //       <img
    //         style={{ width: "20px", height: "20px", borderRadius: "50%" }}
    //         src={VideoMeeting.imageSrc}
    //         alt=""
    //       />
    //     </span>
    //   ),
    // },
    { label: "Name", path: "name" },	
    {
      label: "Host",
      path: "host",
      content: (VideoMeeting) => (
        <span className="icon-img sm-r-5">
          <img
            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
            src={VideoMeeting.imageSrc}
            alt=""
          />{" "}
          {VideoMeeting.host}
        </span>
      ),
    },
    { label: "Guests", path: "members" },
    { label: "Date", path: "date",
    content: (VideoMeeting) => (   <div>
      <DateComponent date={VideoMeeting.date} />
    </div>
    { label: "StartTime-Endtime", path: "startTime-endTime" },
    { label: "Lastname", path: "contactName.last" },
    { label: "Status", path: "status"},
  ),
  ];

  render() {
    //console.log(this.columns) ;
    const { VideoMeetings, onSort, sortColumn } = this.props;
    // console.log(VideoMeetings);
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={VideoMeetings}
        tabMenus={this.props.tabMenus}
        //activeTab={this.props.activeTab}
        handleCheckboxAll={this.props.handleCheckboxAll}
        handlePrint={(a) => this.props.handlePrint(a)}
        // tableRef={this.props.tableRef}
      />
    );
  }
}

const DateComponent = ({ date }) => {
  let newDate = new Date(date);
  return (
    <>
      {newDate || date
        ? `${newDate.getDate()}/${
            newDate.getMonth() + 1
          }/${newDate.getFullYear()}`
        : "-"}
    </>
  );
};

export default VideoMeetingsTable;
