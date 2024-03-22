import React, { Component } from "react";
import Table from "./../common/table";

class PhysicalConditionsTable extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		values: [],
	// 	};
	// }
	columns = [
		//   {path: '_id', physicalCondition: 'Id'},
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
					// onClick={this.props.selectItem}
					onChange={(e)=> this.props.handleALlPatientsCheckboxChange(e.target.checked,this.props.patentId)}
				/>
			),
			content: (physicalCondition) => (
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
						value={physicalCondition._id}
						// checked={physicalCondition.isChecked}
						checked={this.props.checkedFields.includes(physicalCondition._id)}
					/>
				</span>
			),
		},
		{
			label: "Doctor",
			content: (physicalCondition) => (
				<span className="icon-img sm-r-5">
					<img
					style={{ width: "30px", height: "30px", borderRadius: "50%" }}
					src={physicalCondition.doctorNo.user.imageSrc}
					alt=""
					/>{" "}
					Dr. {physicalCondition.doctorNo.user.contactName.last}
				</span>
			),
		},
		{
			label: "Clinic",
			content: (physicalCondition) => (
				<span className="icon-img sm-r-5">
					<img
					style={{ width: "30px", height: "30px", borderRadius: "50%" }}
					src={physicalCondition.clinicNo.user.imageSrc}
					alt=""
					/>{" "}
					{physicalCondition.clinicNo.user.contactName.last}
				</span>
			),
		},
		{
			label: "Date/Time",
			content: (physicalCondition) => {
				let today = new Date(physicalCondition.createdOn);
				let date = today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear();
				return (
					<span className="icon-img sm-r-5">
						{date} {today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()}
					</span>
				);
			},
		},
		{ label: "Age", path: "age" },
		{ label: "ethnicity", path: "ethnicity" },
		{ label: "CityOfBirth", path: "cityOfBirth" },
		{ label: "weight", content: (physicalCondition) => {
				if(physicalCondition?.weight === 0 || physicalCondition?.weight === null) return;
				return (
					<span className="icon-img sm-r-5">
						{`${physicalCondition?.weight} ${physicalCondition?.weightUnit}`}
					</span>
				);
			} 
		},
		{ label: "height", content: (physicalCondition) => {
			if(physicalCondition?.height === 0 || physicalCondition?.height === null) return;
			return (
				<span className="icon-img sm-r-5">
					{`${physicalCondition?.height} ${physicalCondition?.heightUnit}`}
				</span>
			);
		}  },
		{ label: "BMI", path: "BMI" },
		{ label: "BMICategory", path: "BMICategory" },
		{ label: "temperature", content: (physicalCondition) => {
			if(physicalCondition?.temperature === 0 || physicalCondition?.temperature === null) return;
			return (
				<span className="icon-img sm-r-5">
					{`${physicalCondition?.temperature} ${physicalCondition?.temperatureUnit}`}
				</span>
			);
		}  },
		// { label: "temperatureUnit", path: "temperatureUnit" },
		{ label: "BloodPressure", path: "bloodPressure" },
		{ label: "BloodGroup", path: "bloodGroupe" },
		{ label: "BloodGlucoseLevel", path: "bloodGlucoseLevel" },
		{ label: "heartBeat", path: "heartBeat" },
		{ label: "oxygenSaturation", path: "oxygenSaturation" },
		{ label: "RedBloodCell", path: "redBloodCell" },
		{ label: "WhiteBloodCell", path: "whiteBloodCell" },
		{ label: "Hgb", path: "Hgb" },
		{ label: "GSR", path: "GSR" },
		{ label: "GSP", path: "GSP" },
		{ label: "LeftEyeSpherical", path: "optical.leftEyeSpherical" },
		{ label: "RightEyeSpherical", path: "optical.rightEyeSpherical" },
		{ label: "SystolicBoodPressureNo", path: "systolicBoodPressureNo" },
		{ label: "DiastolicBloodPressureNo", path: "diastolicBloodPressureNo" },
		{ label: "Note", path: "note" },
	];

	render() {
		//console.log(this.columns) ;
		const { physicalConditions, onSort, sortColumn } = this.props;
		console.log("checkD con table: ", this.props.checkedFields);
		return <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={physicalConditions} />;
	}
}

export default PhysicalConditionsTable;
