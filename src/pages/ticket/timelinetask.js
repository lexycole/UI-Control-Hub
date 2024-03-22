import React, { useState, useEffect, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Modal } from "reactstrap";
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
import http from "../../services/httpService";
import { Panel, PanelBody, PanelHeader } from "../../components/panel/panel";
import { getTickets, saveTicket } from "../../../src/services/tickets";
import { getUser, getUsers } from "../../../src/services/users";

import DateRange from "./daterange";
import { apiUrl } from "../../config/config.json";
import "./c.scss";
import { Typography } from "@material-ui/core";
import Filters from "./Filters";
import _ from "lodash";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import { ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReactSelect from "react-select";

const priorityOptions = [
  { value: "urgent", label: "Urgent" },
  { value: "high", label: "High" },
  { value: "normal", label: "Normal" },
  { value: "low", label: "Low" },
];

const statusOptions = [
  { value: "open", label: "Open" },
  { value: "onhold", label: "on-Hold" },
  { value: "closed", label: "Closed" },
  { value: "reopen", label: "Re-open" },
  { value: "pending", label: "pending" },
  { value: "in progress", label: "in progress" },
  { value: "archive", label: "archive" },
  { value: "new", label: "new" },
];

const categoryOptions = [
  { value: "bug-error", label: "Bug/Error" },
  { value: "complaint", label: "Complaint" },
  { value: "disconnection", label: "Disconnection" },
  { value: "orders", label: "Orders" },
  { value: "sales", label: "Sales" },
  { value: "other", label: "Other" },
  { value: "NLP", label: "NLP" },
  { value: "web", label: "web" },
  { value: "feature-request", label: "feature request" },
];
let url =
  "https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=40&h=40.0&fit=crop";

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
  "priority": "",
  "businessName": "",
  "department": "",
  "subDepartment": "",
  "locations": "",
  "ticketNo": "",
  "documentNo": "",
  "color": "",
  "field": "",
  "tags": "",
  "reference": "",
  "note": "",
  "review": "",
  "status": "new",
  "attachments": [],
  "user": {contactName:{ first:"", last:""}},
  "name": "",
  "narrative": "",
  "category": "",
  "createdOn": new Date(),
  "deadline": "",
  "assignedTo": {contactName:{ first:"", last:""}}
}

