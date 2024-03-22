import React, { useState, useEffect, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//import Modal from "@material-ui/core/Modal";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import timeLinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";
import listPlugin from "@fullcalendar/list";
import { Panel, PanelBody, PanelHeader } from "../../components/panel/panel";
import { getUser, getUsers } from "../../../src/services/users";


import DateRange from "./daterange";
import "./c.scss";

import { Typography } from "@material-ui/core";
// import Filters from "./Filters"
import _ from "lodash";
import moment from "moment";

import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReactSelect from "react-select";
import { getAppointments } from "../../services/appointments";
import { getPatients } from "../../services/patients";
import { getDoctors } from "../../services/doctors";

const appointmentTypeOptions = [
  { value: "clinic", label: "clinic" },
  { value: "at home", label: "at home" },
  { value: "phone", label: "phone" },
  { value: "video", label: "video" },
];

const statusOptions = [
  { value: "canceled<24h", label: "Canceled < 24h" },
  { value: "delayed", label: "Delayed" },
  { value: "invoiced", label: "Invoiced" },
  { value: "arrived", label: "Arrived" },
  { value: "intreatment", label: "In Treatment" },
  { value: "active", label: "Active" },
];

const sessionTypeOptions = [
  { value: "intake", label: "Intake" },
  { value: "follow", label: "follow" },
];

const COLORS = [
  "#53F453",
  "#F5AE8D",
  "#CFB9FA",
  "#7AB6F1",
  "#D99936",
  "#C6F621",
  "#21F658",
  "#59A6D5",
  "#AAF1B6",
  "#F4AB3A",
];

const INITIAL_MODAL_STATE = {
  date: new Date(),
  startTime: new Date(),
  endTime: new Date(),
  title: "",
  appointmentType: "",
  sessionType: "",
  notePatient: "",
  note: "",
  status: "",
  color: "",
  timezone: "UTC",
  internalNotes: "",
  patientNo: {},
  clinicNo: null,
  doctorNo: null,
};

const TimelineAppointments = () => {
  const calendarRef = useRef(null);
  const [responseAppointmentData, setResponseAppointmentData] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [resources, setResources] = useState([]);
  const [filterState, setFilterState] = useState({});
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(true);
  const [editModalData, setEditModalData] = useState({});
  const [userOptions, setUserOptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchUsers = async () => {
    const { data:users } = await getUsers();
    setUsers(users);
    setUserOptions(users.map((user) =>(
        {
          label: user.contactName.first + " " + user.contactName.last,
          value: user._id,
        }
    )));
  };

  const toggleModal = () => setIsModalOpen((prevState) => !prevState);
  const addAppointmentModal = () => {
    fetchUsers();
    setEditModalData(INITIAL_MODAL_STATE);
    setIsEditModal(false);
    toggleModal();
  };
  const editAppointmentModal = (id) => {
    if (!users.length) fetchUsers();
    const data = responseAppointmentData.filter((ticket) => ticket._id === id);
    setEditModalData(data[0]);
    toggleModal();
  };

  const renderEvent = (eventInfo) => {
    console.log("eventInfo");
    return (
      <RenderEvent openModal={editAppointmentModal} eventInfo={eventInfo} />
    );
  };

  const populateCalendarResources =(appointments) => {
    const array = appointments.map((appointment) => ({
          id: appointment.doctorNo._id,
          title:
          appointment.doctorNo.user.contactName.first +
          " " +
          appointment.doctorNo.user.contactName.last,
         //eventColor:resource.color,
         //clinic: appointment.clinicNo.companyInfo.businessName,
         //:appointment.doctorNo.user.imageSrc,
          patients: [...appointment.patients].map((patient)=>{
          //  console.log(".................",patient);
           return (
             <div style={{ display: "flex", alignItems: "center" }}>
              <img
                className="mx-1 rounded-circle"
                style={{ width: "30px", height: "30px" }}
                src={patient.user.imageSrc}
                //alt={participant.username}
              />
       
              <div style={{fontSize:"10px" }} >{patient.user.username}</div>
           </div>
       
              );
           
             }),
       
   
          doctor: <div style={{ display: "flex", alignItems: "center" }}>
          <img style={{ height: '25px', width: "25px", borderRadius: "100%", marginRight: "8px" }} src={appointment.doctorNo.user.imageSrc} />
          <div style={{fontSize:"10px" }} >{appointment.doctorNo.user.contactName.first +
            " " +
            appointment.doctorNo.user.contactName.last}</div>
        </div>
       ,
      }));

     
    return array;
  };

  const trimDataForCalendar = (data) => {
    const array = new Array();
    data.forEach((item, index) => {
      array.push({
        id: item._id,
          title: item.patientNo.user.contactName.first + ' ' + item.patientNo.user.contactName.last,
          note: item.note,
          start: new Date(item.startTime),
          end: new Date(item.endTime),
          resourceId: item.doctorNo._id,
          color: COLORS[index.toString().slice(-1)],
          extendedProps: {
            patientNo: item.patientNo._id,
            patientName:
              item.patientNo.user.contactName.first +
              " " +
              item.patientNo.user.contactName.last,
            patientDob: new Date(item.patientNo.user.dateBirth),
            imageSrc: item.patientNo.user.imageSrc,
          },
    });
  });
    return array;
  };

  const filter = () => {
    const filteredData = _.filter(responseAppointmentData, filterState);
    setAppointments(populateCalendarResources(filteredData));
  };
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const { data:events } = await getAppointments();
  

     

      const responses = events.map((resource) => 
      (
        {
        id: resource.doctorNo._id,
        title:
          resource.doctorNo.user.contactName.first +
          " " +
          resource.doctorNo.user.contactName.last,
        //eventColor:resource.color,
        //clinic: resource.clinicNo.companyInfo.businessName,
        doctorNo:resource.doctorNo,
        //patients: patients.add(resource._id),
      }));

      const Responses = responses.map((response,index)=>{
        const patients = new Set();
        const newResponse = {...response};
        events.forEach((event)=>{
         if(event.doctorNo._id === newResponse.id) {
          newResponse.patients = patients.add(event.patientNo);
         }})
         return newResponse;
      });
         
    
     
      console.log("resources",Responses);
      const resources = populateCalendarResources(Responses);
      setResources(resources);

      const Events = trimDataForCalendar(events);

      setCalendarEvents(Events);

      setLoading(false);
      
    } catch (error) {
      console.log("Error", error);
    }
  };


  const resourceLabelDidMount = (info) =>{
  
    if(info.resource.participants) { 
      // info.resource.extendedProps.participants.map((participant)=>{
      //   img.src = info.resource.extendedProps.participant;
      //   img.className = "img-rounded height-80";
      //   info.el.querySelector('.fc-col-header-cell-cushion').appendChild(br);
      //   info.el.querySelector('.fc-col-header-cell-cushion').appendChild(img);
      //   return (
      //     <div className="widget-img widget-img-sm rounded-circle bg-inverse mr-n2">
      //       <img
      //         width="30px"
      //         height="30px"
      //         src={participant.imageSrc}
      //         className="mb-1"
      //       />
      //     </div>
      //   );

      // });
   
      // const img = document.createElement("img");
      // const br = document.createElement("br");
      //   img.src = info.resource.extendedProps.participants;
      //   img.className = "img-rounded height-80";
      //   info.el.querySelector('.fc-datagrid-cell-main').appendChild(br);
        
      //   info.el.querySelector('.fc-datagrid-cell-main').appendChild(img);

       
          // <div className="widget-img widget-img-sm rounded-circle bg-inverse mr-n2">
          //   <img
          //     width="30px"
          //     height="30px"
          //     src={info.resource.extendedProps.participants}
          //     className="mb-1"
          //   />
          // </div>
    

    }
  };

  // useEffect(() => {
  //   if (!responseKanbanData.length) fetchKanbans();
  //   else filter();
  // }, [filterState]);

  useEffect(() => {
   if(resources.length !== 0) return;
    fetchAppointments();
   
  }, []);



  return (
    <Panel className="mb-0" style={{ position: "relative" }}>
       <PanelHeader>Appointments</PanelHeader>
      <PanelBody>
        {/* <Filters
          addAppointmentModal={addAppointmentModal}
          statusOptions={statusOptions}
          appointmentTypeOptions={appointmentTypeOptions}
          sessionTypeOptions={sessionTypeOptions}
          onChangeDateRange={() => { }}
          setFilterState={setFilterState}
          filterState={filterState}

        /> */}

        <div style={{ marginRight: "-0.80rem", marginLeft: "-0.8rem" }}>
          <FullCalendar
            schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
            height="80vh"
            ref={calendarRef}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
              timeLinePlugin,
            ]}
            initialView="resourceTimelineDay"
            themeSystem="standard"
            slotDuration={"00:15:00"}
            events={calendarEvents}
            resources={resources}
            resourceAreaColumns={[
              {
                field: "doctor",
                headerContent: "Doctor",
              },
              {
                field: "patients",
                headerContent: "Name Of Patient.",
              },
            ]}

            // resourceAreaColumns= {[
            //   {
            //     field: 'title',
            //     headerContent: 'Room'
            //   },
            //   {
            //     field: 'occupancy',
            //     headerContent: 'Occupancy'
            //   },
            // ]}

           

            headerToolbar={{
              left: "addTaskButton resourceTimelineMonth,resourceTimelineWeek,resourceTimelineDay", 
              center: "title",
              right: "prev,next,today",
            }}
            buttonText={{
              today: "Today",
              resourceTimelineMonth: "Month",
              resourceTimelineWeek: "Week",
              resourceTimelineDay: "Day",
            }}
            eventContent={renderEvent}
            //resourceLabelDidMount={resourceLabelDidMount}
            editable={true}
          />
        </div>
      </PanelBody>
    </Panel>
  );
};

