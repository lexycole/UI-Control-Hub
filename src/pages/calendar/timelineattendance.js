import React, { useState, useEffect, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Modal from "@material-ui/core/Modal";
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
import { getShifts } from "../../../src/services/shifts";
import { getUser } from "../../../src/services/users";

import DateRange from "./daterange";
import { apiUrl } from "../../config/config.json";
import "./c.scss";
import { Typography } from "@material-ui/core";
import Filters from "./Filters";
import _ from "lodash";


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

let url =
  "https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=40&h=40.0&fit=crop";
const TimelineShifts = () => {
  const calendarRef = useRef(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [responseKanbanData, setResponseKanbanData] = useState([]);
  const [kanbans, setKanbans] = useState([]);
  const [filterState, setFilterState] = useState({});
  const [statusTabButton, setStatusTabButton] = useState("active");
  const [archievedState, setArchivedState] = useState([]);

  const renderEvent = (eventInfo) => {
    return <RenderEvent eventInfo={eventInfo} />;
  };

  const trimDataForAvatar = (kanbans) => {
    const array = new Array();
    kanbans.forEach((kanban, index) => {
      const participants = kanban.participants;
      if (participants) {
        array.push({
          id: participants._id,
          ListKanban: kanban.listKanbanNo,
          Kanban: participants.contactName.first + ' ' + participants.contactName.last,
          AssignedTo: <Avatar userInfo={kanban.participants} />,
        });
      }
    });
    return array;
  };

  const trimDataForCalendar = (data) => {
    const array = new Array();
    data.forEach((item, index) => {
      array.push({
        id: item._id,
        name: item.name,
        location: item.location,
        start: new Date(item.startTime),
        end: new Date(item.endTime),
        resourceId: item.participants._id,
        color: COLORS[index.toString().slice(-1)],
      });
    });
    return array;
  };

  const filter = () => {
    const filteredData = _.filter(responseShiftData, filterState);
    setShifts(trimDataForCalendar(filteredData));
  };
  const fetchShifts = async () => {
    try {
      const { data } = await getShifts()
      console.log("Shifts Data",data)
      const response = await getShifts();
      setResponseShiftData(response.data);

      let [archived,active ] = _.partition(response.data, { status: 'archive' })
      const trimmedActiveData = trimDataForAvatar(active);
      const trimmedArchivedData = trimDataForAvatar(archived);
      setShifts(trimmedActiveData);
      setArchivedState(trimmedArchivedData);
      setCalendarEvents(trimDataForCalendar(active));

    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (!responseShiftData.length) fetchShifts();
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
  return (
    <Panel className="mb-0" style={{ position: "relative" }}>
      <PanelHeader>Timeline Of Shifts</PanelHeader>
      <PanelBody>
	  {/*        <Filters
          statusOptions={statusOptions}
          priorityOptions={priorityOptions}
          categoryOptions={categoryOptions}
          onChangeDateRange={() => {}}
          setFilterState={setFilterState}
          filterState={filterState}
	  />  */}
        <div
          className="d-flex rounded mx-2"
          style={{ marginTop: "10px", width: "fit-content" }}
        >
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
            // events="https://fullcalendar.io/demo-events.json?single-day&for-resource-timeline"
            resources={statusTabButton ? kanbans : archievedState}
            resourceAreaColumns={[
              {
                field: "Employee",
                headerContent: "Owner",
              },
              {
                field: "Supervisor",
                headerContent: "supervisor",
              },
              {
                field: "Department",
                headerContent: "Department",
              },
            ]}
            headerToolbar={{
              left: "addShiftButton resourceTimelineMonth,resourceTimelineWeek,resourceTimelineDay",
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
        </div>
      </PanelBody>
    </Panel>
  );
};

export default TimelineShifts;

const RenderEvent = ({ eventInfo }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  console.log(eventInfo);

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
        <MenuItem onClick={handleClose}>
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

const Avatar = ({ userId }) => {
  const [userInfo, setUserInfo] = useState({
    imageSrc: "",
    contactName: {
      first: "",
      initials: "",
      last: "",
    },
  });
  const name = userInfo.contactName.first + " " + userInfo.contactName.last;
  useEffect(() => {
    getUser(userId).then(({ data }) => {
      setUserInfo(data);
    });
  }, []);
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