const TimelineTicketTask = () => {
  const calendarRef = useRef(null);

  const [responseTicketData, setResponseTicketData] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [archievedState, setArchivedState] = useState([]);
  const [filterState, setFilterState] = useState({});
  const [statusTabButton, setStatusTabButton] = useState("active");
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [isEditModal, setIsEditModal]= useState(true)

  const fetchUsers = async () => {
    const { data } = await getUsers();
    console.log("Response Users", data);
    setUsers(data);
    data.forEach((user) =>
      setUserOptions((prevState) => [
        ...prevState,
        {
          label: user.contactName.first + " " + user.contactName.last,
          value: user._id,
        },
      ])
    );
  };

  const toggleModal = () => {
    setIsEditModal(true)
    setIsEditModalOpen((prevState) => !prevState);
  };

  const filterEvent = (id) => {
    const data = responseTicketData.filter((ticket) => ticket._id === id);
    setEditModalData(data[0]);
  };

  const renderEvent = (eventInfo) => {
    return (
      <RenderEvent
        toggleModal={toggleModal}
        setEditModalData={filterEvent}
        eventInfo={eventInfo}
      />
    );
  };

  const trimDataForAvatar = (tickets) => {
    const array = new Array();
    tickets.forEach((ticket) => {
      array.push({
        id: ticket.assignedTo._id,
        Owner:
          ticket.user.contactName.first + " " + ticket.user.contactName.last,
        AssignedTo: <Avatar userInfo={ticket.assignedTo} />,
      });
    });
    return array;
  };

  const trimDataForCalendar = (data) => {
    const array = new Array();
    data.forEach((item, index) => {
      if (item.assignedTo) {
        array.push({
          id: item._id,
          start: new Date(item.createdOn),
          end: new Date(item.deadline),
          title: item.name,
          color: COLORS[index.toString().slice(-1)],
          note: item.note ? item.note : "",
          resourceId: item.assignedTo._id,
        });
      }
    });
    return array;
  };

  const filter = () => {
    const filteredData = _.filter(responseTicketData, filterState);
    setTickets(trimDataForAvatar(filteredData));
  };

  const fetchTickets = async () => {
    try {
      const response = await getTickets();
      setResponseTicketData(response.data);
      let [archived, active] = _.partition(response.data, {
        status: "archive",
      });
      const trimmedActiveData = trimDataForAvatar(active);
      const trimmedArchivedData = trimDataForAvatar(archived);
      setTickets(trimmedActiveData);
      setArchivedState(trimmedArchivedData);
      setCalendarEvents(trimDataForCalendar(active));
      fetchUsers();
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    if (!responseTicketData.length) fetchTickets();
    else filter();
  }, [filterState, statusTabButton]);

  const switchToArchive = () => {
    setFilterState({ status: "archive" });
    setStatusTabButton("archive");
  };

  const switchToActiveTab = () => {
    const state = { ...filterState };
    delete state["status"];
    setFilterState(state);
    setStatusTabButton("active");
  };

  const handleChangeText = (changeEvent) => {
    setEditModalData(prevState=> ({...prevState, [changeEvent.target.name]: [changeEvent.target.value]}))
  };

  const saveModalData = async () => {
    try {
      setIsLoading(true);
      const data = { ...editModalData };
      data["share"] = undefined;
      delete data.share;
      console.log(data);
      await saveTicket(editModalData);
    } finally {
      setIsLoading(false);
    }
  };
  const getAssignedToUser = () => {
    const user = editModalData.assignedTo;
    if (user) {
      const firstName = user.contactName.first;
      const lastName = user.contactName.last;
      return { label: firstName + " " + lastName, value: user._id };
    }
    return null;
  };
  const selectBoxChange =(event, array, accessor) =>{
    setEditModalData(prevState=> ({...prevState, [accessor]: event.value}))
  }
  const addTicketModal = () =>{
    setEditModalData(INITIAL_MODAL_STATE)
    setIsEditModal(false);
    setIsEditModalOpen(true)
  }

  const handleUserChange = (accessor,event) =>{
    const selectedUser = users.filter((item)=> item._id === event.value )[0]
    setEditModalData((prevState)=> ({...prevState, [accessor]: selectedUser}))
  }
  return (
    <Panel className="mb-0" style={{ position: "relative" }}>
      <PanelHeader>Tickets</PanelHeader>
      <PanelBody>
        <Filters
          statusOptions={statusOptions}
          priorityOptions={priorityOptions}
          categoryOptions={categoryOptions}
          onChangeDateRange={() => {}}
          setFilterState={setFilterState}
          filterState={filterState}
          addTicketModal={addTicketModal}
        />
        <div
          className="d-flex rounded mx-2"
          style={{ marginTop: "10px", width: "fit-content" }}
        >
          <button
            onClick={switchToActiveTab}
            className={`btn mr-2`}
            style={{
              background: "#4EF04E",
            }}
          >
            Active
          </button>
          <button
            onClick={switchToArchive}
            className="btn"
            style={{
              background: "#ACADAC",
            }}
          >
            Archive
          </button>
        </div>
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
            events={calendarEvents}
            slotDuration={"00:15:00"}
            // events="https://fullcalendar.io/demo-events.json?single-day&for-resource-timeline"
            resources={statusTabButton ? tickets : archievedState}
            resourceAreaColumns={[
              {
                field: "AssignedTo",
                headerContent: "AssignedTo",
              },
              {
                field: "Owner",
                headerContent: "Created By",
              },
            ]}
            customButtons={{}}
            headerToolbar={{
              left: "addCardButton resourceTimelineMonth,resourceTimelineWeek,resourceTimelineDay",
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
            editable={true}
          />
          <Modal isOpen={isEditModalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>{ isEditModal ? 'Edit': 'Add' } Tickets</ModalHeader>
            <ModalBody>
              <form>
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="">
                    Ticket No
                  </label>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      className={"w-100 h-100"}
                      value={editModalData.ticketNo}
                      name="ticketNo"
                      onChange={handleChangeText}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="">
                    Name
                  </label>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      className={"w-100 h-100"}
                      value={editModalData.name}
                      name="name"
                      onChange={handleChangeText}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="">
                    Narrative
                  </label>
                  <div className={"col-lg-8"}>
                    <input
                      type="text"
                      value={editModalData.narrative}
                      name="narrative"
                      className="w-100 h-100"
                      onChange={handleChangeText}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="">
                    Category
                  </label>
                  <div className="col-lg-8">
                    <ReactSelect
                      options={categoryOptions}
                      onChange={(e)=> selectBoxChange(e, categoryOptions, 'category')}
                      value={
                        categoryOptions.filter(
                          (item) => item.value === editModalData.category
                        )[0]
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="">
                    Status
                  </label>
                  <div className="col-lg-8">
                    <ReactSelect
                      options={statusOptions}
                      onChange={(e)=>selectBoxChange(e, statusOptions, 'status')}
                      value={
                        statusOptions.filter(
                          (item) => item.value === editModalData.status
                        )[0]
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="">
                    Priority
                  </label>
                  <div className="col-lg-8">
                    <ReactSelect
                    onChange={(e)=>selectBoxChange(e, priorityOptions, 'priority')}
                      options={priorityOptions}
                      value={
                        priorityOptions.filter(
                          (item) => item.value === editModalData.priority
                        )[0]
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="">
                    Color
                  </label>
                  <div className="col-lg-8">
                    <input
                      value={editModalData.color}
                      type="text"
                      className="w-100 h-100"
                      name="ticketNo"
                      onChange={handleChangeText}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="">
                    Created On
                  </label>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      className="w-100 h-100"
                      value={moment(new Date(editModalData.createdOn)).format(
                        "MM/DD/YYYY HH:MM"
                      )}
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="">
                    Deadline
                  </label>
                  <div className="col-lg-8">
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
                      onChange={(date) => setEditModalData(prevState=> ({...prevState,deadline:date}))}
                      secondAriaLabel="Second"
                      disableCalendar={true}
                      name="start"
                      value={editModalData.deadline}
                      yearAriaLabel="Year"
                      className="w-100 h-100"
                    />
                  </div>
                </div>
                {
                  isEditModal &&(
                  <div className="form-group row">
                    <label className="col-lg-4 col-form-label">Created By</label>
                    <div className="col-lg-8">
                      <Avatar userInfo={editModalData.user} />
                    </div>
                  </div>
                  )
                }
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label">Assigned To</label>
                  <div className="col-lg-4">
                    {
                      editModalData.assignedTo && editModalData.assignedTo.imageSrc && (
                        <Avatar userInfo={editModalData.assignedTo} />
                      )
                    }
                  </div>
                  <div className="col-lg-4">
                    <ReactSelect options={userOptions} onChange={(e)=> handleUserChange("assignedTo", e)} value={getAssignedToUser} />
                  </div>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              {/* <button className="btn btn-white" onClick={() => this.toggleModal()}>Close</button> */}

              <button
                className="btn btn-red"
                title="Cancel the Appointment"
                onClick={toggleModal}
              >
                <i className="ion md-close"></i>Cancel
              </button>
              <button
                className="btn btn-green"
                type="submit"
                title="Save the Appointment"
                onClick={saveModalData}
                disabled={isLoading}
              >
                <i className="far fa-save"></i>{" "}
                {isLoading ? "Saving..." : "Save"}
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </PanelBody>
    </Panel>
  );
};

export default TimelineTicketTask;

const RenderEvent = ({ eventInfo, toggleModal, setEditModalData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleClick = (event) => {
    event.preventDefault();
    if (event.type === "contextmenu") {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMousePosition = (event) => {
    setMouseY(event.clientY);
    setMouseX(event.clientX);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openEditModal = () => {
    setEditModalData(eventInfo.event.id);
    toggleModal();
  };
  return (
    <>
      <div
        onClick={openEditModal}
        onContextMenu={handleClick}
        onMouseDown={handleMousePosition}
        style={{
          width: "100%",
          backgroundColor: eventInfo.event.color,
          padding: "5px",
        }}
      >
        {eventInfo.event.title}
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
        <MenuItem onClick={toggleModal}>
          <ListItemIcon>
            <VisibilityIcon />
          </ListItemIcon>
          <Typography>View {eventInfo.event.title}</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <Typography>Edit {eventInfo.event.title}</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <Typography>Delete {eventInfo.event.title}</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ShareIcon />
          </ListItemIcon>
          <Typography>Get Link for {eventInfo.event.title}</Typography>
        </MenuItem>
      </Popover>
    </>
  );
};

const Avatar = ({ userInfo }) => {
  if(!userInfo && !userInfo.contactName && !userInfo.contactName.first) return <div />
  const name = userInfo.contactName.first + " " + userInfo.contactName.last;
  return (
    <div className="d-flex flex-row align-items-center">
      <img
        className="mx-1 rounded-circle"
        style={{ width: "20px", height: "20px" }}
        src={userInfo.imageSrc}
        alt={name}
      />
      <p className="mx-2 my-0">{name}</p>
    </div>
  );
};
