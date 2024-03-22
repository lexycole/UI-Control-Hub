import React from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import adaptivePlugin from "@fullcalendar/adaptive";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
//import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import Form from "../../common/form.jsx";
import { apiUrl } from "../../config/config.json";
import http from "../../services/httpService";
import {
  saveAppointment,
  deleteAppointment,
} from "./../../services/appointments";
import { getClinics, getClinic } from "./../../services/clinics";
import { getDoctors, getDoctor } from "./../../services/doctors";
import { getPatients, getPatient } from "./../../services/patients";
import { getRandomColor, dateCheck } from "./../../utils/event-utils";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import Joi from "joi";
import "./c.scss";
import { Spinner } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import Select from 'react-select'

class SchedulerfCal extends Form {
  constructor(props) {
    super(props);

    const date = new Date();
    const currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1;
    currentMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth;

    this.state = {
      events: [],
      resources: [],
      clinics: [],
      doctors: [],
      patients: [],
      headerToolbar: {
        left: "prev,next ",
        center: "title",
        right: "today timeGridDay timeGridWeek listWeek",
      },
      buttonText: {
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
        listWeek: "List",
      },
      modalAdd: false,
      modalEdit: false,
      //fade: false,
      data: {
        appointmentNo : this.makeAppointmentNo() ,
        date: new Date(),
        start: "",
        end: "",
        complaint: "",
        color: "",
        patientNo: "",
        clinicNo: "",
        doctorNo: "",
        note: "",
      },
      errors: {},
      contentHeight: "auto",
      slotLabelFormat: [
        {
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: "short",
        },
        { month: "short" }, // top level of text
        { weekday: "short" },
      ],
      slotDuration: "00:05:00",
      loading: true,
    };

    this.handleSelectChange = ( { _id } , field ) => {
      console.log("SELECT ONCHANGE : " , _id)
      this.setState({ data: {...this.state.data , [field] : _id }})
    }

    this.formatPatientOption = ( { patients } ) => (
      <div>
        <div style={{ display: "flex" , alignItems:"center"}}>
          <div style={{ marginRight: "10px",}}>
            <img width={15} src={patients.imageSrc} alt="img here" />
          </div>
          <div>{patients.contactName.first + " " + patients.contactName.last + `  ( ${patients.gender} )  `}</div>
          <p style={{marginLeft:"5px" , marginBottom : "0"}}>  DOB : {moment(patients.dateBirth).format("L")}</p>
        </div>
      </div>
    );

    this.formatDoctorOption = ( { doctors } ) => (
      <div>
        <div style={{ display: "flex"}}>
          <div style={{ marginRight: "10px" }}>
            <img width={15} src={doctors.imageSrc} alt="img here" />
          </div>
          <div>{doctors.contactName.first + " " + doctors.contactName.last}</div>
        </div>
      </div>
    );

    this.formatClinicOption = ( clinic ) => (
      <div>
        <div style={{ display: "flex"}}>
          <div style={{ marginRight: "10px" }}>
            <img width={15} src={clinic.clinics.imageSrc} alt="img here" />
          </div>
          <div>{clinic.companyInfo.businessName}</div>
        </div>
      </div>
    );

    this.appointmentStatusOptions = [
      { value: "canceled<24h", label: "Canceled < 24h" },
      { value: "delayed", label: "Delayed" },
      { value: "invoiced", label: "Invoiced" },
      { value: "arrived", label: "Arrived" },
      { value: "intreatment", label: "In Treatment" },
      { value: "active", label: "Active" },
    ];

    this.appointmentTypeOptions = [
      { value: "clinic", label: "At Clinic" },
      { value: "home", label: "At home" },
      { value: "phone", label: "Telephone" },
      { value: "video", label: "Video" },
    ];

    this.sessionTypeOptions = [
      { value: "intake", label: "Intake (new complaint)" },
      { value: "follow", label: "Follow" },
    ];

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    //this.handleCreateInvoice = this.handleCreateInvoice.bind(this);
    //this.handleCreateSession = this.handleCreateSession.bind(this);
  }

