import React, { Component } from "react";
import Table from "./../common/table";
import moment from "moment";

class AppointmentsTable extends Component {
  // constructor(props) {
  // 	super(props);
  // 	this.state = {
  // 		values: [],
  // 	};
  // }

  columns = [
    //   {path: '_id', label: 'Id'},
    {
      key: "checkbox",
      label: (
        <input
          type="check"
          style={{
            width: "15px",
            height: "15px",
            marginTop: "0.4rem",
            borderRadius: 0,
          }}
        />
      ),
      content: (appointment) => (
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
            value={appointment._id}
          />
        </span>
      ),
    },
    {
      label: "Username",
      path: "patientNo.user.username",
      content: (reqforappointment) => (
        <span className="icon-img sm-r-5">
          <img
            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
            src={reqforappointment.patientNo?.user?.imageSrc}
            alt=""
          />{" "}
          {reqforappointment.patientNo?.user?.username}
        </span>
      ),
    },
    { label: "email", path: "clientNo.user.email" },
    { label: "Firstname", path: "clientNo.user.contactName.first" },
    { label: "initials", path: "clientNo.user.contactName.initials" },
    { label: "Lastname", path: "clientNo.user.contactName.last" },
    { label: "DOB", path: "clientNo.user.dateBirth", content: (appointmenta) => moment(appointmenta.clientNo?.user?.dateBirth).format("L"),},
    { label: "Mobile", path: "clientNo.user.phones.mobile" },
    { label: "Phone", path: "clientNo.user.phones.phone" },
    { label: "Date", path: "date", content: (appointmenta) => moment(appointmenta.date).format("L"),},
    { label: "StartTime", path: "startTime", content: (appointmenta) => moment(appointmenta.startTime).format(" h:mm A"),},
    { label: "Endtime", path: "endTime", content: (appointmenta) => moment(appointmenta.endTime).format(" h:mm A"),},
    { label: "Complaint", path: "title" },
    // {label: 'Clinic',   path: 'clinicNo.companyInfo.businessName' } ,
    {
      label: "Clinic",
      path: "clinicNo.companyInfo.businessName",
      content: (reqforappointment) => (
        <span className="icon-img sm-r-5">
          <img
            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
            src={reqforappointment.clinicNo?.user?.imageSrc}
            alt=""
          />{" "}
          {reqforappointment.clinicNo?.companyInfo?.businessName}
        </span>
      ),
    },
    {
      label: "Doctor",
      path: "doctorNo.user.contactName.last",
      content: (reqforappointment) => (
        <span className="icon-img sm-r-5">
          <img
            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
            src={reqforappointment.doctorNo?.user?.imageSrc}
            alt=""
          />{" "}
          {reqforappointment.doctorNo?.user?.contactName.last}
        </span>
      ),
    },
    // {label: 'Doctor',   path: 'doctorNo.user.contactName.last' } ,
    { label: "Appointment-type", path: "appointmentType" },
    { label: "Session-type", path: "sessionType" },
    { label: "Note", path: "note" },
    { label: "Status", path: "status" },
  ];

  render() {
    //console.log(this.columns) ;
    const { appointments, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={appointments}
      />
    );
  }
}

export default AppointmentsTable;
