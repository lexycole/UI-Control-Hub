import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";

class FreelancersTable extends Component {
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
      content: (freelancer) => (
        <span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
          <input
            type="checkbox"
            style={{
              width: "15px",
              height: "15px",
              marginTop: "0.4rem",
              borderRadius: 0,
            }}
            checked={freelancer.isChecked}
            onChange={this.props.handleCheckboxChange}
            value={freelancer._id}
          />
        </span>
      ),
    },
    {
      label: "Username",
      path: "username",
      content: (freelancer) => (
        <span className="icon-img sm-r-5">
          <img
            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
            src={freelancer.freelancers.imageSrc}
            alt=""
          />{" "}
          {freelancer.freelancers.username}
        </span>
      ),
    },
    // {key:'avatar', label: 'avatar',content: freelancer=>(<span className="icon-img"><img src={freelancer.freelancers.imageSrc} alt="" /></span>) },
    { label: "firstname", path: "freelancers.contactName.first" },
    { label: "initials", path: "freelancers.contactName.initials" },
    { label: "lastname", path: "freelancers.contactName.last" },
    {label: "DOB",path: "freelancers.dateBirth",content: (user) => moment(user.freelancers.dateBirth).format("L"),},
    { label: "gender", path: "freelancers.gender" },
    { label: "address1", path: "freelancers.Address.address1" },
    { label: "address2", path: "freelancers.Address.address2" },
    { label: "address3", path: "freelancers.Address.address3" },
    { label: "zip", path: "freelancers.Address.zip" },
    { label: "city", path: "freelancers.Address.city" },
    { label: "state", path: "freelancers.Address.state" },
    { label: "country", path: "freelancers.Address.country" },
    { label: "website", path: "freelancers.website" },
    { label: "mobile", path: "freelancers.phones.mobile" },
    { label: "phone", path: "freelancers.phones.phone" },
    { label: "skype", path: "freelancers.phones.skype" },
    { label: "Linkedin", path: "membership.linkedIn" },
    { label: "Fiverr", path: "membership.fiverr" },
    { label: "Upwork", path: "membership.upwork" },
    { label: "Github", path: "membership.github" },
    { label: "IBAN", path: "bankInfo.IBAN" },
    { label: "Bank", path: "bankInfo.bank" },
    { label: "Branch Bank", path: "bankInfo.branchOfBank" },
    { label: "primInsuranceNo", path: "insuranceInfo.primInsuranceNo" },
    { label: "primInsurance", path: "insuranceInfo.primInsurance" },
    {
      label: "primInsuranceValidTill",
      path: "insuranceInfo.primInsuranceValidTill",
    },
    { label: "secInsuranceNo", path: "insuranceInfo.secInsuranceNo" },
    { label: "secInsurance", path: "insuranceInfo.secInsurance" },
    {
      label: "secInsuranceValidTill",
      path: "insuranceInfo.secInsuranceValidTill",
    },
    { label: "Certificate", path: "freelancers.certifications.certificate" },
    {
      label: "CertificateNo",
      path: "freelancers.certifications.certificateNo",
    },
    {
      label: "certificate Valid From",
      path: "freelancers.certifications.certificateValidFrom",
    },
    { label: "Skill", path: "freelancers.skills.skill" },
    { label: "Level", path: "freelancers.skills.level" },
    { label: "idPaper", path: "identification.idPaper" },
    {
      label: "idPaperValidTill",
      path: "identification.idPaperValidTill",
      content: (user) =>
        moment(user.identification.idPaperValidTill).format("L"),
    },
    { label: "Note", path: "note" },
    { label: "Status", path: "status" },
  ];

  render() {
    //console.log(this.columns) ;
    const { freelancers, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={freelancers}
      />
    );
  }
}

export default FreelancersTable;