  async populateCalendarEvents() {
    const { data: events } = await http.get(apiUrl + "/appointments");

    console.log("Events :" , events);
    this.setState({
      events: events.map((event) => ({
        id: event._id,
        title: event.title,
        start: event.startTime,
        end: event.endTime,
        color: event.color,
        note: event.note,
        resourceId: event.doctorNo._id,
        extendedProps: {
          avatar : event.patientNo.user.imageSrc,
          patientNo: event.patientNo,
          patientName:
            event.patientNo.user.contactName.first +
            " " +
            event.patientNo.user.contactName.last,

          gender : event.patientNo.user.gender , 
          patientDob: event.patientNo.dateBirth,

          doctorNo: event.doctorNo,
          clinicNo: event.clinicNo,
        },
        //description: 'Lecture'
      })),
    });
  }
  async populateCalendarResources() {
    const { data: resources } = await http.get(apiUrl + "/appointments");

    console.log("resources : ",resources);
    this.setState({
      resources: resources.map((resource) => ({
        id: resource.doctorNo._id,
        title:
          resource.doctorNo.user.contactName.first +
          " " +
          resource.doctorNo.user.contactName.last,
        //eventColor:resource.color,
        clinic: resource.clinicNo.companyInfo.businessName,
        avatar:resource.doctorNo.user.imageSrc,


        //children  array
      })),
    });
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
  async componentDidMount() {
    await this.populateCalendarEvents();
    await this.populateCalendarResources();
    this.setState({ loading: false });
    await this.populatePatients();
    await this.populateClinics();
    await this.populateDoctors();
    this.populateAppointmentTypes();
    this.populateSessionType();
    this.populateAppointmentStatus();

  }
  makeAppointmentNo() {
    let appointmentNo = "AP-";
    const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
    for (let i = 0; i <= 6; i++) appointmentNo += possible.charAt(Math.floor(Math.random() * possible.length));
    return appointmentNo;
  }

  populateAppointmentTypes() {
    this.appointmentTypeoptions = this.appointmentTypeOptions.map((option) => (
      <option key={option.label} value={option.value}>
        {option.value}
      </option>
    ));
  }

  populateSessionType() {
    this.sessionTypeoptions = this.sessionTypeOptions.map((option) => (
      <option key={option.label} value={option.value}>
        {option.value}
      </option>
    ));
  }

  populateAppointmentStatus() {
    this.appointmentStatusoptions = this.appointmentStatusOptions.map(
      (option) => (
        <option key={option.label} value={option.value}>
          {option.value}
        </option>
      )
    );
  }

  handleStartDate = (e , field) => {
    console.log("inside handle start date : " , e)
    const data = { ...this.state.data };

    let time = new Date ( e.getFullYear() , e.getMonth() , e.getDate() , e.getHours() , e.getMinutes() - ( e.getMinutes() % 5 ) ) ; 
    console.log("time : " , time )
    
    this.setState({ data : {...data , [field] : time } });
  };

  handleDateSelect = (selectInfo) => {
    //console.log(selectInfo);
    if (selectInfo.start < moment()) {
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect();
      return false;
    }
    this.toggleModal("Add");
    const data = { ...this.state.data };
    data.start = new Date(selectInfo.startStr);
    data.end = new Date(selectInfo.endStr);
    data.color = getRandomColor();
    this.setState({ data });
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    //console.log(getRandomColor());
  };

  handleEventClick = async (clickInfo) => {
    this.props.history.push(`/appointmentprofile/${clickInfo.event.id}`)
  };

  renderEventContent = (eventInfo) => {
    console.log("event info " , eventInfo)
    let view = eventInfo.view.type 
    return (

      view == "timeGridWeek" ? 

      <>
        <i>
          {" "}

          <img src={eventInfo.event.extendedProps.avatar} width={15} />
          {` ${eventInfo.event.extendedProps.patientName} ${` ( ${eventInfo.event.extendedProps.gender} ) `}
          ${moment( eventInfo.event.extendedProps.patientDob).format("DD/MM/YYYY")}`}

        </i>
      </>

      :

      <>
        <i>
          {" "}
          <img src={eventInfo.event.extendedProps.avatar} width={15} />
          {` ${eventInfo.event.extendedProps.patientName} ${` ( ${eventInfo.event.extendedProps.gender} ) `} || 
          ${moment(eventInfo.event.extendedProps.patientDob).format("DD/MM/YYYY")} 
          || Complaint: ${eventInfo.event.title.slice(0,70)}`}
        
        </i>
      </>

    );
  };

  resourceLabelDidMount = (info) =>{
    const img = document.createElement("img");
    const br = document.createElement("br");
    if(info.resource.extendedProps.avatar) { 
    img.src = info.resource.extendedProps.avatar;
    img.className = "img-rounded height-80";
    info.el.querySelector('.fc-col-header-cell-cushion').appendChild(br);
    info.el.querySelector('.fc-col-header-cell-cushion').appendChild(img);
    

    }
  };


  toggleModal(name) {
    switch (name) {
      case "Add":
        this.setState({ modalAdd: !this.state.modalAdd });
        break;
      case "Edit":
        this.setState({ modalEdit: !this.state.modalEdit });
        break;
      default:
        break;
    }
  }


  handleEndDate = (e) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    data["end"] = new Date(e);
    this.setState({ data });
    console.log(this.state.data);
  };
  handleDelete = async () => {
    const { data, events } = this.state;
    const originalEvents = events;
    const newEvents = events.filter((Event) => Event.id !== data.id);
    this.setState({ events: newEvents });
    this.setState({ data: {} });
    try {
      await deleteAppointment(data.id);
      this.toggleModal("Edit");
    } catch (ex) {
      if (ex.response && ex.response === 404) {
        alert("already deleted");
      }
      this.setState({ events: originalEvents });
    }
  };

