import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";

class GaragesTable extends Component {
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
      content: (garage) => (
        <span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
          <input
            type="checkbox"
            style={{
              width: "15px",
              height: "15px",
              marginTop: "0.4rem",
              borderRadius: 0,
            }}
            checked={garage.isChecked}
            onChange={this.props.handleCheckboxChange}
            value={garage._id}
          />
        </span>
      ),
    },
    {
      label: "Username",
      path: "username",
      content: (user) => (
        <span className="icon-img sm-r-5">
          <img
            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
            src={user.Garages.imageSrc}
            alt=""
          />{" "}
          {user.Garages.username}
        </span>
      ),
    },
    { label: "email", path: "Garages.email" },
    { label: "GarageNo", path: "garageSoloNo" },
    { label: "Business-name", path: "companyInfo.businessName" },
    { label: "Firstname", path: "Garages.contactName.first" },
    { label: "initials", path: "Garages.contactName.initials" },
    { label: "Lastname", path: "Garages.contactName.last" },	
    { label: "DOB", path: "Garages.dateBirth", content: (user) => moment(user.Garages.dateBirth).format("L"), },
    { label: "gender", path: "Garages.gender" },
    { label: "Address 1", path: "Garages.Address.address1" },
    { label: "Address 2", path: "Garages.Address.address2" },
    { label: "Address 3", path: "Garages.Address.address3" },
    { label: "zip", path: "Garages.Address.zip" },
    { label: "city", path: "Garages.Address.city" },
    { label: "State", path: "Garages.Address.state" },
    { label: "Country", path: "Garages.Address.country" },
    { label: "website", path: "website" },
    { label: "Linkedin", path: "linkedin" },
    { label: "mobile", path: "Garages.phones.mobile" },
    { label: "phone", path: "Garages.phones.phone" },
    { label: "skype", path: "Garages.phones.skype" },
    { label: "IBAN", path: "bankInfo.IBAN" },
    { label: "Bank", path: "bankInfo.bank" },
    { label: "Branch Bank", path: "bankInfo.branchOfBank" },
    // {label: 'subscription',   path: 'subscription' } ,
    // {label: 'subscriptionEndDate',   path: 'subscriptionEndDate' } ,
    { label: "ChamberCommerce No", path: "companyInfo.chamberCommerceNo" },
    { label: "TaxPayerNo", path: "companyInfo.taxPayerNo" },
    { label: "Treatments", path: "professionalInfo.treatments" },
    { label: "LicenseNo", path: "professionalInfo.licenseNo" },
    {
      label: "License Valid Till",
      path: "professionalInfo.licenseValidTill",
      content: (user) =>
        moment(user.professionalInfo.licenseValidTill).format("L"),
    },
    { label: "OrganizationA Name", path: "membership.organizationAName" },
    { label: "OrganizationA Member No", path: "membership.organizationAMemberNo",},
    { label: "OrganizationB Name", path: "membership.organizationBName" },
    { label: "OrganizationB Member No", path: "membership.organizationBMemberNo", },
    { label: "Status", path: "status" },
  ];

  render() {
    //console.log(this.columns) ;
    const { garages, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={garages}
      />
    );
  }
}

export default GaragesTable;
