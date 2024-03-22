import React from "react";
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// import listPlugin from "@fullcalendar/list";
// import bootstrapPlugin from "@fullcalendar/bootstrap";
//import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";

import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Alert from "react-bootstrap/Alert";
import { Image } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Form from "../../common/form.jsx";
import { apiUrl } from "../../config/config.json";
import http from "../../services/httpService";
import auth from "../../services/authservice";
import { getUser } from "../../services/users";
import {
  saveAppointment,
  deleteAppointment,
} from "./../../services/appointments";
import { getClinics, getClinic } from "./../../services/clinics";
import { getDoctors, getDoctor } from "./../../services/doctors";
import { getPatients, getPatient } from "./../../services/patients";
import { getRandomColor, dateCheck } from "./../../utils/event-utils";
import moment from "moment";

//import DateTimePicker from "react-datetime-picker";
//import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
//import "react-clock/dist/Clock.css";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

import Joi from "joi";
import ReactCalendar from "react-calendar";
import { Typography } from "@material-ui/core";
import { FormControlLabel, FormGroup, Switch } from "@material-ui/core";
import "./c.scss";
import AgendaView from "./agenda.js";
import TimePicker from "react-time-picker";
//import { DatePicker } from "antd";
import './c.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useState } from "react";


class Calendar extends Form {
  constructor(props) {
    super(props);


    // const date = new Date();
    // const currentYear = date.getFullYear();
    // let currentMonth = date.getMonth() + 1;
    // currentMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth;

    this.state = {
      eventColors: {},
      currentUser: {
        firstname: "",
        lastName: "",
        username: "",
        imageSrc: "",
      },
      availableColors: [],
      bg: " ",
      events: [],
      clinics: [],
      doctors: [],
      patients: [],
      headerToolbar: {
        left: "dayGridMonth,timeGridWeek,timeGridDay",
        center: "title",
        right: "prev,next today",
      },
      buttonText: {
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
      },
      modalAdd: false,
      modalEdit: false,
      //fade: false,
      data: {
        start: new Date(),
        end: new Date(),
        //date: new Date(),
        complaint: "",
        color: "",
        patientNo: "",
        clinicNo: "",
        doctorNo: "",
        appointmentType: "clinic",
        appointmentNo: "",
        sessionType: "",
        note: "",
        startTime: "",
        endTime: "",
        status: "active",

      },
      errors: {},
      //slotDuration: "00:05:00",
      contentHeight: "auto",
      //contentHeight: 800,
      aspectRatio: 2,
      slotDuration: "00:05:00",
      checked: false,
      //scrollRef: null,
      scrollRef: React.createRef(),
      scrollUp: false,
      scrollToTime: moment()
        .subtract(moment.duration("01:00:15"))
        .format("HH:mm"),
    };

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

    this.handleSelectChange = ({ _id }, field) => {
      console.log("SELECT ONCHANGE : ", _id);
      this.setState({ data: { ...this.state.data, [field]: _id } });
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

    this.toggleChecked = this.toggleChecked.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.myhandleDate = this.myhandleDate.bind(this);
    this.handleScrollUp = this.handleScrollUp.bind(this);
    this.calendarComponentRef = React.createRef();
    this.agendaComponentRef = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
    this.getInitialDate = this.getInitialDate.bind(this);
    //this.autoScrollRef = React.createRef();
    //this.handleCreateInvoice = this.handleCreateInvoice.bind(this);
    //this.handleCreateSession = this.handleCreateSession.bind(this);
  }







  /*  componentDidMount = () => {
     if (!this.state.checked) {
       setTimeout(() => {
         this.scrollRef.current.scrollTop = parseInt(getComputedStyle(document.querySelector(".fc-timegrid-now-indicator-arrow")).top.replace(" px", "")) - 100;
         // document.querySelector(".indicator").scrollIntoView();
       }, 100);
     }
   }; */

  getInitialDate() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0o0);
  }

  async populateCalendarEvents() {
    const { data: events } = await http.get(apiUrl + "/appointments");

    console.log(events);
    this.setState({
      events: events.map((event) => ({
        id: event._id,
        //title: event.complaint,
        title: event.title,
        start: event.startTime,
        end: event.endTime,
        color: event.color,
        appointmentType: event.appointmentType,
        appointmentNo: event.appointmentNo,
        sessionType: event.sessionType,
        note: event.note,
        extendedProps: {
          patientNo: event.patientNo,
          patientName:
            event.patientNo?.user?.contactName?.first +
            " " +
            (event.patientNo?.user?.contactName?.last || ""),
          patientDob: event.patientNo?.user?.dateBirth,
          doctorNo: event.doctorNo,
          clinicNo: event.clinicNo,
        },

        //description: 'Lecture'
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
        {option.patients.contactName.last}
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

  makeAppointmentNo() {
    let appointmentNo = "AP-";
    const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
    for (let i = 0; i <= 6; i++)
      appointmentNo += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
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

  mapToViewUserModel(user) {
    return {
      _id: user._id,
      username: user.username,
      firstName: user.contactName.first,
      lastName: user.contactName.last,
      imageSrc: user.imageSrc,
    };
  }
  calendarRef = React.createRef();

  async componentDidMount() {
    
    await this.populateCalendarEvents();
    await this.populatePatients();
    await this.populateClinics();
    await this.populateDoctors();
    this.populateAppointmentTypes();
    this.populateSessionType();
    this.populateAppointmentStatus();

    try {
      const user = auth.getProfile();
      if (user) {
        const { data: currentUser } = await getUser(user._id);
        this.setState({ currentUser: this.mapToViewUserModel(currentUser) });
      }
    } catch (ex) {
      console.log(ex);
    }
  }




  handleScroll() {
    //if (e.target.scrollTop > 200) {
    if (this.scrollRef.current.scrollTop > 200) {
    } else {
      this.setState({ scrollUp: false });
    }
  }

  // componentWillMount() {
  //   window.addEventListener("scroll", this.handleScroll)
  // }

  handleScrollUp() {
    //window["scrollTo"]({ top: 0, behavior: "smooth" })
    this.state.scrollRef.current["scrollTo"]({ top: 0, behavior: "smooth" });
  }
  

  


  renderEventContent = (eventInfo) => {
   
    return (
      <div>
        <i>
          <img
            style={{ height: "16px", objectFit: "contain" }}
            src={eventInfo.event.extendedProps.patientNo.user.imageSrc}
            alt={eventInfo.event.extendedProps.title}
          />
        </i>
        <i style={{ color: 'black' }}>
          <i> {` ${eventInfo.event.extendedProps.patientName}`}</i>
          <i>{` ${moment(eventInfo.event.extendedProps.patientDob).format("L")} `}</i>
          <i> {` ( ${eventInfo.event.extendedProps.gender} ) `}</i>
          <br />
          <i style={{ marginTop: "5px", display: "block" }}>{`Complaint : ${eventInfo.event.title.slice(0, 20)} `}</i>
          <Link to={eventInfo.event.url}></Link>
        </i>
      </div>
    );
  };




  toggleModal(name) {
    switch (name) {
      case "Add":
        this.setState({ modalAdd: !this.state.modalAdd });
        this.setState({ data: {} });
        break;
      case "Edit":
        this.setState({ modalEdit: !this.state.modalEdit });
        break;
      default:
        break;
    }
  }
  /*   async componentDidMount() {
    await this.populateCalendarEvents();
    await this.populatePatients();
    await this.populateClinics();
    await this.populateDoctors();
  }
 */
  handleDateSelect = (selectInfo) => {
    //const date = new Date();
    if (selectInfo.start < moment()) {
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect();
      return false;
    }
    this.toggleModal("Add");
    const data = { ...this.state.data };
    data.start = new Date(selectInfo.startStr);
    data.end = new Date(selectInfo.endStr);
    data.date = new Date(selectInfo.startStr);
    data.color = getRandomColor();
    this.setState({ data });
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    console.log(getRandomColor());
  };

  handleEventClick = async (clickInfo) => {
    // this.toggleModal("Edit");
    // const data = { ...this.state.data };
    // data.start = new Date(clickInfo.event.startStr);
    // data.end = new Date(clickInfo.event.endStr);
    // data.complaint = clickInfo.event.title;
    // data.patientNo = clickInfo.event.extendedProps.patientNo._id;
    // data.doctorNo = clickInfo.event.extendedProps.doctorNo._id;
    // data.clinicNo = clickInfo.event.extendedProps.clinicNo._id;
    // data.appointmentType = clickInfo.event.appointmentType;
    // data.sessionType = clickInfo.event.sessionType;
    // data.note = clickInfo.event.note;
    // data.appointmentNo = clickInfo.event.appointmentNo;
    // //data.color = clickInfo.event.extendedProps.color;
    // data.id = clickInfo.event.id;
    // this.setState({ data });
    this.props.history.push(`/appointmentprofile/${clickInfo.event.id}`);
  };

  // renderEventContent = (eventInfo) => {

  //   let viewType = eventInfo.event._context.viewApi.type
  //   return (
  //     <Alert variant="secondary" style={{ padding: 0 }}>
  //       <img
  //         src="https://i.pravatar.cc/25"
  //         style={{ height: "inherit" }}
  //         alt={eventInfo.event.extendedProps.patientName}
  //       />{" "}
  //       |{" "}
  //       {` ${eventInfo.event.extendedProps.patientName} ${moment(
  //         eventInfo.event.extendedProps.patientDob
  //       ).format("DD/MM/YYYY")}`}{" "}
  //       | {` ${eventInfo.event.title} `}
  //       {/* <b>{` ${eventInfo.timeText}`}</b> */}
  //     </Alert>
  //   );
  // };


  // renderEventContent(eventInfo) {
  //   const viewType = eventInfo.event._context.viewApi.type;
  //   const patientNo = eventInfo.event.extendedProps?.patientNo;
  //   const patientName = eventInfo.event.extendedProps?.patientName;
  //   const patientDob = eventInfo.event.extendedProps?.patientDob;
  //   const gender = eventInfo.event.extendedProps?.patientNo?.user?.gender;
  //   const imageSrc = eventInfo.event.extendedProps.patientNo.user.imageSrc;
  //   const coloredEvents = eventInfo.map((event, index) => ({
  //     ...event,
  //     backgroundColor: availableColors[index % availableColors.length],
  //   }));

  //   const backgroundColor = coloredEvents.find((event) => event.id === eventInfo.event.id)?.backgroundColor;


  //   return viewType === "dayGridMonth" ? (
  //     <Alert
  //       variant="secondary"
  //       style={{ padding: 0, position: "relative" }}
  //       onMouseEnter={() => this.setState({ monthStyle: "inline" })}
  //       onMouseLeave={() => this.setState({ monthStyle: "none" })}
  //     >
  //       <img
  //         src={eventInfo.event.extendedProps.patientNo.user.imageSrc}
  //         width={"20px"}
  //         style={{ height: "inherit" }}
  //         alt={eventInfo.event.extendedProps.patientName}
  //       />{" "}
  //       |{" "}
  //       <div
  //         style={{
  //           display: `${this.state.monthStyle}`,
  //           position: "absolute",
  //           top: "-2px",
  //           left: "0",
  //           backgroundColor,
  //           color: "white",
  //           padding: "5px",
  //         }}
  //       >
  //         <p style={{ marginBottom: "5px" }}>{patientName}</p>
  //         <p style={{ marginBottom: "5px" }}>
  //           {moment(patientDob).format("DD/MM/YYYY")} {gender && `( ${gender} )`}
  //         </p>
  //       </div>
  //     </Alert>
  //   ) : (
  //     <Alert
  //       variant="secondary"
  //       style={{ padding: 0, backgroundColor: "transparent" }}
  //     >
  //       <div style={{ display: "block", backgroundColor, color: "white" }}>
  //         <img
  //           src={eventInfo.event.extendedProps.patientNo.user.imageSrc}
  //           width={"20px"}
  //           style={{ height: "inherit" }}
  //           alt={eventInfo.event.extendedProps.patientName}
  //         />
  //         {patientName &&
  //           `${patientName} ${moment(patientDob).format("DD/MM/YYYY")} ${gender ? `( ${gender} )` : ""
  //           }`}
  //         {viewType === "timeGridDay" && (
  //           <p style={{ margin: "5px 0px 5px 0" }}>
  //             Complaint: {eventInfo.event.title.slice(0, 60)}...
  //           </p>
  //         )}
  //       </div>
  //     </Alert>
  //   );
  // }





  handleDateChange = (e) => {
    const errors = { ...this.state.errors };
    const obj = { ["date"]: e };

    const data = { ...this.state.data };
    //data['date'] = e;
    data.date = e;
    this.setState({ data });
    //console.log(this.state.data);
  };

  handleStartDate = (e) => {
    // const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    // let str = FullCalendar.pluginsformatDate(e, {
    // 	month: 'long',
    // 	year: 'numeric',
    // 	day: 'numeric',
    // 	timeZoneName: 'short',
    // 	// timeZone: 'UTC',
    // 	// locale: 'es'
    //   });
    //console.log(Date.parse(e));
    data["start"] = new Date(e);

    this.setState({ data });
    console.log(this.state.data);
  };
  toggleChecked = () => {
    this.setState({
      checked: !this.state.checked,
    });
  };
  handleEndDate = (e) => {
    // const errors = { ...this.state.errors };
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
      errors.complaint = "";

      const { events, data } = this.state;

      data.start = new Date(data.start); // Convert start time to a Date object
      data.end = new Date(data.end); // Convert end time to a Date object

      data.appointmentNo = this.makeAppointmentNo();
      delete data.date;
      delete data.scrollUp;
      console.log("data submit", data);

      const slotTaken = events.filter((event) => {
        const { clinicNo, doctorNo } = event.extendedProps;

        const dataStart = moment(data.start).valueOf();
        const dataEnd = moment(data.end).valueOf();

        let eventStart = moment(event.start).valueOf();
        let eventEnd = moment(event.end).valueOf();

        // This logic is used if the value of event.start > event.end
        if (eventEnd < eventStart) {
          let temp = eventStart;
          eventStart = eventEnd;
          eventEnd = temp;
        }

        if (dataStart < eventStart && dataEnd > eventEnd) {
          if (
            clinicNo._id !== data.clinicNo &&
            doctorNo._id !== data.doctorNo
          ) {
            return false;
          }
          return true;
        }

        if (
          (dataStart >= eventStart && dataStart < eventEnd) ||
          (dataEnd > eventStart && dataEnd <= eventEnd)
        ) {
          if (
            clinicNo._id !== data.clinicNo &&
            doctorNo._id !== data.doctorNo
          ) {
            return false;
          }
          return true;
        }

        return false;
      });

      if (slotTaken.length !== 0) {
        toast.error("Slot is not available.");
        return;
      }

      // Save the start time and end time in the Appointment profile
      data.startTime = moment(data.start).format("h:mm A");
      data.endTime = moment(data.end).format("h:mm A");

      this.setState({ data });
      await saveAppointment(data);
      toast.success("Appointment Created !");
      //this.props.history.push("/calendar");
      this.setState({ modalAdd: false });
      this.setState({ modalEdit: false });
      await this.populateCalendarEvents();
      this.setState({ data: {} });
    } catch (ex) {
      if (ex.response) {
        const errors = { ...this.state.errors };
        errors.complaint = ex.response.data;
        this.setState({ errors });
      }
    }
  };


  tileClassName = ({ date, view }) => {
    // Add class to tiles in month view only
    console.log("date and view ", date, view);

    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (date.getDay() === 0) {
        return "itsSunday";
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
      appointmentNo: appointment.appointmentNo,
      appointmentType: appointment.appointmentType,
      sessionType: appointment.sessionType,
      note: appointment.note,
      status: appointment.status,
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
    appointmentType: Joi.any().optional(),
    appointmentNo: Joi.any().optional(),
    sessionType: Joi.any().optional(),
    //patientUser: Joi.any().optional(),
    //clinicUser: Joi.any().optional(),
    //doctorUser: Joi.any().optional(),
    note: Joi.any().optional(),
    status: Joi.any().optional(),
  });
  myhandleDate = (event) => {
    let calendarApi = this.state.checked
      ? this.agendaComponentRef.current?.getApi()
      : this.calendarComponentRef.current?.getApi();
    calendarApi.gotoDate(event); // call a method on the Calendar object
  };







  renderEvent = (eventInfo) => {
    return (
      <>
        <i>
          <img
            style={{ height: "16px", objectFit: "contain" }}
            src={eventInfo.event.extendedProps.imageUrl}
            alt={eventInfo.event.extendedProps.title}
          />
        </i>
        <i> {` ${eventInfo.event.extendedProps.patientName}`}</i>
        <i>{` ${eventInfo.event.title} `}</i>
      </>
    );
  };
  handleStartTimeChange = (newDate) => {
    const data = { ...this.state.data };
    const fiveMinutesLater = new Date(newDate.getTime() + 5 * 60000); // Add 5 minutes to the selected start time
    data.start = newDate;
    data.end = fiveMinutesLater;
    this.setState({ data });
  };

  render() {
    const today = new Date();
    const { data, errors } = this.state;
    console.log("APPOINTMENT STATE : ", data);
    function updateEventClasses() {
      const rows = document.querySelectorAll('.fc tr');
      rows.forEach(row => {
        const tdElements = row.querySelectorAll('td');
        if (tdElements.length > 1) {
          const secondTd = tdElements[1]; // Select the second <td> element

          const dataTimeValue = secondTd.getAttribute('data-time');
          const now = new Date();
          const hours = now.getHours();
          const minutes = now.getMinutes();
          const seconds = now.getSeconds();

          const currentTime = new Date(0, 0, 0, hours, minutes, seconds);

          if (dataTimeValue && dataTimeValue.includes(':')) {
            const [eventHours, eventMinutes, eventSeconds] = dataTimeValue.split(':');
            const eventDataTime = new Date(0, 0, 0, eventHours, eventMinutes, eventSeconds);

            if (eventDataTime.getTime() < currentTime.getTime()) {
              secondTd.classList.add('past-event');
              secondTd.classList.remove('future-event');
              // console.log('Past-Gray');
            } else {
              secondTd.classList.add('future-event');
              secondTd.classList.remove('past-event');
              // console.log('Future-Yellow');
            }
          }
        }
      });
    }

    // Run the updateEventClasses function every second (1000 milliseconds)
    setInterval(updateEventClasses, 1000);







    return (
      <React.Fragment>
        <div style={{ maxHeight: "90vh", padding: "0", margin: "0" }}>
          {this.state.scrollUp &&
            !this.state.modalEdit &&
            !this.state.modalAdd && (
              <button
                style={{
                  width: "90px",
                  backgroundColor: "purple",
                  left: "28%",
                  padding: "8px",
                  position: "fixed",
                  bottom: "1rem",
                  zIndex: "9999",
                  borderRadius: "4px",
                  fontSize: "15px",
                  border: "none",
                  outline: "none",
                  color: "white",
                  opacity: "0.7",
                }}
                onClick={this.handleScrollUp}>
                GO UP{" "}
              </button>
            )}

          {console.log(this.state.currentUser, " user")}
          <ol className="breadcrumb float-xl-right">
            <li className="breadcrumb-item">
              <Link to="/calendar">Home</Link>
            </li>
            <li className="breadcrumb-item active">Calendar</li>
          </ol>
          <h1 className="page-header">
            <Typography variant="body1">
              <img
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                src={this.state.currentUser.imageSrc}
                alt=""
              />
              <span className="d-none d-md-inline">
                {this.state.currentUser.firstName}{" "}
                {this.state.currentUser.lastName}
              </span>
            </Typography>
          </h1>

          <hr />

          <div class="row">
            <div className="col-4">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={this.state.checked}
                      onChange={this.toggleChecked}
                      name="checked"
                    />
                  }
                  label={`Switch to  ${this.state.checked ? "calendar" : "agenda"
                    }`}
                />
                <ReactCalendar
                  tileClassName={this.tileClassName}
                  onChange={(event) => this.myhandleDate(event)}
                  showWeekNumbers
                />

              </FormGroup>
            </div>
            {/* <div className="col-8" style={{ height: "fit-content" }}> */}

            <div
              className="col-8"
              onScroll={this.handleScroll}
              ref={this.state.scrollRef}
              style={{ height: "80vh", overflow: "scroll" }}>

              {this.state.checked ? (
                <AgendaView
                  ref={this.agendaComponentRef}
                  toggleModal={this.toggleModal}
                  toggleChecked={this.toggleChecked}
                />
              ) : (
                <div style={{ overflow: "scroll" }}>

                  <FullCalendar
                    height={"500px"}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    ref={this.calendarComponentRef}
                    initialView="timeGridDay"
                    themeSystem="standard"
                    editable={true}
                    selectable={true}
                    select={this.handleDateSelect}
                    eventContent={this.renderEventContent}
                    eventClick={this.handleEventClick}
                    eventRemove={this.handleDelete}
                    nowIndicator={true}
                    nowIndicatorClassNames="indicator"
                    headerToolbar={this.state.headerToolbar}
                    buttonText={this.state.buttonText}
                    events={this.state.events}
                    now={new Date()}
                    slotDuration={this.state.slotDuration}
                    aspectRatio={this.state.aspectRatio}
                    scrollTime={new Date().getHours().toString() + ":00:00"}


                  />

                </div>




              )}

            </div>
          </div>


          {/* <Button color="danger" onClick={this.toggleModal}>Launch</Button> */}
          <form
            className="form-horizontal form-bordered"
            onSubmit={this.handleSubmit}>
            <Modal
              show={this.state.modalAdd}
              onHide={() => this.toggleModal("Add")}>
              <Modal.Header closeButton>Create Appointment</Modal.Header>
              <Modal.Body>

                <div className="form-group row">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className="col-lg-4">
                      {/* <DatePicker
                        minDate={new Date()}
                        renderInput={(props) => <TextField {...props} />}
                        label="date" name="date" 
                        value={data.start.toISOString().slice(0, 10)}
                       
                       onChange={(e) => this.handleStartDate(e, "date")}
                      /> */}
                      <DatePicker
                        selected={data.date}
                        onChange={(e) => this.handleDateChange(e)}
                      //onCalendarClose={handleCalendarClose}
                      //onCalendarOpen={handleCalendarOpen}
                      />
                    </div>
                    <div className="col-lg-4">
                      <TimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Start Time"
                        name="start"
                        value={data.start}
                        onChange={(e) => this.handleStartDate(e, "start")}
                      />
                    </div>
                    <div className="col-lg-4">
                      <TimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="End Time"
                        name="end"
                        value={data.end}
                        onChange={(e) => this.handleStartDate(e, "end")}
                      />
                    </div>
                  </LocalizationProvider>
                  {errors.date && (
                    <div className="alert alert-danger">{errors.date}</div>
                  )}
                </div>

                <div className="form-group row">
                  <label
                    className="col-lg-4 col-form-label"
                    htmlFor="patientNo">
                    Patient
                  </label>
                  <div className="col-lg-8">
                    <Select
                      id="patientNo"
                      options={this.state.patients}
                      formatOptionLabel={this.formatPatientOption}
                      onChange={(data) =>
                        this.handleSelectChange(data, "patientNo")
                      }
                    />
                  </div>
                  {errors.patientNo && (
                    <div className="alert alert-danger">{errors.patientNo}</div>
                  )}
                </div>

                {/* <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="patientNo" >Patient
                  </label>
                  <div className="col-lg-8">
                    <select name="patientNo" id="patientNo" value={data.patientNo} onChange={this.handleChange} className="form-control" >
                      <option value="">Select Patient</option>
                      {this.selectPatients}
                    </select>
                  </div>
                  {errors.patientNo && (
                    <div className="alert alert-danger">{errors.patientNo}</div>
                  )}
                </div> */}

                {this.renderTextarea(
                  "complaint",
                  "Complaint",
                  "Enter Complaint",
                  "6"
                )}
                {/* <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="clinicNo">
                    Clinic
                  </label>
                  <div className="col-lg-8">
                    <select name="clinicNo" id="clinicNo" value={data.clinicNo} onChange={this.handleChange} className="form-control" >
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
                    <select name="doctorNo" id="doctorNo" value={data.doctorNo} onChange={this.handleChange} className="form-control" >
                      <option value="">Select Doctor</option>
                      {this.selectDoctors}
                    </select>
                  </div>
                  {errors.doctorNo && (
                    <div className="alert alert-danger">{errors.doctorNo}</div>
                  )}
                </div> */}

                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="clinicNo">
                    Clinic
                  </label>
                  <div className="col-lg-8">
                    <Select
                      id="clinicNo"
                      options={this.state.clinics}
                      formatOptionLabel={this.formatClinicOption}
                      onChange={(data) =>
                        this.handleSelectChange(data, "clinicNo")
                      }
                    />
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
                    <Select
                      id="doctorNo"
                      options={this.state.doctors}
                      formatOptionLabel={this.formatDoctorOption}
                      onChange={(data) =>
                        this.handleSelectChange(data, "doctorNo")
                      }
                    />
                  </div>
                  {errors.doctorNo && (
                    <div className="alert alert-danger">{errors.doctorNo}</div>
                  )}
                </div>

                <div className="form-group row">
                  <label
                    className="col-lg-4 col-form-label"
                    htmlFor="sessionType">
                    {" "}
                    Select Session-type
                  </label>
                  <div className="col-lg-8">
                    <select
                      name="sessionType"
                      id="sessionType"
                      value={data.sessionType}
                      onChange={this.handleChange}
                      className="form-control">
                      <option value="">Select Session-type</option>
                      {this.sessionTypeoptions}
                    </select>
                  </div>
                  {errors.sessionType && (
                    <div className="alert alert-danger">{errors.sessionType}</div>
                  )}
                </div>
                <div className="form-group row">
                  <label
                    className="col-lg-4 col-form-label"
                    htmlFor="appointmentType">
                    {" "}
                    Select Appointment Type
                  </label>
                  <div className="col-lg-8">
                    <select
                      name="appointmentType"
                      id="appointmentType"
                      value={data.appointmentType}
                      onChange={this.handleChange}
                      className="form-control">
                      <option value="">Select Appointment Type</option>
                      {this.appointmentTypeoptions}
                    </select>
                  </div>
                  {errors.appointmentType && (
                    <div className="alert alert-danger">{errors.appointmentType}</div>
                  )}
                </div>
                {/* ... your existing JSX code ... */}
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="startTime">
                    Start Time
                  </label>
                  <div className="col-lg-8" style={{ borderRight: '1px solid #dcdde1' }}>
                    <DatePicker
                      id="startTime"
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={5}
                      timeCaption="time"
                      dateFormat="h:mm:aa"
                      selected={data.start}
                      className="form-control"
                      onChange={this.handleStartTimeChange}
                      minDate={today} // Restrict selection to future dates
                    />
                    {errors.startTime && (
                      <div className="alert alert-danger">{errors.startTime}</div>
                    )}
                  </div>

                </div>

                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="endTime">
                    End Time
                  </label>
                  <div className="col-lg-8">
                    <DatePicker
                      id="endTime"
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={5}
                      timeCaption="time"
                      dateFormat="h:mm:aa"
                      selected={data.end}
                      className="form-control"
                      minDate={data.start} // Restrict selection to start date or later
                    />
                  </div>

                </div>
                {/* ... your existing JSX code ... */}


                {this.renderTextarea("note", "Note", "Enter note", "6")}
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="status">
                    {" "}
                    Status
                  </label>
                  <div className="col-lg-8">
                    <select
                      name="status"
                      id="status"
                      value={data.status}
                      onChange={this.handleChange}
                      className="form-control">
                      <option value="">Select Status</option>
                      {this.appointmentStatusoptions}
                    </select>
                  </div>
                  {errors.status && (
                    <div className="alert alert-danger">{errors.status}</div>
                  )}

                </div>

              </Modal.Body>
              <Modal.Footer>
                {/* <button className="btn btn-white" onClick={() => this.toggleModal()}>Close</button> */}

                <button
                  className="btn btn-red"
                  itle="Cancel the Appointment"
                  onClick={() => this.toggleModal("Add")}>
                  <i className="ion md-close"></i>Cancel
                </button>
                <button
                  className="btn btn-green"
                  type="submit"
                  title="Save the Appointment"
                  onClick={this.handleSubmit}>
                  <i className="far fa-save"></i>
                </button>
              </Modal.Footer>
            </Modal>
          </form>

          <form
            className="form-horizontal form-bordered"
            onSubmit={this.handleSubmit}>
            <Modal
              show={this.state.modalEdit}
              onHide={() => this.toggleModal("Edit")}>
              <Modal.Header closeButton>Edit Appointment</Modal.Header>
              <Modal.Body>


                <div className="form-group row">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className="col-lg-4">
                      <DatePicker
                        minDate={new Date()}
                        renderInput={(props) => <TextField {...props} />}
                        label="date"
                        name="date"
                        value={data.date}
                        onChange={(e) => this.handleStartDate(e, "date")}
                      />
                    </div>

                    <div className="col-lg-4">
                      <TimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Start Time"
                        name="start"
                        value={data.start}
                        onChange={(e) => this.handleStartDate(e, "start")}
                      />
                    </div>
                    <div className="col-lg-4">
                      <TimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="End Time"
                        name="end"
                        value={data.end}
                        onChange={(e) => this.handleStartDate(e, "end")}
                      />
                    </div>
                  </LocalizationProvider>
                  {errors.date && (
                    <div className="alert alert-danger">{errors.date}</div>
                  )}
                </div>

                <div className="form-group row">
                  <label
                    className="col-lg-4 col-form-label"
                    htmlFor="patientNo">
                    Patient
                  </label>
                  <div className="col-lg-8">
                    <select
                      name="patientNo"
                      id="patientNo"
                      value={data.patientNo}
                      onChange={this.handleChange}
                      className="form-control">
                      <option value="">Select Patient</option>
                      {this.selectPatients}
                    </select>
                  </div>
                  {errors.patientNo && (
                    <div className="alert alert-danger">{errors.patientNo}</div>
                  )}
                </div>
                {this.renderTextarea(
                  "complaint",
                  "Complaint",
                  "Enter complaint",
                  "Enter Complaint"
                )}
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
                      className="form-control">
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
                      className="form-control">
                      <option value="">Select Doctor</option>
                      {this.selectDoctors}
                    </select>
                  </div>
                  {errors.doctorNo && (
                    <div className="alert alert-danger">{errors.doctorNo}</div>
                  )}
                </div>

                <div className="form-group row">
                  <label
                    className="col-lg-4 col-form-label"
                    htmlFor="sessionType">
                    {" "}
                    Select Session-type
                  </label>
                  <div className="col-lg-8">
                    <select
                      name="sessionType"
                      id="sessionType"
                      value={data.sessionType}
                      onChange={this.handleChange}
                      className="form-control">
                      <option value="">Select Session-type</option>
                      {this.sessionTypeoptions}
                    </select>
                  </div>
                  {errors.status && (
                    <div className="alert alert-danger">{errors.sessionType}</div>
                  )}
                </div>
                <div className="form-group row">
                  <label
                    className="col-lg-4 col-form-label"
                    htmlFor="appointmentType">
                    {" "}
                    Select Appointment Type
                  </label>
                  <div className="col-lg-8">
                    <select
                      name="appointmentType"
                      id="appointmentType"
                      value={data.appointmentType}
                      onChange={this.handleChange}
                      className="form-control">
                      <option value="">Select Appointment Type</option>
                      {this.appointmentTypeoptions}
                    </select>
                  </div>
                  {errors.status && (
                    <div className="alert alert-danger">{errors.appointmentType}</div>
                  )}
                </div>
              </Modal.Body>
              <Modal.Footer>
                {/* <button className="btn btn-white" onClick={() => this.toggleModal()}>Close</button> */}
                <button
                  className="btn btn-red"
                  title="Cancel the Appointment"
                  onClick={() => {
                    this.toggleModal("Edit");
                    this.setState({ data: {} });
                  }}>
                  <i className="ion md-close"></i>Cancel
                </button>
                <button
                  className="btn btn-black"
                  title="Delete the Appointment"
                  onClick={this.handleDelete}>
                  <i className="far fa-trash-alt"></i>
                </button>
                <button
                  className="btn btn-lime"
                  title="Go To Treatment"
                  onClick={() => this.toggleModal("Edit")}>
                  <i className="ion md-close"></i>Treatment
                </button>
                <button
                  className="btn btn-blue"
                  title="Create an Invoice"
                  onClick={() => this.toggleModal("Edit")}>
                  <i className="ion md-close"></i>Creating Invoice
                </button>
                <button
                  className="btn btn-green"
                  title="Save the changes"
                  type="submit"
                  onClick={this.handleSubmit}
                  disabled={this.validate()}>
                  <i className="far fa-save"></i>
                </button>
              </Modal.Footer>
            </Modal>
          </form>
        </div>
      </React.Fragment >
    );
  }
}

export default Calendar;
