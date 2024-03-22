import _ from "lodash";
import React, { Component } from "react";
import PhysicalConditionsTable from "./physicalConditionsTable";

class mainPhysicalconditionsTable extends Component {
    render() {
      //console.log(this.columns) ;
      const { selectItem,physicalConditions ,allPhysicalConditions, checkedFields, handleALlPatientsCheckboxChange, viewSession,handleSort,sortColumn,handleCheckboxChange, isPatientInfoShow} = this.props;
      return (
        <div className="table-responsive mt-4">
            <table class="table">
                <thead>
                    <tr>
                        {!isPatientInfoShow && <th>
                            <input
                                type="checkbox"
                                style={{
                                    width: "15px",
                                    height: "15px",
                                    marginTop: "15px",
                                    marginLeft: "20px",
                                    borderRadius: "2px",
                                }}
                                onClick={selectItem}
                            />
                        </th>}
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Clinic</th>
                        <th>Date/Time</th>
                        <th>View Record</th>
                    </tr>
                </thead>
                <tbody>
                    {physicalConditions &&
                        physicalConditions.map((physicalCondition, index) => {
                            let patientSessions = allPhysicalConditions?.filter((item) => {
                                return item?.patientNo.user._id == physicalCondition?.patientNo.user._id;
                            });

                            let sortedPatientSessions = _.reverse(patientSessions);
                            
                            let today = new Date(physicalCondition.createdOn);
                            let date =
                                today.getDate() +
                                "/" +
                                parseInt(today.getMonth() + 1) +
                                "/" +
                                today.getFullYear();

                            if (physicalCondition.isVisible == true) {
                                let patentId = physicalCondition.patientNo.user._id || null;
                                return (
                                    <React.Fragment key={physicalCondition._id}>
                                        {!isPatientInfoShow && <tr>
                                            <td style={rowStyles}>
                                                <input
                                                    type="checkbox"
                                                    style={{
                                                        marginLeft: "20px",
                                                    }}
                                                    value={physicalCondition._id}
                                                    checked={checkedFields.includes(physicalCondition._id)}
                                                    onChange={(e)=> handleALlPatientsCheckboxChange(e.target.checked,physicalCondition?.patientNo.user._id)}
                                                />
                                            </td>
                                            <td style={rowStyles}>
                                                <span className="icon-img sm-r-5">
                                                    <img
                                                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                                    src={physicalCondition.patientNo.user.imageSrc}
                                                    alt=""
                                                    />{" "}
                                                    {physicalCondition.patientNo.user.contactName.last}
                                                </span>
                                            </td>
                                            <td style={rowStyles}>
                                                <span className="icon-img sm-r-5">
                                                    <img
                                                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                                    src={physicalCondition.doctorNo.user.imageSrc}
                                                    alt=""
                                                    />{" "}
                                                    Dr. {physicalCondition.doctorNo.user.contactName.last}
                                                </span>
                                            </td>
                                            <td style={rowStyles}>
                                                <span className="icon-img sm-r-5">
                                                    <img
                                                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                                    src={physicalCondition.clinicNo.user.imageSrc}
                                                    alt=""
                                                    />{" "}
                                                    {physicalCondition.clinicNo.user.contactName.last}
                                                </span>
                                            </td>
                                            <td style={rowStyles}>
                                                {date}{" "}
                                                {today.getHours() +
                                                    ":" +
                                                    today.getMinutes() +
                                                    ":" +
                                                    today.getSeconds()}
                                            </td>
                                            <td>
                                                <a
                                                    data-toggle="collapse"
                                                    data-target={`#multiCollapseExample1${index}`}
                                                    role="button"
                                                    aria-expanded="false"
                                                    aria-controls={`multiCollapseExample1${index}`}
                                                    onClick={() => viewSession(physicalCondition)}
                                                    style={{ color: "blue" }}
                                                >
                                                    View
                                                </a>
                                            </td>
                                        </tr>}
                                        <tr>
                                            <td colSpan={12}>
                                                <div
                                                    class="collapse multi-collapse"
                                                    id={`multiCollapseExample1${index}`}
                                                >
                                                    <PhysicalConditionsTable
                                                        physicalConditions={sortedPatientSessions}
                                                        onSort={handleSort}
                                                        sortColumn={sortColumn}
                                                        handleCheckboxChange={handleCheckboxChange}
                                                        selectItem={selectItem}
                                                        checkedFields={checkedFields}
                                                        handleALlPatientsCheckboxChange={handleALlPatientsCheckboxChange}
                                                        patentId={patentId}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                );
                            }
                        })}
                </tbody>
            </table>
        </div>
      );
    }
}

const rowStyles = {
	width: "150px",
};

export default mainPhysicalconditionsTable;