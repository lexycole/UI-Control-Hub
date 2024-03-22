import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../components/panel/panel.jsx";

import DateTime from "react-datetime";

import Joi from "joi";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "react-datepicker/dist/react-datepicker.css";
import "react-datetime/css/react-datetime.css";
import Form from "../../common/form.jsx";

import _ from "lodash";
import { getClinics } from "./../../services/clinics";
import { getDoctors } from "./../../services/doctors";
import { getPatients } from "./../../services/patients";
import {
  getPhysicalCondition,
  getPhysicalConditions,
  savePhysicalCondition,
} from "./../../services/physicalconditions";
import { calculateBMI, calculateBMICategory } from "./bmiCalculator";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class PhysicalCondition extends Form {
  constructor(props) {
    super(props);

    var maxYesterday = "";
    var minYesterday = DateTime.moment().subtract(1, "day");

    this.minDateRange = (current) => {
      return current.isAfter(minYesterday);
    };
    this.maxDateRange = (current) => {
      return current.isAfter(maxYesterday);
    };
    this.minDateChange = (value) => {
      this.setState({
        maxDateDisabled: false,
      });
      maxYesterday = value;
    };

    this.state = {
      maxDateDisabled: true,
      patients: [],
      doctors: [],
      clinics: [],
      physicalConditions: [],
      data: {
        patientNo: "",
        clinicNo: "", //
        doctorNo: "", //
        age: "", //
        ethnicity: "",
        cityOfBirth: "",
        weight: "",
        weightUnit: "kgs", //
        height: "",
        heightUnit: "cm", //
        BMI: "", //
        BMICategory: "", //
        temperature: "",
        temperatureUnit: "celcius", //
        bloodPressure: "",
        bloodGroup: "",
        bloodGlucoseLevel: "",
        heartBeat: "",
        oxygenSaturation: "",
        redBloodCell: "",
        whiteBloodCell: "",
        Hgb: "",
        GSR: "",
        GSP: "",
        leftEyeSpherical: "",
        rightEyeSpherical: "",
        systolicBoodPressureNo: "",
        diastolicBloodPressureNo: "",
        // appointmentType: "", //excluded
        // sessionType: "", //excluded
        note: "", //
        createdOn: new Date(),
        // status: "", //
      },
      errors: {},
    };

    this.bloodGroupOptions = [
      { value: "Aplus", label: "A+" },
      { value: "Aminus", label: "A-" },
      { value: "Bplus", label: "B+" },
      { value: "Bminus", label: "B-" },
      { value: "ABplus", label: "AB+" },
      { value: "ABminus", label: "AB-" },
    ];

    this.handleSlider = (props) => {
      const { value, dragging, index, ...restProps } = props;
      return (
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={value}
          visible={dragging}
          placement="top"
          key={index}
        >
          <Handle value={value} {...restProps} />
        </Tooltip>
      );
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async bloodGroup() {
    this.bloodGroupoptions = this.bloodGroupOptions.map((option) => (
      <option key={option.label} value={option.value}>
        {option.value}
      </option>
    ));
  }

  async populateStatus() {
    this.statusoptions = this.statusOptions.map((option) => (
      <option key={option.label} value={option.value}>
        {option.value}
      </option>
    ));
  }

  async populateDoctors() {
    const { data: doctors } = await getDoctors();
    this.setState({ doctors });
    this.selectDoctors = this.state.doctors.map((option) => (
      <option key={option._id} value={option._id}>
        {option.doctors.contactName.last}
      </option>
    ));
  }
  async populatePatients() {
    const { data: patients } = await getPatients();
    this.setState({ patients });
    this.selectPatients = this.state.patients.map((option) => (
      <option key={option._id} value={option._id}>
        {option.patients.contactName.first +
          " " +
          option.patients.contactName.last}
      </option>
    ));
  }
  async populateClinics() {
    const { data: clinics } = await getClinics();
    this.setState({ clinics });
    this.selectClinics = this.state.clinics.map((option) => (
      <option key={option._id} value={option._id}>
        {option.companyInfo.businessName}
      </option>
    ));
  }
  async populatePhysicalConditions() {
    const { data: physicalConditions } = await getPhysicalConditions();
    this.setState({ physicalConditions });
  }

  async populatePhysicalCondition() {
    try {
      const PhysicalConditionId = this.props.match.params.id;
      if (PhysicalConditionId === "new") return;

      const { data: PhysicalCondition } = await getPhysicalCondition(
        PhysicalConditionId
      );
      console.log("=======");
      console.log(PhysicalCondition);
      console.log("=======");
      this.setState({ data: this.mapToViewModel(PhysicalCondition) });
      console.log(this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/error");
    }
  }

  async componentDidMount() {
    await this.populatePatients();
    await this.populateClinics();
    await this.populateDoctors();
    await this.populatePhysicalConditions();
    await this.populatePhysicalCondition();
    await this.bloodGroup();
  }

  schema = Joi.object({
    patientNo: Joi.any(),
    doctorNo: Joi.any().optional(),
    clinicNo: Joi.any().optional(),
    age: Joi.any().optional(),
    ethnicity: Joi.any().optional(),
    cityOfBirth: Joi.any().optional(),
    weight: Joi.any().optional(),
    weightUnit: Joi.any().optional(),
    height: Joi.any().optional(),
    heightUnit: Joi.any().optional(),
    BMI: Joi.any().optional(),
    BMICategory: Joi.any().optional(),
    temperature: Joi.any().optional(),
    temperatureUnit: Joi.any().optional(),
    bloodPressure: Joi.any().optional(),
    bloodGroup: Joi.any().optional(),
    bloodGlucoseLevel: Joi.any().optional(),
    heartBeat: Joi.any().optional(),
    oxygenSaturation: Joi.any().optional(),
    redBloodCell: Joi.any().optional(),
    whiteBloodCell: Joi.any().optional(),
    Hgb: Joi.any().optional(),
    GSR: Joi.any().optional(),
    GSP: Joi.any().optional(),
    leftEyeSpherical: Joi.any().optional(),
    rightEyeSpherical: Joi.any().optional(),
    systolicBoodPressureNo: Joi.any().optional(),
    diastolicBloodPressureNo: Joi.any().optional(),
    note: Joi.any().optional(),
    createdOn: Joi.any().optional(),
  });

  handleDateChange = (e) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    data["date"] = new Date(e);
    this.setState({ data });
    console.log(this.state.data);
  };

  handleHeightChange = (e) => {
    const data = { ...this.state.data };
    let height = e.target.value;
    let bmi = calculateBMI(
      data.weight,
      height,
      data.weightUnit,
      data.heightUnit
    );
    let bmiCategory = calculateBMICategory(bmi);

    data["height"] = height;
    data["BMI"] = bmi;
    data["BMICategory"] = bmiCategory;
    this.setState({ data });
    console.log(this.state.data);
  };

  handleWeightChange = (e) => {
    const data = { ...this.state.data };
    let weight = e.target.value;

    let bmi = calculateBMI(
      weight,
      data.height,
      data.weightUnit,
      data.heightUnit
    );
    let bmiCategory = calculateBMICategory(bmi);

    data["weight"] = weight;
    data["BMI"] = bmi;
    data["BMICategory"] = bmiCategory;

    this.setState({ data });
    console.log(this.state.data);
  };

  handlePatientChange = (e) => {
    const data = { ...this.state.data };
    let patientPhysicalConditions = this.state.physicalConditions.filter(
      (item) => item.patientNo?._id === e.target.value
    );
    let sortedpatientPhysicalConditions = _.orderBy(
      patientPhysicalConditions,
      ["createdOn"],
      ["desc"]
    );
    let selectedPatient = this.state.patients.find(
      (patient) => patient._id === e.target.value
    );
    console.log("selected patient", selectedPatient);
    let diff_ms =
      Date.now() - new Date(selectedPatient.patients.dateBirth).getTime();
    let age_dt = new Date(diff_ms);
    let age = Math.abs(age_dt.getUTCFullYear() - 1970);
    data["patientNo"] = e.target.value;
    data["age"] = age;
    if (sortedpatientPhysicalConditions.length > 0) {
      data["ethnicity"] = sortedpatientPhysicalConditions[0].ethnicity;
      data["cityOfBirth"] = sortedpatientPhysicalConditions[0].cityOfBirth;
      data["bloodGroup"] = sortedpatientPhysicalConditions[0].bloodGroupe;
    }
    this.setState({ data });
  };

  doSubmit = async (physicalCondition) => {
    try {
      const data = { ...this.state.data };
      console.log(this.state.data);

      // let [hour, minute] = data.startTime.split(":");
      // data.start = moment(data.date).add({ hours: hour, minutes: minute }).toString();
      // [hour, minute] = data.endTime.split(":");
      // data.end = moment(data.date).add({ hours: hour, minutes: minute }).toString();

      // if (data.clinicNo) {
      // 	const { data: clinic } = await getClinic(data.clinicNo);
      // 	data.clinicNo = clinic[0];
      // }
      // if (data.patientNo) {
      // 	const { data: patient } = await getPatient(data.patientNo);
      // 	data.patientNo = patient[0];
      // }
      // if (data.doctorNo) {
      // 	const { data: doctor } = await getDoctor(data.doctorNo);
      // 	data.doctorNo = doctor[0];
      // }

      // this.setState({ data });
      console.log("Data in submit: ", this.state.data);
      await savePhysicalCondition(this.state.data);
      this.props.history.push("/clinic/physicalConditions");
    } catch (ex) {
      if (ex.response) {
        const errors = { ...this.state.errors };
        errors.status = ex.response.data;
        this.setState({ errors });
        //console.log(this.state.errors);
      }
    }
  };

  mapToViewModel(PhysicalCondition) {
    return {
      _id: PhysicalCondition._id,
      createdOn: new Date(PhysicalCondition.createdOn),
      doctorNo: PhysicalCondition.doctorNo?._id,
      patientNo: PhysicalCondition.patientNo,
      clinicNo: PhysicalCondition.clinicNo?._id,
      age: PhysicalCondition.age,
      ethnicity: PhysicalCondition.ethnicity,
      cityOfBirth: PhysicalCondition.cityOfBirth,
      weight: PhysicalCondition.weight,
      weightUnit: PhysicalCondition.weightUnit,
      height: PhysicalCondition.height,
      heightUnit: PhysicalCondition.heightUnit,
      BMI: PhysicalCondition.BMI,
      BMICategory: PhysicalCondition.BMICategory,
      temperature: PhysicalCondition.temperature,
      temperatureUnit: PhysicalCondition.temperatureUnit,
      bloodPressure: PhysicalCondition.bloodPressure,
      bloodGroup: PhysicalCondition.bloodGroup,
      bloodGlucoseLevel: PhysicalCondition.bloodGlucoseLevel,
      heartBeat: PhysicalCondition.heartBeat,
      oxygenSaturation: PhysicalCondition.oxygenSaturation,
      redBloodCell: PhysicalCondition.redBloodCell,
      whiteBloodCell: PhysicalCondition.whiteBloodCell,
      Hgb: PhysicalCondition.Hgb,
      GSR: PhysicalCondition.GSR,
      GSP: PhysicalCondition.GSP,
      leftEyeSpherical: PhysicalCondition.optical.leftEyeSpherical,
      rightEyeSpherical: PhysicalCondition.optical.rightEyeSpherical,
      systolicBoodPressureNo: PhysicalCondition.systolicBoodPressureNo,
      diastolicBloodPressureNo: PhysicalCondition.diastolicBloodPressureNo,
      note: PhysicalCondition.note,
      // status: PhysicalCondition.status,
    };
  }

  render() {
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <div>
          <ol className="breadcrumb float-xl-right">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/clinic/physicalconditions">Physical contitions</Link>
            </li>
            <li className="breadcrumb-item active">
              Add/Edit PhysicalCondition
            </li>
          </ol>
          <h1 className="page-header">
            Add PhysicalCondition{" "}
            <small>PhysicalCondition-registration-form</small>
          </h1>

          <div className="row">
            <div className="col-xl-10">
              <Panel className={"w-100"}>
                <PanelHeader>Add/Edit PhysicalCondition</PanelHeader>
                <PanelBody className="panel-form">
                  <form
                    className="form-horizontal form-bordered"
                    onSubmit={this.handleSubmit}
                  >
                    {this.props.match.params.id === "new" && (
                      <div className="form-group row">
                        <label className="col-lg-4 col-form-label">
                          Patient
                        </label>
                        <div className="col-lg-8">
                          <select
                            name="patientNo"
                            id="patientNo"
                            value={data.patientNo}
                            onChange={this.handlePatientChange}
                            className="form-control"
                          >
                            <option value="">Select Patient</option>
                            {this.selectPatients}
                          </select>
                        </div>
                        {errors.patientNo && (
                          <div className="alert alert-danger">
                            {errors.patientNo}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label">Clinic</label>
                      <div className="col-lg-8">
                        <select
                          name="clinicNo"
                          id="clinicNo"
                          value={data.clinicNo}
                          onChange={this.handleChange}
                          className="form-control"
                        >
                          <option value="">Select Clinic</option>
                          {this.selectClinics}
                        </select>
                      </div>
                      {errors.clinicNo && (
                        <div className="alert alert-danger">
                          {errors.clinicNo}
                        </div>
                      )}
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label">Doctor</label>
                      <div className="col-lg-8">
                        <select
                          name="doctorNo"
                          id="doctorNo"
                          value={data.doctorNo}
                          onChange={this.handleChange}
                          className="form-control"
                        >
                          <option value="">Select Doctor</option>
                          {this.selectDoctors}
                        </select>
                      </div>
                      {errors.doctorNo && (
                        <div className="alert alert-danger">
                          {errors.doctorNo}
                        </div>
                      )}
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label">Age</label>
                      <div className="col-lg-8">
                        <input
                          className="form-control"
                          name="age"
                          type="number"
                          min={0}
                          value={data.age}
                          onChange={this.handleChange}
                          disabled
                        />
                      </div>
                      {errors.age && (
                        <div className="alert alert-danger">{errors.age}</div>
                      )}
                    </div>
                    {this.renderInput(
                      "ethnicity",
                      "Ethnicity",
                      "text",
                      "Enter ethnicity of patient"
                    )}
                    {this.renderInput(
                      "cityOfBirth",
                      "City Of Birth",
                      "text",
                      "Enter CityOfBirth"
                    )}
                    <div className="d-flex">
                      <div className="flex-fill">
                        <div className="form-group row">
                          <label
                            className="col-lg-2 col-form-label"
                            htmlFor="weight"
                          >
                            Weight
                          </label>
                          <div className="col-lg-4">
                            <input
                              name="weight"
                              className="form-control"
                              type="number"
                              min={0}
                              required={false}
                              value={data.weight}
                              onChange={this.handleWeightChange}
                            />
                          </div>
                          {errors.weight && (
                            <div className="alert alert-danger">
                              {errors.weight}
                            </div>
                          )}
                          <div className="col-lg-4">
                            <select
                              style={{ marginLeft: "-5px" }}
                              name="weightUnit"
                              id="weightUnit"
                              value={data.weightUnit}
                              onChange={this.handleChange}
                              className="form-control"
                            >
                              <option value="kgs">kgs</option>
                              <option value="lbs">lbs</option>
                            </select>
                          </div>
                          {errors.weightUnit && (
                            <div className="alert alert-danger">
                              {errors.weightUnit}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-fill">
                        <div className="form-group row">
                          <label
                            className="col-lg-2 col-form-label"
                            htmlFor="height"
                          >
                            Height
                          </label>
                          <div className="col-lg-4">
                            <input
                              name="height"
                              className="form-control"
                              type="number"
                              min={0}
                              required={false}
                              value={data.height}
                              onChange={this.handleHeightChange}
                            />
                          </div>
                          {errors.height && (
                            <div className="alert alert-danger">
                              {errors.height}
                            </div>
                          )}
                          <div className="col-lg-4">
                            <select
                              style={{ marginLeft: "-5px" }}
                              name="heightUnit"
                              id="heightUnit"
                              value={data.heightUnit}
                              onChange={this.handleChange}
                              className="form-control"
                            >
                              <option value="inch">inch</option>
                              <option value="cm">cm</option>
                            </select>
                          </div>
                          {errors.heightUnit && (
                            <div className="alert alert-danger">
                              {errors.heightUnit}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="flex-fill">
                        <div className="form-group row">
                          <label
                            className="col-lg-4 col-form-label"
                            htmlFor={"BMI"}
                          >
                            {"BMI"}
                          </label>
                          <div className="col-lg-8">
                            <div className="row row-space-10">
                              <input
                                type="number"
                                className="form-control m-b-5"
                                //placeholder="Enter email"
                                name={"BMI"}
                                id={"BMI"}
                                value={data.BMI}
                                onChange={this.handleChange}
                                placeholder={"Enter BMI"}
                                disabled
                              />
                            </div>
                            {errors.BMI && (
                              <div className="alert alert-danger">
                                {errors.BMI}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex-fill">
                        <div className="form-group row">
                          <label
                            className="col-lg-4 col-form-label"
                            htmlFor={"BMI Category"}
                          >
                            {"BMI Category"}
                          </label>
                          <div className="col-lg-8">
                            <div className="row row-space-10">
                              <input
                                type="text"
                                className="form-control m-b-5"
                                //placeholder="Enter email"
                                name={"BMI Category"}
                                id={"BMI Category"}
                                value={data.BMICategory}
                                onChange={this.handleChange}
                                placeholder={"BMI Category"}
                                disabled
                              />
                            </div>
                            {errors.BMICategory && (
                              <div className="alert alert-danger">
                                {errors.BMICategory}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        className="col-lg-2 col-form-label"
                        htmlFor="bloodGroup"
                      >
                        Temperature
                      </label>
                      <div className="col-lg-4">
                        <input
                          name="temperature"
                          className="form-control"
                          type="number"
                          min={35}
                          required={false}
                          value={data.temperature}
                          onChange={this.handleChange}
                          step={0.1}
                        />
                      </div>
                      {errors.temperature && (
                        <div className="alert alert-danger">
                          {errors.temperature}
                        </div>
                      )}
                      <label
                        className="col-lg-2 col-form-label"
                        htmlFor="temperatureUnit"
                      >
                        Temperature Unit
                      </label>
                      <div className="col-lg-4">
                        <select
                          style={{ marginTop: "15px", marginLeft: "-5px" }}
                          name="temperatureUnit"
                          id="temperatureUnit"
                          value={data.temperatureUnit}
                          onChange={this.handleChange}
                          className="form-control"
                        >
                          <option value="celcius">celcius</option>
                          <option value="fahrenheit">fahrenheit</option>
                        </select>
                      </div>
                      {errors.temperatureUnit && (
                        <div className="alert alert-danger">
                          {errors.temperatureUnit}
                        </div>
                      )}
                    </div>

                    {this.renderInput(
                      "bloodPressure",
                      "BloodPressure",
                      "number",
                      "Enter BloodPressure"
                    )}
                    <div className="form-group row">
                      <label
                        className="col-lg-4 col-form-label"
                        htmlFor="bloodGroup"
                      >
                        BloodGroup
                      </label>
                      <div className="col-lg-8">
                        <select
                          name="bloodGroup"
                          id="bloodGroup"
                          value={data.bloodGroup}
                          onChange={this.handleChange}
                          className="form-control"
                        >
                          <option value="">Select BloodGroup</option>
                          {this.bloodGroupoptions}
                        </select>
                      </div>
                      {errors.bloodGroup && (
                        <div className="alert alert-danger">
                          {errors.bloodGroup}
                        </div>
                      )}
                    </div>
                    {this.renderInput(
                      "bloodGlucoseLevel",
                      "BloodGlucoseLevel",
                      "number",
                      "Enter BloodGlucoseLevel"
                    )}
                    {this.renderInput(
                      "heartBeat",
                      "HeartBeat",
                      "number",
                      "Enter HeartBeat"
                    )}
                    {this.renderInput(
                      "oxygenSaturation",
                      "oxygenSaturation",
                      "text",
                      "Enter oxygenSaturation"
                    )}
                    <div className="d-flex">
                      <div className="flex-fill">
                        {this.renderInput(
                          "redBloodCell",
                          "RedBloodCell",
                          "number",
                          "Enter RedBloodCell"
                        )}
                      </div>
                      <div className="flex-fill">
                        {this.renderInput(
                          "whiteBloodCell",
                          "WhiteBloodCell",
                          "number",
                          "Enter WhiteBloodCell"
                        )}
                      </div>
                    </div>
                    {this.renderInput("Hgb", "Hgb", "number", "Enter Hgb")}
                    <div className="d-flex">
                      <div className="flex-fill">
                        {this.renderInput("GSR", "GSR", "number", "Enter GSR")}
                      </div>
                      <div className="flex-fill border-right">
                        {this.renderInput("GSP", "GSP", "number", "Enter GSP")}
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="flex-fill">
                        {this.renderInput(
                          "leftEyeSpherical",
                          "leftEyeSpherical",
                          "number",
                          "Enter leftEyeSpherical"
                        )}
                      </div>
                      <div className="flex-fill border-right">
                        {this.renderInput(
                          "rightEyeSpherical",
                          "rightEyeSpherical",
                          "number",
                          "Enter rightEyeSpherical"
                        )}
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="flex-fill">
                        {this.renderInput(
                          "systolicBoodPressureNo",
                          "Systolic Bood Pressure No  ",
                          "number",
                          "Enter systolicBoodPressureNo"
                        )}
                      </div>
                      <div className="flex-fill border-right">
                        {this.renderInput(
                          "diastolicBloodPressureNo",
                          "Diastolic Blood Pressure No",
                          "number",
                          "Enter diastolicBloodPressureNo"
                        )}
                      </div>
                    </div>
                    {this.renderTextarea("note", "Note", "Enter note")}

                    <div
                      className="form-group text-center"
                      style={{ padding: "10px 0px" }}
                    >
                      <button
                        type="submit"
                        disabled={this.validate}
                        className="btn btn-primary btn-sm"
                        style={{ marginRight: "10px" }}
                      >
                        Submit
                      </button>
                      <Link to="/clinic/physicalconditions">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                        >
                          Cancel
                        </button>
                      </Link>
                    </div>
                  </form>
                </PanelBody>
              </Panel>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(PhysicalCondition);
