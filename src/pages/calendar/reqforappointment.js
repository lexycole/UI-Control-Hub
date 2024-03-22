import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Panel,
  PanelHeader,
  PanelBody,
} from "../../components/panel/panel.jsx";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import ReactTags from "react-tag-autocomplete";
import DatePicker from "react-datepicker";
// import DatePicker from '@mui/lab/DatePicker';
import TimePicker from "@mui/lab/TimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import DateTime from "react-datetime";
import moment from "moment";
//import Select from 'react-select';
//import Select from "../../common/select";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "react-datetime/css/react-datetime.css";
import "react-datepicker/dist/react-datepicker.css";
import Joi, { date } from "joi";
import Form from "../../common/form.jsx";
import { apiUrl } from "../../config/config.json";
import http from "../../services/httpService";
import {
  getreqForAppointment,
  saveReqForAppointment,
} from "../../services/reqforappointments";
import { getClinic, getClinics } from "./../../services/clinics";
import { getDoctor, getDoctors } from "./../../services/doctors";
import { getPatient, getPatients } from "./../../services/patients";
import Select from "react-select";
import { saveAppointment } from "../../services/appointments.js";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class ReqForAppointment extends Form {
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
      data: {
        patientNo: "",
        clinicNo: "",
        doctorNo: "",
        date: new Date(),
        preferStartTime: new Date(),
        preferEndTime: new Date(new Date().getTime() + 5 * 60000),
        //chiefComplaint: "",
        title: "",
        appointmentType: "",
        note: "",
        status: "pending",
      },
      errors: {},
    };

    this.appointmentTypeOptions = [
      { value: "clinic", label: "At Clinic" },
      { value: "home", label: "At home" },
      { value: "phone", label: "Telephone" },
      { value: "video", label: "Video" },
    ];

    this.reqforappointmentStatusOptions = [
      { value: "canceled", label: "Canceled" },
      { value: "approved", label: "Approved" },
      { value: "pending", label: "Pending" },
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

    this.formatPatientOption = ({ patients }) => (
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "10px" }}>
            <img width={15} src={patients.imageSrc} alt="img here" />
          </div>
          <div>
            {patients.contactName.first +
              " " +
              patients.contactName.last +
              `  ( ${patients.gender} )  `}
          </div>
          <p style={{ marginLeft: "5px", marginBottom: "0" }}>
            {" "}
            DOB : {moment(patients.dateBirth).format("L")}
          </p>
        </div>
      </div>
    );

    this.formatDoctorOption = ({ doctors }) => (
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "10px" }}>
            <img width={15} src={doctors.imageSrc} alt="img here" />
          </div>
          <div>
            {doctors.contactName.first + " " + doctors.contactName.last}
          </div>
        </div>
      </div>
    );

    this.formatClinicOption = (clinic) => (
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "10px" }}>
            <img width={15} src={clinic.clinics.imageSrc} alt="img here" />
          </div>
          <div>{clinic.companyInfo.businessName}</div>
        </div>
      </div>
    );

    this.handleSelectChange = ({ _id }, field) => {
      console.log("SELECT ONCHANGE : ", _id);
      this.setState({ data: { ...this.state.data, [field]: _id } });
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  populateAppointmentTypes() {
    this.appointmentTypeoptions = this.appointmentTypeOptions.map((option) => (
      <option key={option.label} value={option.value}>
        {option.value}
      </option>
    ));
  }
  populateReqForAppointmentStatus() {
    this.reqforappointmentStatusoptions =
      this.reqforappointmentStatusOptions.map((option) => (
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

  async populateAppointment() {
    try {
      const AppointmentId = this.props.match.params.id;

      if (AppointmentId === "new") return;

      const { data: Appointment } = await getreqForAppointment(AppointmentId);
      console.log("populating :::>>>> ", Appointment);
      let preferStartTime = new Date(Appointment.preferStartTime);
      Appointment.preferEndTime = preferStartTime.setMinutes(
        preferStartTime.getMinutes() + 5
      );
      this.setState({ data: this.mapToViewModel(Appointment) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/error");
    }
  }

  async componentDidMount() {
    this.populateAppointmentTypes();
    this.populateReqForAppointmentStatus();
    await this.populatePatients();
    await this.populateClinics();
    await this.populateDoctors();
    await this.populateAppointment();
  }

  schema = Joi.object({
    patientNo: Joi.string(),
    doctorNo: Joi.string().optional(),
    clinicNo: Joi.string().required(),
    date: Joi.date().required(),
    preferStartTime: Joi.date(),
    preferEndTime: Joi.date().optional(),
    //chiefComplaint: Joi.string().optional(),
    title: Joi.string().optional(),
    appointmentType: Joi.string().optional(),
    note: Joi.any().optional(),
    status: Joi.string().optional(),
  });

  handleDateChange = (e) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    data["date"] = new Date(e);
    this.setState({ data });
    console.log(this.state.data);
  };

  makeAppointmentNo() {	
    let appointmentNo = "AP-";	
    const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";	
    for (let i = 0; i <= 6; i++) appointmentNo += possible.charAt(Math.floor(Math.random() * possible.length));	
    return appointmentNo;	
  }

  doSubmit = async (reqforappointment) => {
    try {
      const data = { ...this.state.data };

      // data.start = new Date(data.date.getFullYear(), data.date.getMonth(), data.date.getDate(), data.start.getHours(), data.start.getMinutes())
      // data.end = new Date(data.date.getFullYear(), data.date.getMonth(), data.date.getDate(), data.end.getHours(), data.end.getMinutes())

      // delete data.date

      if (data.status === "approved") {
        let appointmentData = {...this.state.data}
        appointmentData.appointmentNo = this.makeAppointmentNo()
        appointmentData.complaint = appointmentData.title
        appointmentData.start = appointmentData.preferStartTime
        appointmentData.end = appointmentData.preferEndTime
        appointmentData.status = "active"
        delete appointmentData.date
        delete appointmentData.preferStartTime
        delete appointmentData.preferEndTime
        delete appointmentData.title
        delete appointmentData._id
      //   let [hour, minute] = appointmentData.preferStartTime.split(":");
      //   appointmentData.start = moment(appointmentData.date).add({ hours: hour, minutes: minute }).toString();
      // [hour, minute] = appointmentData.preferEndTime.split(":");
      // appointmentData.end = moment(appointmentData.date).add({ hours: hour, minutes: minute }).toString();
        await saveAppointment(appointmentData);
      }

      this.setState({ data });
      await saveReqForAppointment(data);
      this.props.history.push("/clinic/reqforappointments");
    } catch (ex) {
      console.error(ex);
      if (ex.response) {
        const errors = { ...this.state.errors };
        errors.status = ex.response.data;
        this.setState({ errors });
        console.log(this.state.errors);
      }
    }
  };

  handleDateChange = (e) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    data["date"] = new Date(e);
    this.setState({ data });
    console.log(this.state.data);
  };

  mapToViewModel(ReqForAppointment) {
    return {
      _id: ReqForAppointment._id,
      date: new Date(ReqForAppointment.date),
      preferStartTime: new Date(ReqForAppointment.preferStartTime),
      preferEndTime: new Date(ReqForAppointment.preferEndTime),
      appointmentType: ReqForAppointment.appointmentType,
      doctorNo: ReqForAppointment.doctorNo,
      patientNo: ReqForAppointment.patientNo,
      clinicNo: ReqForAppointment.clinicNo,
      note: ReqForAppointment.note,
      status: ReqForAppointment.status,
      title: ReqForAppointment.title,
    };
  }
  render() {
    const { data, errors } = this.state;
    console.log("appointment data : ", data);
    return (
      <React.Fragment>
        <div>
          <ol className="breadcrumb float-xl-right">
            <li className="breadcrumb-item">
              <Link to="/form/plugins">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/form/plugins">Clinics</Link>
            </li>
            <li className="breadcrumb-item active">
              Add/Edit Request For Appointment
            </li>
          </ol>
          <h1 className="page-header">
            Add Request for Appointment{" "}
            <small>Request for Appointment-registration-form</small>
          </h1>

          <div className="row">
            <div className="col-xl-10">
              <Panel>
                <PanelHeader>Add/Edit Request for Appointment</PanelHeader>
                <PanelBody className="panel-form">
                  <form
                    className="form-horizontal form-bordered"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label">Patient</label>
                      <div className="col-lg-8">
                        <Select
                          id="patientNo"
                          isDisabled={this.props.match.params.id !== "new"}
                          value={this.state.patients.find(
                            (el) => el._id === this.state.data.patientNo
                          )}
                          options={this.state.patients}
                          formatOptionLabel={this.formatPatientOption}
                          onChange={(data) =>
                            this.handleSelectChange(data, "patientNo")
                          }
                        />
                      </div>
                      {errors.patientNo && (
                        <div className="alert alert-danger">
                          {errors.patientNo}
                        </div>
                      )}
                    </div>
                    <div className="form-group row">
                      <label
                        className="col-lg-4 col-form-label"
                        htmlFor="doctorNo"
                      >
                        Select Doctor
                      </label>
                      <div className="col-lg-8">
                        <Select
                          id="doctorNo"
                          value={this.state.doctors.find(
                            (el) => el._id === this.state.data.doctorNo
                          )}
                          options={this.state.doctors}
                          formatOptionLabel={this.formatDoctorOption}
                          onChange={(data) =>
                            this.handleSelectChange(data, "doctorNo")
                          }
                        />
                      </div>

                      {errors.doctorNo && (
                        <div className="alert alert-danger">
                          {errors.doctorNo}
                        </div>
                      )}
                    </div>
                    <div className="form-group row">
                      <label
                        className="col-lg-4 col-form-label"
                        htmlFor="clinicNo"
                      >
                        Select Clinic
                      </label>
                      <div className="col-lg-8">
                        <Select
                          id="clinicNo"
                          isDisabled={this.props.match.params.id !== "new"}
                          value={this.state.clinics.find(
                            (el) => el._id === this.state.data.clinicNo
                          )}
                          options={this.state.clinics}
                          formatOptionLabel={this.formatClinicOption}
                          onChange={(data) =>
                            this.handleSelectChange(data, "clinicNo")
                          }
                        />
                      </div>
                      {errors.clinicNo && (
                        <div className="alert alert-danger">
                          {errors.clinicNo}
                        </div>
                      )}
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label" htmlFor="date">
                        Date
                      </label>
                      <div className="col-lg-8">
                        <DatePicker
                          onChange={this.handleDateChange}
                          id={data.date}
                          value={data.date}
                          selected={data.date}
                          inputProps={{ placeholder: "Datepicker" }}
                          className="form-control"
                        />
                        {errors.date && (
                          <div className="alert alert-danger">
                            {errors.date}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label">
                        Select Start-Time
                      </label>
                      <div
                        className="col-lg-8"
                        style={{ borderRight: "1px solid #dcdde1" }}
                      >
                        <DatePicker
                          id={data.startTime}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={this.props.match.params.id !== "new" ? 5 : 15}
                          timeCaption="time"
                          dateFormat={"h:mm:aa"}
                          selected={data.preferStartTime}
                          className="form-control"
                          onChange={(newDate) => {
                            const data = { ...this.state.data };
                            data.preferStartTime = newDate;
                            this.setState({ data });
                          }}
                        />
                        {errors.date && (
                          <div className="alert alert-danger">
                            {errors.date}
                          </div>
                        )}
                      </div>
                      
                    </div>
                    <div className="form-group row">
                     
                      
                      {/* end time */}
                      <label className="col-lg-4 col-form-label">
                        Select End-Time
                      </label>
                      <div className="col-lg-8">
                        <DatePicker
                          id={data.endTime}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={this.props.match.params.id !== "new" ? 5 : 15}
                          timeCaption="time"
                          onChange={(newDate) => {
                            const data = { ...this.state.data };
                            data.preferEndTime = newDate;
                            this.setState({ data });
                          }}
                          dateFormat={"h:mm:aa"}
                          selected={data.preferEndTime}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {this.renderTextarea("title", "Title", "Enter Title")}

                    <div className="form-group row">
                      <label
                        className="col-lg-4 col-form-label"
                        htmlFor="appointmentType"
                      >
                        Select Appointment-type
                      </label>
                      <div className="col-lg-8">
                        <select
                          name="appointmentType"
                          id="appointmentType"
                          value={data.appointmentType}
                          onChange={this.handleChange}
                          className="form-control"
                        >
                          <option value="">Select Appointment-type</option>
                          {this.appointmentTypeoptions}
                        </select>
                      </div>
                      {errors.appointmentType && (
                        <div className="alert alert-danger">
                          {errors.appointmentType}
                        </div>
                      )}
                    </div>

                    {/*<div className="form-group row">
                      <label className="col-lg-4 col-form-label" htmlFor="sessionType" >
                        Select Session-type
                      </label>
                      <div className="col-lg-8">
                        <select name="sessionType" id="sessionType" value={data.sessionType} onChange={this.handleChange} className="form-control" >
                          <option value="">Select Session-type</option>
                          {this.sessionTypeoptions}
                        </select>

                      </div>
                      {errors.sessionType && (
                        <div className="alert alert-danger">
                          {errors.sessionType}
                        </div>
                      )}
                      </div>*/}

                    {this.renderTextarea("note", "Note", "* Enter Note")}

                    {this.props.match.params.id !== "new" && (
                      <div className="form-group row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="status"
                        >
                          Select Status
                        </label>
                        <div className="col-lg-8">
                          <select
                            name="status"
                            id="status"
                            value={data.status}
                            onChange={this.handleChange}
                            className="form-control"
                          >
                            <option value="">Select Status</option>
                            {this.reqforappointmentStatusoptions}
                          </select>
                        </div>
                        {errors.status && (
                          <div className="alert alert-danger">
                            {errors.status}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="form-group row">
                      <div className="col-lg-8">
                        <button
                          type="submit"
                          disabled={this.validate}
                          className="btn btn-primary btn-block btn-lg"
                        >
                          Submit
                        </button>
                      </div>
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

export default withRouter(ReqForAppointment);