  doSubmit = async () => {
    try {

        const errors = { ...this.state.errors };
        const data = { ...this.state.data };
  
        data.start = new Date ( data.date.getFullYear() , data.date.getMonth() , data.date.getDate() , data.start.getHours() , data.start.getMinutes())
        data.end = new Date ( data.date.getFullYear() , data.date.getMonth() , data.date.getDate() , data.end.getHours() , data.end.getMinutes())
  
        delete data.date 
        delete data.clinicUser 
        delete data.doctorUser
        delete data.patientUser
        this.setState({ data });
        await saveAppointment( data );
        if (data.id) {
          await this.populateCalendarEvents();
          this.toggleModal("Edit");
        }
        else
        {
          await this.populateCalendarEvents();
          this.toggleModal("Add");
        }
        this.setState({ data: {} });
        alert("Appointment Created !")
        this.props.history.push("/scheduler2");

      }
     catch (ex) {
      if (ex.response) {
        const errors = { ...this.state.errors };
        errors.complaint = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  // mapToViewModel(appointment) {
  // 	return {
  // 	  id: appointment._id,
  // 	  start: new Date(appointment.start),
  // 	  end: new Date(appointment.end),
  // 	  title: appointment.complaint
  // 	};
  //   }

  mapToViewModel(appointment) {
    return {
      //id: appointment._id,
      start: appointment.start,
      end: appointment.end,
      title: appointment.complaint,
      patientNo: appointment.patientNo,
      clinicNo: appointment.clinicNo,
      doctorNo: appointment.doctorNo,
      note: appointment.note,
    };
  }

  schema = Joi.object({
    complaint: Joi.any().optional(),
    start: Joi.date().optional(),
    end: Joi.date().optional(),
    color: Joi.any().optional(),
    patientNo: Joi.string().required(),
    clinicNo: Joi.string().required(),
    doctorNo: Joi.any().optional(),
    note: Joi.any().optional(),
  });

  render() {
    const { data, errors } = this.state;
    if (this.state.loading === true) return <Spinner animation="border" style={{
			width: "6rem", height: "6rem",border: "1px solid",position:"fixed",top:"50%",left:"50%"  }} />;
    return (
      <React.Fragment>
        <div>
          <ol className="breadcrumb float-xl-right">
            <li className="breadcrumb-item">
              <Link to="/calendar">Home</Link>
            </li>
            <li className="breadcrumb-item active">Calendar</li>
          </ol>
          <h1 className="page-header">Calendar of avatar and name of user</h1>
          <hr />
          <FullCalendar
            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
            plugins={[
              resourceTimelinePlugin,
              resourceTimeGridPlugin,
              //   bootstrapPlugin,
              interactionPlugin,
              adaptivePlugin,
              dayGridPlugin,
              listPlugin,
              timeGridPlugin,
            ]}
            //initialView="timeGridWeek"
            initialView="resourceTimeGridDay"
            resourceGroupField="clinic"
            //aspectRatio="1.8"
            editable={true}
            selectable={true}
            // themeSystem="bootstrap"
            select={this.handleDateSelect}
            eventContent={this.renderEventContent} // custom render function
            resourceLabelDidMount={this.resourceLabelDidMount}
            eventClick={this.handleEventClick}
            eventRemove={this.handleDelete}
            nowIndicator={true}
            headerToolbar={this.state.headerToolbar}
            buttonText={this.state.buttonText}
            events={this.state.events}
            resources={this.state.resources}
            slotDuration={this.state.slotDuration}
            slotLabelInterval={this.state.slotLabelInterval}
            slotLabelFormat={this.state.slotLabelFormat}
            contentHeight={this.state.contentHeight}
          />
          <form
            className="form-horizontal form-bordered"
            onSubmit={this.handleSubmit}
          >
            <Modal
              show={this.state.modalAdd} 
              onHide={() => this.toggleModal("Add")}
            >
              <Modal.Header closeButton>
                Create Appointment
              </Modal.Header>
              <Modal.Body>

              <div className="form-group row">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className="col-lg-4">
                      <DatePicker
                      minDate={new Date()}
                      renderInput={(props) => <TextField {...props} />}
                      label="date" name="date" value={data.date}
                      onChange={ (e) => this.handleStartDate( e , "date")}
                      />
                    </div>
                    <div className="col-lg-4">
                      <TimePicker renderInput={(props) => <TextField {...props} />}
                      label="Start Time" name="start" value={ data.start}
                      onChange={ (e) => this.handleStartDate( e , "start")}
                      />
                    </div>
                    <div className="col-lg-4">
                      <TimePicker renderInput={(props) => <TextField {...props} />}
                      label="End Time" name="end" value={ data.end }
                      onChange={ (e) =>this.handleStartDate( e , "end")}
                      />

                    </div>
                  </LocalizationProvider>
                  {errors.date && (
                    <div className="alert alert-danger">{errors.date}</div>
                  )}
                </div>

                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="patientNo" >Patient
                  </label>
                  <div className="col-lg-8">
                    <Select id="patientNo" options = {this.state.patients}  formatOptionLabel={this.formatPatientOption} onChange={ (data) => this.handleSelectChange(data , "patientNo")}  />
                  </div>
                  {errors.patientNo && (
                    <div className="alert alert-danger">{errors.patientNo}</div>
                  )}
                </div>
                {this.renderTextarea( "complaint", "Complaint", "Enter Complaint", "6" )}				
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="clinicNo">
                    Clinic
                  </label>
                  <div className="col-lg-8">
                    <Select id="clinicNo" options = {this.state.clinics}  formatOptionLabel={this.formatClinicOption} onChange={ (data) => this.handleSelectChange(data , "clinicNo")}  />
                  </div>
                  {errors.clinicNo && (
                    <div className="alert alert-danger">{errors.clinicNo}</div>
                  )}
                </div>
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="doctorNo">
                    Doctor
                  </label>
                  <div className="col-lg-8">
                    <Select id="doctorNo" options = {this.state.doctors}  formatOptionLabel={this.formatDoctorOption} onChange={ (data) => this.handleSelectChange(data , "doctorNo")}  />
                  </div>
                  {errors.doctorNo && (
                    <div className="alert alert-danger">{errors.doctorNo}</div>
                  )}
                </div>

                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="status" > Status
                  </label>
                  <div className="col-lg-8">
                    <select name="status" id="status" value={data.status} onChange={this.handleChange} className="form-control" >
                      <option value="">Select Status</option>
                      {this.appointmentStatusoptions}
                    </select>
                  </div>
                  {errors.status && (
                    <div className="alert alert-danger">{errors.status}</div>
                  )}
                </div>

                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="sessionType" > Select Session-type
                  </label>
                  <div className="col-lg-8">
                    <select name="sessionType" id="sessionType" value={data.sessionType} onChange={this.handleChange} className="form-control" >
                      <option value="">Select Session-type</option>
                      {this.sessionTypeoptions}
                    </select>
                  </div>
                  {errors.status && (
                    <div className="alert alert-danger">{errors.status}</div>
                  )}
                </div>

                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="appointmentType" > Select Appointment Type
                  </label>
                  <div className="col-lg-8">
                    <select name="appointmentType" id="appointmentType" value={data.appointmentType} onChange={this.handleChange} className="form-control" >
                      <option value="">Select Appointment Type</option>
                      {this.appointmentTypeoptions}
                    </select>
                  </div>
                  {errors.status && (
                    <div className="alert alert-danger">{errors.status}</div>
                  )}
                </div>
                {this.renderTextarea("note", "Note", "Enter note", "6")}
                </Modal.Body>
              <Modal.Footer>
                {/* <button className="btn btn-white" onClick={() => this.toggleModal()}>Close</button> */}

                <button className="btn btn-red" itle="Cancel the Appointment" onClick={() => this.toggleModal("Add")}>
                  <i className="ion md-close"></i>Cancel
                </button>
                <button className="btn btn-green" type="submit" title="Save the Appointment" onClick={this.doSubmit}  >
                  <i className="far fa-save"></i>
                </button>
              </Modal.Footer>
            </Modal>
          </form>

          <form
            className="form-horizontal form-bordered"
            onSubmit={this.handleSubmit}
          >
            {
              /*
                          <Modal
              isOpen={this.state.modalEdit}
              toggle={() => this.toggleModal("Edit")}
            >
              <ModalHeader
                toggle={() => {
                  this.toggleModal("Edit");
                  this.setState({ data: {} });
                }}
              >
                Edit Appointment
              </ModalHeader>
              <ModalBody>



<DateTimePicker
                  amPmAriaLabel="Select AM/PM"
                  calendarAriaLabel="Toggle calendar"
                  clearAriaLabel="Clear value"
                  dayAriaLabel="Day"
                  hourAriaLabel="Hour"
                  //maxDetail="second"
                  maxDetail="minute"
                  minuteAriaLabel="Minute"
                  monthAriaLabel="Month"
                  nativeInputAriaLabel="Date and time"
                  onChange={this.handleStartDate}
                  secondAriaLabel="Second"
                  disableCalendar={true}
                  name="start"
                  value={data.start}
                  yearAriaLabel="Year"
                />
                <DateTimePicker
                  amPmAriaLabel="Select AM/PM"
                  calendarAriaLabel="Toggle calendar"
                  clearAriaLabel="Clear value"
                  dayAriaLabel="Day"
                  hourAriaLabel="Hour"
                  maxDetail="minute"
                  minuteAriaLabel="Minute"
                  monthAriaLabel="Month"
                  nativeInputAriaLabel="Date and time"
                  onChange={this.handleEndDate}
                  secondAriaLabel="Second"
                  disableCalendar={true}
                  name="end"
                  value={data.end}
                  yearAriaLabel="Year"
                />
                {this.renderTextarea(
                  "complaint",
                  "Complaint",
                  "6",
                  "Enter Complaint"
                )}

                <div className="form-group row">
                  <label
                    className="col-lg-4 col-form-label"
                    htmlFor="patientNo"
                  >
                    Patient
                  </label>
                  <div className="col-lg-8">
                    <select
                      name="patientNo"
                      id="patientNo"
                      value={data.patientNo}
                      onChange={this.handleChange}
                      className="form-control"
                    >
                      <option value="">Select Patient</option>
                      {this.selectPatients}
                    </select>
                  </div>
                  {errors.patientNo && (
                    <div className="alert alert-danger">{errors.patientNo}</div>
                  )}
                </div>
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="clinicNo">
                    Clinic
                  </label>
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
                    <div className="alert alert-danger">{errors.clinicNo}</div>
                  )}
                </div>
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="doctorNo">
                    Doctor
                  </label>
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
                    <div className="alert alert-danger">{errors.doctorNo}</div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  className="btn btn-red"
                  title="Cancel the Appointment"
                  onClick={() => {
                    this.toggleModal("Edit");
                    this.setState({ data: {} });
                  }}
                >
                  <i className="ion md-close"></i>Cancel
                </button>
                <button
                  className="btn btn-gray"
                  title="Delete the Appointment"
                  onClick={this.handleDelete}
                >
                  <i className="far fa-trash-alt"></i>
                </button>
                <button
                  className="btn btn-lime"
                  title="Go To Treatment"
                  onClick={() => this.toggleModal("Edit")}
                >
                  <i className="ion md-close"></i>Treatment
                </button>
                <button
                  className="btn btn-blue"
                  title="Create an Invoice"
                  onClick={() => this.toggleModal("Edit")}
                >
                  <i className="ion md-close"></i>Creating Invoice
                </button>
                <button
                  className="btn btn-green"
                  title="Save the changes"
                  type="submit"
                  onClick={this.handleSubmit}
                  disabled={this.validate()}
                >
                  <i className="far fa-save"></i>
                </button>
              </ModalFooter>
            </Modal>
              */ 
            }

          </form>
        </div>
      </React.Fragment>
    );
  }
}
export default SchedulerfCal;
