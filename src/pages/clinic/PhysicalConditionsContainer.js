import React from "react";
import PropTypes from "prop-types";
// import "./style.css";

class PhysicalConditionsContainer extends React.Component {
	render() {
		const data = this.props.data;
		return (
			<div className="main-container">
				<h3 className="mt-10">Physical Condition</h3>
				<div className="panel-body">
					<div className="table-responsive">
						<table class="table">
							<tbody>
								<tr>
									<th scope="row">Clinic</th>
									<td className="text-muted">{data?.clinic}</td>
								</tr>
								<tr>
									<th scope="row">Avatar Doctor</th>
									<td className="text-muted">{data?.doctor}</td>
								</tr>
								<tr>
									<th scope="row">Name</th>
									<td className="text-muted">{data?.username}</td>
								</tr>
								<tr>
									<th scope="row">Date</th>
									<td className="text-muted">{data?.createdOn}</td>
								</tr>
							
								<tr>
									<th scope="row">Age</th>
									<td className="text-muted">{data?.age}</td>
								</tr>
								<tr>
									<th scope="row">Height</th>
									<td className="text-muted">
										{data?.height} {data?.heightUnit}
									</td>
								</tr>
								<tr>
									<th scope="row">Weight</th>
									<td className="text-muted">
										{data?.weight} {data?.weightUnit}
									</td>
								</tr>
								<tr>
									<th scope="row">Temperature</th>
									<td className="text-muted">
										{data?.temperature} {data?.temperatureUnit}
									</td>
								</tr>
								<tr>
									<th scope="row">BMI</th>
									<td className="text-muted">
										{data?.bmi} ({data?.BMICategory})
									</td>
								</tr>
								<tr>
									<th scope="row">GSP</th>
									<td className="text-muted">{data?.GSP}</td>
								</tr>
								<tr>
									<th scope="row">GSR</th>
									<td className="text-muted">{data?.GSR}</td>
								</tr>
								<tr>
									<th scope="row">Hgb</th>
									<td className="text-muted">{data?.Hgb}</td>
								</tr>
								<tr>
									<th scope="row">Blood Glucose Level</th>
									<td className="text-muted">{data?.bloodGlucoseLevel}</td>
								</tr>
								<tr>
									<th scope="row">Blood Group</th>
									<td className="text-muted">{data?.bloodGroupe}</td>
								</tr>
								<tr>
									<th scope="row">Blood Pressure</th>
									<td className="text-muted">{data?.bloodPressure}</td>
								</tr>
								<tr>
									<th scope="row">City of Birth</th>
									<td className="text-muted">{data?.cityOfBirth}</td>
								</tr>
								<tr>
									<th scope="row">Diastolic Blood Pressure Number</th>
									<td className="text-muted">{data?.diastolicBloodPressureNo}</td>
								</tr>
								<tr>
									<th scope="row">Sistolice Blood Pressure Number</th>
									<td className="text-muted">{data?.systolicBoodPressureNo}</td>
								</tr>
								<tr>
									<th scope="row">Ethnicity</th>
									<td className="text-muted">{data?.ethnicity}</td>
								</tr>
								<tr>
									<th scope="row">HeartBeat</th>
									<td className="text-muted">{data?.heartBeat}</td>
								</tr>
								<tr>
									<th scope="row">Left Eye Spherical</th>
									<td className="text-muted">{data?.optical.leftEyeSpherical}</td>
								</tr>
								<tr>
									<th scope="row">Right Eye Spherical</th>
									<td className="text-muted">{data?.optical.rightEyeSpherical}</td>
								</tr>
								<tr>
									<th scope="row">Oxygen Saturation</th>
									<td className="text-muted">{data?.oxygenSaturation}</td>
								</tr>
								<tr>
									<th scope="row">Red Blood Cell</th>
									<td className="text-muted">{data?.redBloodCell}</td>
								</tr>
								<tr>
									<th scope="row">Note</th>
									<td className="text-muted">{data?.note}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default PhysicalConditionsContainer;