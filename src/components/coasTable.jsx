import React, { Component } from "react";
import Table from "./../common/table";
// import { Link, withRouter } from "react-router-dom";
import { Button, ButtonGroup } from "reactstrap";
import { useHistory } from "react-router";
import moment from "moment"

const handleCheckbox = (checkbox) =>{
    var checkboxes = document.getElementsByName('check')

    checkboxes.forEach((item) => {
        if (item.value !== checkbox) item.checked = false
        else {console.log(checkbox)}
    })
}

const COAsTable = ({ coas, onSort, sortColumn, handleCheckboxChange, handleCheckboxClick }) => {
  const history = useHistory();
  const columns = [
    {
      key: "checkbox",
      label: <input type="check" style={checkboxStyles} />,
      content: (coa) => (
        <span className="icon-img sm-r-5" style={{ marginTop: "15px" }}>
          <input
            type="checkbox"
            name="check"
            style={checkboxStyles}
            // onChange={handleCheckboxChange}
            value={coa._id}
            onClick={()=>{handleCheckboxClick(coa._id); handleCheckbox(coa._id)}}
          />
        </span>
      ),
    },
    { label: "Code", path: "code" },
    { label: "Name", path: "name" },
    { label: "Category", path: "category" },
    { label: "Sub-category", path: "subCategory" },
    { label: "Description", path: "description" },
    { label: "Nature/Contra", path: "normalContra" },
    { label: "BalanceType", path: "balanceType" },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      data={coas}
    />
  );
};

const checkboxStyles = {
  width: "15px",
  height: "15px",
  marginTop: "0.4rem",
  borderRadius: 0,
};

export default COAsTable;
