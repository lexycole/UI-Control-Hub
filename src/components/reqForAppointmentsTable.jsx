import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";
import moment from "moment"

class ReqforappointmentsTable extends Component {
    columns = [
        //   {path: '_id', reqforappointment: 'Id'},
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
                    onChange={this.props.handleAllCheckboxChange}
                />
            ),
            content: (reqforappointment) => (
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
                        value={reqforappointment._id}
                        checked={reqforappointment.isChecked}
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
        // {label: 'Username',   path: 'patientUser.username' } ,
        { label: 'email', path: 'patientNo.user.email' },
        { label: 'Firstname', path: 'patientNo.user.contactName.first' },
        { label: 'initials', path: 'patientNo.user.contactName.initials' },
        { label: 'Lastname', path: 'patientNo.user.contactName.last' },
        { label: 'DOB', path: 'patientNo.user.dateBirth',content:(reqforappointment) =>moment(reqforappointment.patientNo?.user?.dateBirth).format("L") },
        { label: 'Mobile', path: 'patientNo.user.phones.mobile' },
        { label: 'Phone', path: 'patientNo.user.phones.phone' },
        { label: "gender", path: "patientNo.user.gender" },
        { label: "Complaint", path: "title" },
        { label: "Date", path: "date",content:(reqforappointment) =>(moment(reqforappointment.date).format("L")) },
        { label: "PreferStartTime", path: "preferStartTime" ,content:(reqforappointment) =>(moment(reqforappointment.preferStartTime).format(" h:mm A",))},
        { label: "PreferEndtime", path: "preferEndTime",content:(reqforappointment) =>(moment(reqforappointment.preferEndTime).format(" h:mm A")) },
        { label: "Clinic", path: "clinicNo.companyInfo.businessName" },
        { label: "appointmentType", path: "appointmentType" },
        { label: "Note", path: "note" },
        { label: "Status", path: "status" },
    ];

    render() {
        //console.log(this.columns) ;
        const { reqforappointments, onSort, sortColumn } = this.props;
        return <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={reqforappointments} />;
    }
}

export default ReqforappointmentsTable;