export default TimelineAppointments;

const RenderEvent = ({ eventInfo }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  console.log("eventInfo",eventInfo);

  const handleClick = (event) => {
    event.preventDefault();
    if (event.type === "contextmenu") {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMousePosition = (event) => {
    console.log("event.type",event.type)
    setAnchorEl(event.currentTarget);
    
    setMouseY(event.clientY);
    setMouseX(event.clientX);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // useEffect(() => {
  //   if (anchorEl) console.log(anchorEl);
  // }, [anchorEl]);
  return (
    <>
      <div
        onContextMenu={handleClick}
        onMouseDown={handleMousePosition}
        style={{
          width: "100%",
          backgroundColor: eventInfo.backgroundColor,
          padding: "5px",
        }}
      >
        
        {eventInfo.event._def.title}
      </div>
      <Popover
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: mouseY, left: mouseX }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <VisibilityIcon />
          </ListItemIcon>
          <Typography>View {eventInfo.event._def.title}</Typography>//calling TaskProfile.js 
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <Typography>Edit {eventInfo.event._def.title}</Typography> //calling edit-form of task
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <Typography>Delete {eventInfo.event._def.title}</Typography> //delete task
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ShareIcon />
          </ListItemIcon>
          <Typography>Get Link for {eventInfo.event._def.title}</Typography> //calling tab sharing in taskprofile
        </MenuItem>
      </Popover>
    </>
  );
};



const Avatar = ({ userId }) => {
  const name = userId.contactName?.first + " " + userId.contactName?.last;
  return (
    <div className="d-flex flex-row align-items-center">
      <img
        className="mx-1 rounded-circle"
        style={{ width: "20px", height: "20px" }}
        src={userId.imageSrc}
        alt={name}
      />
      <p className="mx-2 my-0">{name}</p>
    </div>
  );
};
