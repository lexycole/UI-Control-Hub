import React, { useState, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import http from "../../services/httpService";
import { apiUrl } from "../../config/config.json";
import Loader from "../../common/loader"
import "./c.scss";
import "./agenda.css"
import moment from "moment"
import styled from '@emotion/styled';
import { css } from "@emotion/react";


const AgendaView = forwardRef((props, ref) => {

  // const calendarRef = useRef(null);
  const availableColors = [
    "#53F453",   // Green
    "#F5AE8D",   // Light orange
    "#7AB6F1",   // Light blue
    "#C6F621",   // Lime green
    "#AAF1B6",   // Pale green
    "#D99936",   // Dark orange
    "#21F658",   // Bright green
    "#CFB9FA",   // Lavender
    "#F4AB3A",   // Orange
    "#59A6D5",   // Blue
  ];
  
  

  const [events, setEvents] = useState([]);
  const [style, setStyle] = useState(css``);
  // const style = events?.events?.map((event) => `.${event._id} { background: ${event.color}; }`);
  const Wrapper = styled.div`
      ${style}
  `;
  const getEvents = async () => {
    try {
      const { data: events } = await http.get(apiUrl + "/appointments");
      console.table(events);

      const coloredEvents = events.map((event, index) => ({
        ...event,
        backgroundColor: availableColors[index % availableColors.length],
      }));

      setEvents({
        events: coloredEvents.map((event) => ({
          id: event._id,
          title: event.title,
          start: event.startTime,
          end: event.endTime,
          backgroundColor: event.backgroundColor, // Use backgroundColor instead of event.backgroundColor
          note: event.note,
          className: event.appointmentNo,
          url: 'appointmentprofile/' + event._id,
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
          imageUrl: event.patientNo?.user?.imageSrc,
        })),
      });
      setStyle(
        css`${coloredEvents.map((e) => `.${e.appointmentNo} { background: ${e.color}; } .${e.appointmentNo}:hover { background: ${e.color}; } `).join(' ')}`
      );
    } catch (error) {
      alert(error.message);
    }
  };


  const renderEvent = (eventInfo) => {
    return (
      <>

        <i>
          <img
            style={{ height: "16px", objectFit: "contain" }}
            src={eventInfo.event.extendedProps.imageUrl}
            alt={eventInfo.event.extendedProps.title}
          />
        </i>
        <i style={{color : 'black'}}>
          <i> {` ${eventInfo.event.extendedProps.patientName}`}</i>
          <i>{` ${moment(eventInfo.event.extendedProps.patientDob).format("L")} `}</i>
          <i> {` ( ${eventInfo.event.extendedProps.gender} ) `}</i>
          <br />
          <i style={{ marginTop: "5px", display: "block" }}>{`Complaint : ${eventInfo.event.title.slice(0, 20)} `}</i>
          <Link to={eventInfo.event.url}></Link>
        </i>

      </>
    );
  };


  useEffect(() => {
    getEvents();
  }, []);

  if (events && events.events?.length > 0)
    return (
      <Wrapper>
        <FullCalendar
          style={{ border: "2px solid black" }}
          height="100%"
          ref={ref}
          plugins={[listPlugin, timeGridPlugin, interactionPlugin]}
          initialView="listDay"
          themeSystem="standard"
          events={events}
          customButtons={{
            addAppointmentButton: {
              text: "Add Appointment",
              click: function () {
                props.toggleChecked();
                props.toggleModal("Add")
              },
            },
          }}
          headerToolbar={{
            left: "addAppointmentButton listMonth,listWeek,listDay",
            center: "title",
            right: "prev,next,today",
          }}
          buttonText={{
            today: "Today",
            listMonth: "Month",
            listWeek: "Week",
            listDay: "Day",
          }}
          eventContent={renderEvent}
        />
      </Wrapper>
    );
  return <Loader />
});

export default AgendaView;

// import React from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import listPlugin from "@fullcalendar/list";
// import bootstrapPlugin from "@fullcalendar/bootstrap";
// import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Link } from "react-router-dom";
// import Form from "../../common/form.jsx";
// import { apiUrl } from "../../config/config.json";
// import http from "../../services/httpService";
// import auth from "../../services/authservice";
// import { getUser } from "../../services/users";
// import {
//   saveAppointment,
//   deleteAppointment,
// } from "./../../services/appointments";
// import { getClinics, getClinic } from "./../../services/clinics";
// import { getDoctors, getDoctor } from "./../../services/doctors";
// import { getPatients, getPatient } from "./../../services/patients";
// import { getRandomColor, dateCheck } from "./../../utils/event-utils";
// import moment from "moment";
// import DateTimePicker from "react-datetime-picker";
// import "react-datetime-picker/dist/DateTimePicker.css";
// import "react-calendar/dist/Calendar.css";
// import "react-clock/dist/Clock.css";
// import Joi from "joi";
// import ReactCalendar from "react-calendar";
// import { Typography } from "@material-ui/core";
// // import "./c.scss";
// class AgendaViewMonth extends Form {
//   constructor(props) {
//     super(props);

//     const date = new Date();
//     const currentYear = date.getFullYear();
//     let currentMonth = date.getMonth() + 1;
//     currentMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth;

//     this.state = {
//       currentUser: {
//         firstname: "",
//         lastName: "",
//         username: "",
//         imageSrc: "",
//       },
//       events: [],
//       clinics: [],
//       doctors: [],
//       patients: [],
//       headerToolbar: {
//         left: "dayGridMonth,timeGridWeek,timeGridDay",
//         center: "title",
//         right: "prev,next today",
//       },
//       buttonText: {
//         today: "Today",
//         month: "Month",
//         week: "Week",
//         day: "Day",
//       },
//       modalAdd: false,
//       modalEdit: false,
//       //fade: false,
//       data: {
//         start: "",
//         end: "",
//         complaint: "",
//         color: "",
//         patientNo: "",
//         clinicNo: "",
//         doctorNo: "",
//         patientUser: "",
//         clinicUser: "",
//         doctorUser: "",
//         note: "",
//       },
//       errors: {},
//       slotDuration: "00:05:00",
//       contentHeight: "auto",
//       //slotDuration: '05:00'
//     };

//     this.toggleModal = this.toggleModal.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.handleDelete = this.handleDelete.bind(this);
//     this.myhandleDate = this.myhandleDate.bind(this);
//     this.calendarComponentRef = React.createRef();
//     //this.handleCreateInvoice = this.handleCreateInvoice.bind(this);
//     //this.handleCreateSession = this.handleCreateSession.bind(this);
//   }

//   async populateCalendarEvents() {
//     const { data: events } = await http.get(apiUrl + "/appointments");

//     console.log(events);
//     this.setState({
//       events: events.map((event) => ({
//         id: event._id,
//         title: event.complaint,
//         start: event.startTime,
//         end: event.endTime,
//         color: event.color,
//         note: event.note,
//         extendedProps: {
//           patientNo: event.patientNo,
//           patientName:
//             event.patientUser.contactName.first +
//             " " +
//             event.patientUser.contactName.last,
//           patientDob: event.patientNo.dateBirth,
//           doctorNo: event.doctorNo,
//           clinicNo: event.clinicNo,
//         },
//         //description: 'Lecture'
//       })),
//     });
//   }
//   async populateDoctors() {
//     const { data: doctors } = await getDoctors();
//     this.setState({ doctors });
//     this.selectDoctors = this.state.doctors.map((option) => (
//       <option key={option._id} value={option._id}>
//         {option.doctors.contactName.last}
//       </option>
//     ));
//   }
//   async populatePatients() {
//     const { data: patients } = await getPatients();
//     this.setState({ patients });
//     this.selectPatients = this.state.patients.map((option) => (
//       <option key={option._id} value={option._id}>
//         {option.patients.contactName.first +
//           " " +
//           option.patients.contactName.last}
//       </option>
//     ));
//   }
//   async populateClinics() {
//     const { data: clinics } = await getClinics();
//     this.setState({ clinics });
//     this.selectClinics = this.state.clinics.map((option) => (
//       <option key={option._id} value={option._id}>
//         {option.companyInfo.businessName}
//       </option>
//     ));
//   }
//   mapToViewUserModel(user) {
//     return {
//       _id: user._id,
//       username: user.username,
//       firstName: user.contactName.first,
//       lastName: user.contactName.last,
//       imageSrc: user.imageSrc,
//     };
//   }

//   async componentDidMount() {
//     await this.populateCalendarEvents();
//     await this.populatePatients();
//     await this.populateClinics();
//     await this.populateDoctors();

//     try {
//       const user = auth.getProfile();
//       if (user) {
//         const { data: currentUser } = await getUser(user._id);
//         this.setState({ currentUser: this.mapToViewUserModel(currentUser) });
//       }
//     } catch (ex) {
//       console.log(ex);
//     }
//   }

//   handleDateSelect = (selectInfo) => {
//     //const date = new Date();
//     var newDateObj = moment(new Date(selectInfo.startStr))
//       .add(5, "minutes")
//       .toDate();
//     if (selectInfo.start < moment()) {
//       let calendarApi = selectInfo.view.calendar;
//       calendarApi.unselect();
//       return false;
//     }
//     this.toggleModal("Add");
//     const data = { ...this.state.data };
//     data.start = new Date(selectInfo.startStr);
//     data.end = new Date(newDateObj);
//     console.log("end date", data.end);
//     data.color = getRandomColor();
//     this.setState({ data });
//     let calendarApi = selectInfo.view.calendar;
//     calendarApi.unselect(); // clear date selection
//     console.log(getRandomColor());
//   };

//   handleEventClick = async (clickInfo) => {
//     this.toggleModal("Edit");
//     const data = { ...this.state.data };
//     data.start = new Date(clickInfo.event.startStr);
//     data.end = new Date(clickInfo.event.endStr);
//     data.complaint = clickInfo.event.title;
//     data.patientNo = clickInfo.event.extendedProps.patientNo._id;
//     data.doctorNo = clickInfo.event.extendedProps.doctorNo._id;
//     data.clinicNo = clickInfo.event.extendedProps.clinicNo._id;
//     data.note = clickInfo.event.note;
//     //data.color = clickInfo.event.extendedProps.color;
//     data.id = clickInfo.event.id;
//     this.setState({ data });
//     console.log(this.state);
//     //console.log(clickInfo);
//     console.log(clickInfo.event);
//     console.log(clickInfo.event.id);
//   };

//   renderEventContent = (eventInfo) => {
//     return (
//       <>
//         <i>
//           {" "}
//           {` ${eventInfo.event.extendedProps.patientName} ${moment(
//             eventInfo.event.extendedProps.patientDob
//           ).format("DD/MM/YYYY")}`}
//         </i>
//         <i>{` ${eventInfo.event.title} `}</i>
//         {/* <b>{` ${eventInfo.timeText}`}</b> */}
//       </>
//     );
//   };

//   toggleModal(name) {
//     switch (name) {
//       case "Add":
//         this.setState({ modalAdd: !this.state.modalAdd });
//         break;
//       case "Edit":
//         this.setState({ modalEdit: !this.state.modalEdit });
//         break;
//       default:
//         break;
//     }
//   }
//   /*   async componentDidMount() {
//     await this.populateCalendarEvents();
//     await this.populatePatients();
//     await this.populateClinics();
//     await this.populateDoctors();
//   }
//  */

//   handleStartDate = (e) => {
//     const errors = { ...this.state.errors };
//     const data = { ...this.state.data };
//     // let str = FullCalendar.pluginsformatDate(e, {
//     // 	month: 'long',
//     // 	year: 'numeric',
//     // 	day: 'numeric',
//     // 	timeZoneName: 'short',
//     // 	// timeZone: 'UTC',
//     // 	// locale: 'es'
//     //   });
//     //console.log(Date.parse(e));
//     data["start"] = new Date(e);

//     this.setState({ data });
//     console.log(this.state.data);
//   };

//   handleEndDate = (e) => {
//     const errors = { ...this.state.errors };
//     const data = { ...this.state.data };
//     data["end"] = new Date(e);
//     this.setState({ data });
//     console.log(this.state.data);
//   };
//   handleDelete = async () => {
//     const { data, events } = this.state;
//     const originalEvents = events;
//     const newEvents = events.filter((Event) => Event.id !== data.id);
//     this.setState({ events: newEvents });
//     this.setState({ data: {} });
//     try {
//       await deleteAppointment(data.id);
//       this.toggleModal("Edit");
//     } catch (ex) {
//       if (ex.response && ex.response === 404) {
//         alert("already deleted");
//       }
//       this.setState({ events: originalEvents });
//     }
//   };

//   doSubmit = async () => {
//     try {
//       const errors = { ...this.state.errors };
//       errors.complaint = "";
//       const { events, data } = this.state;
//       for (let event in events) {
//         if (dateCheck(data.start, data.end, event.start, event.end))
//           errors.complaint = "Slot not available try again";
//       }
//       const datas = { ...this.state.data };
//       const { data: clinic } = await getClinic(datas.clinicNo);
//       datas.clinicUser = clinic[0].user;
//       const { data: patient } = await getPatient(datas.patientNo);
//       datas.patientUser = patient[0].user;
//       if (data.doctorNo) {
//         const { data: doctor } = await getDoctor(datas.doctorNo);
//         datas.doctorUser = doctor[0].user;
//       }
//       this.setState({ data: datas });

//       await saveAppointment(this.state.data);
//       if (data.id) {
//         await this.populateCalendarEvents();
//         this.toggleModal("Edit");
//       } else {
//         //this.setState({ events: events.concat(this.mapToViewModel(data))});
//         await this.populateCalendarEvents();
//         this.toggleModal("Add");
//       }
//       this.setState({ data: {} });
//       //this.props.history.push("/calendar/calendar");
//     } catch (ex) {
//       if (ex.response) {
//         const errors = { ...this.state.errors };
//         errors.complaint = ex.response.data;
//         this.setState({ errors });
//       }
//     }
//   };

//   // mapToViewModel(appointment) {
//   // 	return {
//   // 	  id: appointment._id,
//   // 	  start: new Date(appointment.start),
//   // 	  end: new Date(appointment.end),
//   // 	  title: appointment.complaint
//   // 	};
//   //   }

//   mapToViewModel(appointment) {
//     return {
//       //id: appointment._id,
//       start: appointment.start,
//       end: appointment.end,
//       title: appointment.complaint,
//       patientNo: appointment.patientNo,
//       clinicNo: appointment.clinicNo,
//       doctorNo: appointment.doctorNo,
//       note: appointment.note,
//     };
//   }

//   schema = Joi.object({
//     complaint: Joi.any().optional(),
//     start: Joi.date().optional(),
//     end: Joi.date().optional(),
//     color: Joi.any().optional(),
//     patientNo: Joi.string().required(),
//     clinicNo: Joi.string().required(),
//     doctorNo: Joi.any().optional(),
//     patientUser: Joi.any().optional(),
//     clinicUser: Joi.any().optional(),
//     doctorUser: Joi.any().optional(),
//     note: Joi.any().optional(),
//   });
//   myhandleDate = (event) => {
//     let calendarApi = this.calendarComponentRef.current.getApi();
//     calendarApi.gotoDate(event); // call a method on the Calendar object
//   };
//   render() {
//     const { data, errors } = this.state;
//     return (
//       <React.Fragment>
//         <div>
//           {console.log("State,:", this.state)}
//           <ol className="breadcrumb float-xl-right">
//             <li className="breadcrumb-item">
//               <Link to="/calendar">Home</Link>
//             </li>
//             <li className="breadcrumb-item active">Calendar</li>
//           </ol>
//           <h1 className="page-header">
//             <Typography variant="body1">
//               <img src={this.state.currentUser.imageSrc} alt="" />
//               <span className="d-none d-md-inline">
//                 {this.state.currentUser.firstName}{" "}
//                 {this.state.currentUser.lastName}
//               </span>
//             </Typography>
//           </h1>
//           <hr />

//           <div className="row">
//             <div className="col-12 col-sm-12 col-md-4 col-lg-4">
//               <ReactCalendar
//                 onChange={(event) => this.myhandleDate(event)}
//                 // selectRange={true}
//                 showWeekNumbers
//               />
//             </div>
//             <div className="col-12 col-sm-12 col-md-8 col-lg-8">
//               <FullCalendar
//                 plugins={[listPlugin, interactionPlugin]}
//                 ref={this.calendarComponentRef}
//                 initialView="listWeek"
//                 editable={true}
//                 selectable={true}
//                 select={this.handleDateSelect}
//                 eventContent={this.renderEventContent} // custom render function
//                 eventClick={this.handleEventClick}
//                 eventRemove={this.handleDelete}
//                 nowIndicator={true}
//                 headerToolbar={this.state.headerToolbar}
//                 buttonText={this.state.buttonText}
//                 events={this.state.events}
//                 slotDuration={this.state.slotDuration}
//                 contentHeight={this.state.contentHeight}
//               />
//             </div>
//           </div>

//           {/* <Button color="danger" onClick={this.toggleModal}>Launch</Button> */}
//           <form
//             className="form-horizontal form-bordered"
//             onSubmit={this.handleSubmit}
//           >
//             <Modal
//               isOpen={this.state.modalAdd}
//               toggle={() => this.toggleModal("Add")}
//             >
//               <ModalHeader toggle={() => this.toggleModal("Add")}>
//                 Create Appointment
//               </ModalHeader>
//               <ModalBody>
//                 {/* <p>
// 										Modal body content here...
// 									</p> */}
//                 {/* {this.renderInput("start","start time","text","Enter start time")} */}
//                 <DateTimePicker
//                   amPmAriaLabel="Select AM/PM"
//                   calendarAriaLabel="Toggle calendar"
//                   clearAriaLabel="Clear value"
//                   dayAriaLabel="Day"
//                   hourAriaLabel="Hour"
//                   maxDetail="minute"
//                   minuteAriaLabel="Minute"
//                   monthAriaLabel="Month"
//                   nativeInputAriaLabel="Date and time"
//                   onChange={this.handleStartDate}
//                   secondAriaLabel="Second"
//                   disableCalendar={true}
//                   name="start"
//                   value={data.start}
//                   yearAriaLabel="Year"
//                 />

//                 {/* {this.renderInput("end","end time","text","Enter end time")} */}
//                 <DateTimePicker
//                   amPmAriaLabel="Select AM/PM"
//                   calendarAriaLabel="Toggle calendar"
//                   clearAriaLabel="Clear value"
//                   dayAriaLabel="Day"
//                   hourAriaLabel="Hour"
//                   maxDetail="minute"
//                   minuteAriaLabel="Minute"
//                   monthAriaLabel="Month"
//                   nativeInputAriaLabel="Date and time"
//                   onChange={this.handleEndDate}
//                   secondAriaLabel="Second"
//                   disableCalendar={true}
//                   name="end"
//                   value={data.end}
//                   yearAriaLabel="Year"
//                 />

//                 {/* {this.renderInput("complaint","Complaint","text","Enter Complaint")} */}

//                 {this.renderTextarea(
//                   "complaint",
//                   "Complaint",
//                   "6",
//                   "Enter Complaint"
//                 )}
//                 <div className="form-group row">
//                   <label
//                     className="col-lg-4 col-form-label"
//                     htmlFor="patientNo"
//                   >
//                     Patient
//                   </label>
//                   <div className="col-lg-8">
//                     <select
//                       name="patientNo"
//                       id="patientNo"
//                       value={data.patientNo}
//                       onChange={this.handleChange}
//                       className="form-control"
//                     >
//                       <option value="">Select Patient</option>
//                       {this.selectPatients}
//                     </select>
//                   </div>
//                   {errors.patientNo && (
//                     <div className="alert alert-danger">{errors.patientNo}</div>
//                   )}
//                 </div>
//                 <div className="form-group row">
//                   <label className="col-lg-4 col-form-label" htmlFor="clinicNo">
//                     Clinic
//                   </label>
//                   <div className="col-lg-8">
//                     <select
//                       name="clinicNo"
//                       id="clinicNo"
//                       value={data.clinicNo}
//                       onChange={this.handleChange}
//                       className="form-control"
//                     >
//                       <option value="">Select Clinic</option>
//                       {this.selectClinics}
//                     </select>
//                   </div>
//                   {errors.clinicNo && (
//                     <div className="alert alert-danger">{errors.clinicNo}</div>
//                   )}
//                 </div>
//                 <div className="form-group row">
//                   <label className="col-lg-4 col-form-label" htmlFor="doctorNo">
//                     Doctor
//                   </label>
//                   <div className="col-lg-8">
//                     <select
//                       name="doctorNo"
//                       id="doctorNo"
//                       value={data.doctorNo}
//                       onChange={this.handleChange}
//                       className="form-control"
//                     >
//                       <option value="">Select Doctor</option>
//                       {this.selectDoctors}
//                     </select>
//                   </div>
//                   {errors.doctorNo && (
//                     <div className="alert alert-danger">{errors.doctorNo}</div>
//                   )}
//                 </div>
//                 {this.renderTextarea("note", "Note", "6", "Enter note")}
//               </ModalBody>
//               <ModalFooter>
//                 {/* <button className="btn btn-white" onClick={() => this.toggleModal()}>Close</button> */}

//                 <button
//                   className="btn btn-red"
//                   title="Cancel the Appointment"
//                   onClick={() => this.toggleModal("Add")}
//                 >
//                   <i className="ion md-close"></i>Cancel
//                 </button>
//                 <button
//                   className="btn btn-green"
//                   type="submit"
//                   title="Save the Appointment"
//                   onClick={this.handleSubmit}
//                   disabled={this.validate()}
//                 >
//                   <i className="far fa-save"></i>
//                 </button>
//               </ModalFooter>
//             </Modal>
//           </form>

//           <form
//             className="form-horizontal form-bordered"
//             onSubmit={this.handleSubmit}
//           >
//             <Modal
//               isOpen={this.state.modalEdit}
//               toggle={() => this.toggleModal("Edit")}
//             >
//               <ModalHeader
//                 toggle={() => {
//                   this.toggleModal("Edit");
//                   this.setState({ data: {} });
//                 }}
//               >
//                 Edit Appointment
//               </ModalHeader>
//               <ModalBody>
//                 {/* <p>
// 										Modal body content here...
// 									</p> */}
//                 {/* {this.renderInput("start","start time","text","Enter start time")}

//                             {this.renderInput("end","end time","text","Enter end time")} */}

//                 <DateTimePicker
//                   amPmAriaLabel="Select AM/PM"
//                   calendarAriaLabel="Toggle calendar"
//                   clearAriaLabel="Clear value"
//                   dayAriaLabel="Day"
//                   hourAriaLabel="Hour"
//                   //maxDetail="second"
//                   maxDetail="minute"
//                   minuteAriaLabel="Minute"
//                   monthAriaLabel="Month"
//                   nativeInputAriaLabel="Date and time"
//                   onChange={this.handleStartDate}
//                   secondAriaLabel="Second"
//                   disableCalendar={true}
//                   name="start"
//                   value={data.start}
//                   yearAriaLabel="Year"
//                 />
//                 <DateTimePicker
//                   amPmAriaLabel="Select AM/PM"
//                   calendarAriaLabel="Toggle calendar"
//                   clearAriaLabel="Clear value"
//                   dayAriaLabel="Day"
//                   hourAriaLabel="Hour"
//                   maxDetail="minute"
//                   minuteAriaLabel="Minute"
//                   monthAriaLabel="Month"
//                   nativeInputAriaLabel="Date and time"
//                   onChange={this.handleEndDate}
//                   secondAriaLabel="Second"
//                   disableCalendar={true}
//                   name="end"
//                   value={data.end}
//                   yearAriaLabel="Year"
//                 />
//                 {/* {this.renderInput("complaint","Complaint","text","Enter Complaint")} */}
//                 {this.renderTextarea(
//                   "complaint",
//                   "Complaint",
//                   "6",
//                   "Enter Complaint"
//                 )}

//                 <div className="form-group row">
//                   <label
//                     className="col-lg-4 col-form-label"
//                     htmlFor="patientNo"
//                   >
//                     Patient
//                   </label>
//                   <div className="col-lg-8">
//                     <select
//                       name="patientNo"
//                       id="patientNo"
//                       value={data.patientNo}
//                       onChange={this.handleChange}
//                       className="form-control"
//                     >
//                       <option value="">Select Patient</option>
//                       {this.selectPatients}
//                     </select>
//                   </div>
//                   {errors.patientNo && (
//                     <div className="alert alert-danger">{errors.patientNo}</div>
//                   )}
//                 </div>
//                 <div className="form-group row">
//                   <label className="col-lg-4 col-form-label" htmlFor="clinicNo">
//                     Clinic
//                   </label>
//                   <div className="col-lg-8">
//                     <select
//                       name="clinicNo"
//                       id="clinicNo"
//                       value={data.clinicNo}
//                       onChange={this.handleChange}
//                       className="form-control"
//                     >
//                       <option value="">Select Clinic</option>
//                       {this.selectClinics}
//                     </select>
//                   </div>
//                   {errors.clinicNo && (
//                     <div className="alert alert-danger">{errors.clinicNo}</div>
//                   )}
//                 </div>
//                 <div className="form-group row">
//                   <label className="col-lg-4 col-form-label" htmlFor="doctorNo">
//                     Doctor
//                   </label>
//                   <div className="col-lg-8">
//                     <select
//                       name="doctorNo"
//                       id="doctorNo"
//                       value={data.doctorNo}
//                       onChange={this.handleChange}
//                       className="form-control"
//                     >
//                       <option value="">Select Doctor</option>
//                       {this.selectDoctors}
//                     </select>
//                   </div>
//                   {errors.doctorNo && (
//                     <div className="alert alert-danger">{errors.doctorNo}</div>
//                   )}
//                 </div>
//               </ModalBody>
//               <ModalFooter>
//                 {/* <button className="btn btn-white" onClick={() => this.toggleModal()}>Close</button> */}
//                 <button
//                   className="btn btn-red"
//                   title="Cancel the Appointment"
//                   onClick={() => {
//                     this.toggleModal("Edit");
//                     this.setState({ data: {} });
//                   }}
//                 >
//                   <i className="ion md-close"></i>Cancel
//                 </button>
//                 <button
//                   className="btn btn-gray"
//                   title="Delete the Appointment"
//                   onClick={this.handleDelete}
//                 >
//                   <i className="far fa-trash-alt"></i>
//                 </button>
//                 <button
//                   className="btn btn-lime"
//                   title="Go To Treatment"
//                   onClick={() => this.toggleModal("Edit")}
//                 >
//                   <i className="ion md-close"></i>Treatment
//                 </button>
//                 <button
//                   className="btn btn-blue"
//                   title="Create an Invoice"
//                   onClick={() => this.toggleModal("Edit")}
//                 >
//                   <i className="ion md-close"></i>Creating Invoice
//                 </button>
//                 <button
//                   className="btn btn-green"
//                   title="Save the changes"
//                   type="submit"
//                   onClick={this.handleSubmit}
//                   disabled={this.validate()}
//                 >
//                   <i className="far fa-save"></i>
//                 </button>
//               </ModalFooter>
//             </Modal>
//           </form>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default AgendaViewMonth;