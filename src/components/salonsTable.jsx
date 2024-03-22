import React, { Component } from "react";
import Table from "./../common/table";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";

class SalonsTable extends Component {
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
      content: (salon) => (
        <span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
          <input
            type="checkbox"
            style={{
              width: "15px",
              height: "15px",
              marginTop: "0.4rem",
              borderRadius: 0,
            }}
            checked={salon.isChecked}
            onChange={this.props.handleCheckboxChange}
            value={salon._id}
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
            src={user.Salons.imageSrc}
            alt=""
          />{" "}
          {user.Salons.username}
        </span>
      ),
    },
    { label: "email", path: "Salons.email" },
    { label: "SalonNo", path: "salonSoloNo" },
    { label: "Business-name", path: "companyInfo.businessName" },
    { label: "Firstname", path: "Salons.contactName.first" },
    { label: "initials", path: "Salons.contactName.initials" },
    { label: "Lastname", path: "Salons.contactName.last" },
		{label: 'DOB',   path: 'Salons.dateBirth', content:(user) =>(moment(user.Salons.dateBirth).format("L"))} ,   	  
    { label: "gender", path: "Salons.gender" },
    { label: "Address 1", path: "Salons.Address.address1" },
    { label: "Address 2", path: "Salons.Address.address2" },
    { label: "Address 3", path: "Salons.Address.address3" },
    { label: "zip", path: "Salons.Address.zip" },
    { label: "city", path: "Salons.Address.city" },
    { label: "State", path: "Salons.Address.state" },
    { label: "Country", path: "Salons.Address.country" },
    { label: "website", path: "Salons.website" },
    { label: "Linkedin", path: "Salons.linkedin" },
    { label: "mobile", path: "Salons.phones.mobile" },
    { label: "phone", path: "Salons.phones.phone" },
    { label: "skype", path: "Salons.phones.skype" },
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
    {
      label: "OrganizationA Member No",
      path: "membership.organizationAMemberNo",
    },
    { label: "OrganizationB Name", path: "membership.organizationBName" },
    {
      label: "OrganizationB Member No",
      path: "membership.organizationBMemberNo",
    },
    { label: "Status", path: "status" },
  ];

  render() {
    //console.log(this.columns) ;
    const { salons, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={salons}
      />
    );
  }
}

export default SalonsTable;
