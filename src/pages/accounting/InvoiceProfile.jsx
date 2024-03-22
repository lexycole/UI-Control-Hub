import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import BasicInfo from "./BasicInfoFields/BasicInfo";
import { Panel, PanelHeader, PanelBody, } from "../../components/panel/panel.jsx";
// import SpreadSheet from "./SpreadSheet";
import ReusableTabNavs from "./ReusableTabNavs";
import ReusableTab from "./ReusableTab";
import { TabContent, Button, Form, FormGroup, Label, Input, Table, Row, Col, } from "reactstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./c.css";
import { saveAppointment, getAppointment, sharingAppointment } from "./../../services/appointments";
import { getUsers } from "../../services/users";
import { getDoctors } from "../../services/doctors";
import { Spinner } from "react-bootstrap";
import { AwesomeQRCode } from "@awesomeqr/react";
import http from "./../../services/httpService";
import { apiUrl } from "./../../config/config.json";
import moment from "moment";
import Tabsharing from "./TabSharing/Tabsharing";
import { toast } from "react-toastify";

//import Actions from "./../../../src/components/Appointment/Action";
//import Card from "./../../../src/components/Appointment/Card";
//import Filter from "./../../../src/components/Appointment/Filters";
//import Category from "./../../../src/components/Appointment/Category";
//import "./../../../src/components/kanban/style.css";

class AppointmentProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      readOnly: true,
      activeTab: 1,
      read: true,
      users: [],
      data: {
        Doctorname: "",
        appointmentType: "",
        appointmentNo: "",
        sessionType: "",
        businessName: "",
        doctorNo: "",
        patientNo: "",
        clinicNo: "",
        title: "",
        startTime: "",
        endTime: "",
        date: new Date(),
        note: "",
        //assigned to one only
        status: "",
        users: [
          {
            userid: "",
            email: "",
            registerId: "",
            nonRegisterEmail: "",
            username: "",
            avatar: "",
            sharedtilldate: "",
            view: true,
            comment: false,
            edit: false,
          },
        ],
        sharedTo: [],
        sharedTill: [],
        permissions: [],
        link: "",
        sharedUsers: [],
        sharedNonregistredUsers: []
      },
      isLoading: true,
      selectedFile: null,
      loaded: 0,
      submitted: false,
    };

    this.appointmentTypeOptions = [
      { value: "clinic", label: "clinic" },
      { value: "home", label: "home" },
      { value: "videocall", label: "videocall" },
      { value: "phone", label: "phone" },
    ];

    this.sessionOptions = [
      { value: "follow", label: "follow" },
      { value: "intake", label: "intake" },
    ];

    this.statusOptions = [
      { value: "active", label: "active" },
      { value: "archived", label: "archived" },
      { value: "pending", label: "pending" },
      { value: "invoiced", label: "invoiced" },
      { value: "canceled<24hours", label: "canceled < 24hours" },
      { value: "in-treatment", label: "in treatment" },
    ];

    this.setReadOnly = this.setReadOnly.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
    this.toggleRead = this.toggleRead.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNotRegisteredUserChange = this.handleNotRegisteredUserChange.bind(this);
    this.handleRegisteredUserChange = this.handleRegisteredUserChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleInvitedRegisterdUsersCheckboxChange = this.handleInvitedRegisterdUsersCheckboxChange.bind(this)
    this.handleInvitedNonRegisterdUsersCheckboxChange = this.handleInvitedNonRegisterdUsersCheckboxChange.bind(this)
    this.handleInvitedRegisteredUsersDateChange = this.handleInvitedRegisteredUsersDateChange.bind(this)
    this.handleInvitedNonRegisteredUsersDateChange = this.handleInvitedNonRegisteredUsersDateChange.bind(this)
  }

  async populateAppointment() {
    try {
      const id = this.props.match.params.id;
      const { data: Appointment } = await getAppointment(id);
      let sharedUsers = [], sharedNonUsers = [];
      Appointment.share.sharedTo.map((shareduser, index) => {
        console.log("shared user--");
        console.log(shareduser);
        let sharedobject = {
          userid: shareduser._id,
          email: shareduser.email,
          registerId: shareduser._id,
          nonRegisterEmail: shareduser.email,
          username: shareduser.username,
          avatar: shareduser.imageSrc,
          sharedtilldate: Appointment.share.sharedTill[index],
          view: Appointment.share.permissions[index].view,
          comment: Appointment.share.permissions[index].comment,
          edit: Appointment.share.permissions[index].edit,
        };
        console.log("shared obj");
        console.log(sharedobject);
        sharedUsers.push(sharedobject);
      });
      Appointment.shareNoregistredUsers.sharedTo.map((shareduser, index) => {
        console.log("shared user--");
        console.log(shareduser);
        let sharedobject = {
          userid: "",
          email: shareduser,
          registerId: "",
          nonRegisterEmail: shareduser,
          username: "",
          avatar: "",
          sharedtilldate: Appointment.shareNoregistredUsers.sharedTill[index],
          view: Appointment.shareNoregistredUsers.permissions[index].view,
          comment: Appointment.shareNoregistredUsers.permissions[index].comment,
          edit: Appointment.shareNoregistredUsers.permissions[index].edit,
        };
        console.log("shared obj");
        console.log(sharedobject);
        sharedNonUsers.push(sharedobject);
      });
      this.setState({ data: this.mapToViewModel({ Appointment, sharedusers: sharedUsers, sharedNonregistredUsers: sharedNonUsers }) });
      console.log(this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/error");
    }
  }

  async populateUsers() {
    const { data: users } = await getUsers();
    users.map((user) => {
      user['invitationSent'] = 0;
      if (this.state.data.sharedUsers.some(sharedUser => sharedUser.userid == user._id)) {
        user['invitationSent'] = 1
      }
    })
    this.setState({ users });
  }

  formatSelectUsers = (users) => (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "10px" }}>
          <img width={15} src={users.imageSrc} alt="user img" />
        </div>
        <div>{users.contactName.first + " " + users.contactName.last}</div>
      </div>
    </div>
  );

  handleInputChange = (value) => {
    console.log("value", value)
    const data = { ...this.state.data }
    console.log("changes", { ...data, ...value })
    this.setState({ data: { ...data, ...value } })
  }

  handleNotRegisteredUserChange = (name, value, userIndex) => {
    const data = { ...this.state.data };
    data["users"] = this.state.data.users.map((item, index) =>
      index === userIndex
        ? {
          ...item,
          [name]: value,
        }
        : item
    );
    this.setState({ data });
  };

  handleRegisteredUserChange = (name, value, userIndex) => {
    const data = { ...this.state.data };
    let username, useremail, avatar;
    this.state.users.map((user) => {
      if (user._id === value._id) {
        username = user.username;
        useremail = user.email;
        avatar = user.imageSrc
      }
    });
    data["users"] = this.state.data.users.map((item, index) =>
      index === userIndex
        ? {
          ...item,
          [name]: value._id,
          registerId: value._id,
          username: username,
          email: useremail,
          avatar: avatar
        }
        : item
    );
    this.setState({ data });
  };

  handleDateChange = (name, value, userIndex) => {
    const data = { ...this.state.data };
    data["users"] = this.state.data.users.map((item, index) =>
      index === userIndex ? { ...item, [name]: value } : item
    );
    this.setState({ data });
  };

  handleCheckboxChange = (name, userIndex) => {
    const data = { ...this.state.data };
    data["users"] = this.state.data.users.map((item, index) =>
      index === userIndex ? { ...item, [name]: !item[name] } : item
    );
    this.setState({ data });
  };

  handleInvitedRegisterdUsersCheckboxChange = (name, userIndex) => {
    const data = { ...this.state.data };
    data["sharedUsers"] = this.state.data.sharedUsers.map((item, index) =>
      index === userIndex ? { ...item, [name]: !item[name] } : item
    );
    this.setState({ data });
  }

  handleInvitedNonRegisterdUsersCheckboxChange = (name, userIndex) => {
    const data = { ...this.state.data };
    data["sharedNonregistredUsers"] = this.state.data.sharedNonregistredUsers.map((item, index) =>
      index === userIndex ? { ...item, [name]: !item[name] } : item
    );
    this.setState({ data });
  }

  handleInvitedRegisteredUsersDateChange = (name, value, userIndex) => {
    const data = { ...this.state.data };
    data["sharedUsers"] = this.state.data.sharedUsers.map((item, index) =>
      index === userIndex ? { ...item, [name]: value } : item
    );
    this.setState({ data });
  };

  handleInvitedNonRegisteredUsersDateChange = (name, value, userIndex) => {
    const data = { ...this.state.data };
    data["sharedNonregistredUsers"] = this.state.data.sharedNonregistredUsers.map((item, index) =>
      index === userIndex ? { ...item, [name]: value } : item
    );
    this.setState({ data });
  };

  addUser = () =>
    this.setState({
      data: {
        ...this.state.data,
        users: [
          ...this.state.data.users,
          {
            userid: "",
            email: "",
            registerId: "",
            nonRegisterEmail: "",
            username: "",
            sharedtilldate: "",
            view: true,
            comment: false,
            edit: false,
          },
        ],
      },
    });

  removeUser = (index) => {
    this.setState({
      data: {
        ...this.state.data,
        users: this.state.data.users.filter((mem, i) => index !== i),
      },
    });
  };

  removeInvitedRegisteredUser = (index) => {
    this.setState({
      data: {
        ...this.state.data,
        sharedUsers: this.state.data.sharedUsers.filter((mem, i) => index !== i),
      },
    });
  };

  removeInvitedNonRegisteredUser = (index) => {
    this.setState({
      data: {
        ...this.state.data,
        sharedNonregistredUsers: this.state.data.sharedNonregistredUsers.filter((mem, i) => index !== i),
      },
    });
  };

  hanldeInvitedUsersSubmit = async (e, condition, index) => {
    e.preventDefault();
    const { data } = this.state;
    const id = this.props.match.params.id;
    const sharedRegistrationUsers = [];
    const sharedNonRegistrationUsers = [];
    const sharedTill = [];
    const sharedTillNonReg = [];
    const permissions = [];
    const permissionsNonReg = [];
    const usersToMail = [];

    console.log("--sharedRegistrationUsers");
    console.log(sharedRegistrationUsers);

    console.log("prvs shared users--");
    console.log(data.sharedUsers);

    this.state.data.sharedUsers.map((i, ind) => {
      if (condition === "Registered" && index === ind) {
        return
      }
      if (i.userid && i.userid !== "") {
        sharedRegistrationUsers.push(i.userid);
        sharedTill.push(i.sharedtilldate);
        permissions.push({ view: i.view, comment: i.comment, edit: i.edit });
      }
    });

    this.state.data.sharedNonregistredUsers.map((i, ind) => {
      if (condition === "Non Registered" && index === ind) {
        return
      }
      if (i.email && i.email !== "") {
        sharedNonRegistrationUsers.push(i.email);
        sharedTillNonReg.push(i.sharedtilldate);
        permissionsNonReg.push({ view: i.view, comment: i.comment, edit: i.edit });
      }
    });

    console.log("--final sharedRegistrationUsers");
    console.log(sharedRegistrationUsers);
    try {
      const share = {
        _id: id,
        sharingLink: data.link,
        usersToMail: usersToMail,
        sharedTo: sharedRegistrationUsers,
        sharedTill,
        permissions,
        sharedToNonReg: sharedNonRegistrationUsers,
        sharedTillNonReg,
        permissionsNonReg,
      };
      await sharingAppointment(share);
    } catch (ex) {
      if (ex.response) {
        const errors = { ...this.state.errors };
        errors.status = ex.response.data;
        this.setState({ errors });
      }
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { data } = this.state;
    const id = this.props.match.params.id;
    const sharedRegistrationUsers = [];
    const sharedNonRegistrationUsers = [];
    const sharedTill = [];
    const sharedTillNonReg = [];
    const permissions = [];
    const permissionsNonReg = [];
    const newRegUsersExtended = [];
    const newNonRegUsersExtended = [];
    const usersToMail = [];

    let zeroUsers = false;

    console.log("-in handle submit init");

    console.log(data.users);
    data.users.map((i) => {

      if (i.registerId == "" && i.nonRegisterEmail == "") {
        zeroUsers = true;
      }
      else {
        console.log("--user");
        console.log(i);
        if (i.registerId && i.registerId !== "") {
          if (!sharedRegistrationUsers.includes(i.registerId)) {
            sharedRegistrationUsers.push(i.registerId);
            newRegUsersExtended.push(
              {
                userid: i.userid,
                email: i.email,
                registerId: i.registerId,
                nonRegisterEmail: i.nonRegisterEmail,
                username: i.username,
                sharedtilldate: i.sharedtilldate,
                view: i.view,
                comment: i.comment,
                edit: i.edit,
              }
            )
            if (!(data.sharedUsers.some(sharedUser => sharedUser.userid == i.registerId))) {
              usersToMail.push(i.email)
            }
            sharedTill.push(i.sharedtilldate);
            permissions.push({ view: i.view, comment: i.comment, edit: i.edit });
          }

        } else if (i.nonRegisterEmail && i.nonRegisterEmail !== "") {
          if (!sharedNonRegistrationUsers.includes(i.nonRegisterEmail)) {
            sharedNonRegistrationUsers.push(i.nonRegisterEmail);
            newNonRegUsersExtended.push(
              {
                userid: i.userid,
                email: i.nonRegisterEmail,
                registerId: i.registerId,
                nonRegisterEmail: i.nonRegisterEmail,
                username: i.username,
                sharedtilldate: i.sharedtilldate,
                view: i.view,
                comment: i.comment,
                edit: i.edit,
              }
            )
            if (!(data.sharedNonregistredUsers.some(sharedUser => sharedUser.email == i.nonRegisterEmail))) {
              usersToMail.push(i.nonRegisterEmail)
            }
            sharedTillNonReg.push(i.sharedtilldate);
            permissionsNonReg.push({ view: i.view, comment: i.comment, edit: i.edit });
          }
        }
      }
    });

    if (zeroUsers == true) {
      toast.error('Kindly select users!');
      this.setState({ submitted: false });
    }
    else {
      console.log("--sharedRegistrationUsers");
      console.log(sharedRegistrationUsers);

      console.log("prvs shared users--");
      console.log(data.sharedUsers);

      data.sharedUsers?.map((i) => {
        if (i.userid && i.userid !== "") {
          sharedRegistrationUsers.push(i.userid);
          sharedTill.push(i.sharedtilldate);
          permissions.push({ view: i.view, comment: i.comment, edit: i.edit });
        }
      });

      data.sharedNonregistredUsers?.map((i) => {
        if (i.email && i.email !== "") {
          sharedNonRegistrationUsers.push(i.email);
          sharedTillNonReg.push(i.sharedtilldate);
          permissionsNonReg.push({ view: i.view, comment: i.comment, edit: i.edit });
        }
      });

      console.log("--final sharedRegistrationUsers");
      console.log(sharedRegistrationUsers);
      try {
        const share = {
          _id: id,
          sharingLink: data.link,
          usersToMail: usersToMail,
          sharedTo: sharedRegistrationUsers,
          sharedTill,
          permissions,
          sharedToNonReg: sharedNonRegistrationUsers,
          sharedTillNonReg,
          permissionsNonReg,
        };
        await sharingAppointment(share);
        //this.props.history.push("/ticket/tickets");
        toast.success("Invitation Sent!");

        //update shared users//START

        this.setState({
          data: {
            ...this.state.data,
            users: [
              {
                userid: "",
                email: "",
                registerId: "",
                nonRegisterEmail: "",
                username: "",
                sharedtilldate: "",
                avatar: "",
                view: true,
                comment: false,
                edit: false,
              },
            ],
            sharedUsers: [
              ...this.state.data.sharedUsers,
              ...newRegUsersExtended,
            ],
            sharedNonregistredUsers: [
              ...this.state.data.sharedNonregistredUsers,
              ...newNonRegUsersExtended
            ]
          },
        });
        console.log("final sharedUsers");
        console.log(...this.state.data.sharedUsers);

        console.log("final data . users");
        console.log(...this.state.data.users);
        //empty data.users////END///

        this.setState({ submitted: false });
        console.log("--after handle submit")
      } catch (ex) {
        if (ex.response) {
          const errors = { ...this.state.errors };
          errors.status = ex.response.data;
          this.setState({ errors });
        }
        this.setState({ submitted: false });
      }
    }

  };

  async componentDidMount() {
    await this.populateAppointment();
    await this.populateUsers();
    this.setState({ isLoading: false });
  }

  mapToViewModel({ Appointment, sharedusers, sharedNonregistredUsers }) {
    return {
      _id: Appointment._id,
      Doctorname: Appointment.Doctorname,
      appointmentType: Appointment.appointmentType,
      appointmentNo: Appointment.appointmentNo,
      sessionType: Appointment.sessionType,
      businessName: Appointment.businessName,
      doctorNo: Appointment.doctorNo._id,
      patientNo: Appointment.patientNo._id,
      clinicNo: Appointment.clinicNo._id,
      title: Appointment.title,
      startTime: new Date(Appointment.startTime),
      endTime: new Date(Appointment.endTime),
      date: new Date(Appointment.startTime),
      note: Appointment.note,
      status: Appointment.status,
      users: this.state.data.users,
      sharedTo: this.state.data.sharedTo,
      sharedTill: this.state.data.sharedTill,
      permissions: this.state.data.permissions,
      link: `${window.location.origin}/publicappointmentprofile/${Appointment._id}`,
      sharedUsers: sharedusers,
      sharedNonregistredUsers: sharedNonregistredUsers
    };
  }



  setActiveTab = (n) => this.setState({ activeTab: n });
  actions = [
    { label: "Save", icon: "fa-save", trigger: (e) => this.onClickHandler(e, this.state.data) },
    { label: "Edit", icon: "fa-edit", trigger: () => this.setReadOnly() },
    { label: "Print", icon: "fa-print", trigger: () => { } },
    { label: "Share", icon: "fa-share", trigger: () => { } },
    { label: "Save as PDF", icon: "fas-fa-file-pdf", trigger: () => { }, },
  ];

  toggleRead = () => this.setState({ read: !this.state.read });

  setReadOnly = () => this.setState({ readOnly: !this.state.readOnly });

  ///

  ///
  onChangeHandler = (event) => {
    const files = event.target.files;

    // if return true allow to setState
    this.setState({
      selectedFile: files,
      loaded: 0,
    });
  };

  onClickHandler = async (e) => {
    e.preventDefault();
    console.log(this.state.selectedFile, this.state.data);
    try {
      const { data, selectedFile } = this.state;
      const apiEndpoint = apiUrl + "/Appointments";
      const formData = new FormData();
      const body = { ...data };
      body.start = new Date(body.date)
      body.start.setMinutes(body.startTime.getMinutes())
      body.start.setHours(body.startTime.getHours())
      body.start.toString()
      body.end = new Date(body.date)
      body.end.setMinutes(body.endTime.getMinutes())
      body.end.setHours(body.endTime.getHours())
      body.end.toString()
      body["complaint"] = body.title
      // let hour = body.startTime.getHours();
      // let minute = body.startTime.getMinutes();
      // let [hour, minute] = data.startTime.toString().split(":");
      // body.start = moment(body.date).add({ hours: hour, minutes: minute }).toString();
      // hour = body.endTime.getHours();
      // minute = body.endTime.getMinutes();
      // [hour, minute] = data.endTime.toString().split(":");
      // body.end = moment(body.date).add({ hours: hour, minutes: minute }).toString();
      delete body._id;
      delete body.Doctorname;
      delete body.Doctors;
      delete body.date;
      delete body.startTime;
      delete body.endTime;
      delete body.title
      console.log("BOODY", body)
      for (let key in body) {
        formData.append(key, body[key]);
      }
      if (selectedFile) {
        for (let x = 0; x < selectedFile.length; x++) {
          formData.append("attachments", selectedFile[x]);
        }
      }
      http.put(apiEndpoint + "/" + this.props.match.params.id, formData, {
        onUploadProgress: (ProgressEvent) => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          });
        },
      });

      //this.props.history.push("/clinic/Appointments");
    } catch (ex) {
      console.log(ex)
      if (ex.response) {
        console.log(ex.response.data);
      }
    }
  };

  render() {
    console.log(this.state.data);
    console.log("users", this.state.users)
    if (this.state.isLoading === true)
      return (
        <Spinner
          animation="border"
          style={{
            width: "6rem",
            height: "6rem",
            border: "1px solid",
            position: "fixed",
            top: "50%",
            left: "50%",
          }}
        />
      );
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/calendar/appointments">Appointments</Link>
          </li>
        </ol>
        <h1 className="page-header">Appointment-profile</h1>
        <div className="row">
          <div className="col-12">
            <Panel>
              <PanelHeader noButton>Appointments</PanelHeader>
              <PanelBody>
                <h1>{this.state.data.appointmentNo}</h1>

                <ReusableTabNavs
                  actions={this.actions}
                  setActiveTab={(n) => this.setActiveTab(n)}
                  activeTab={this.state.activeTab}
                  navprops={[
                    { label: "Basic information", background: "#FFC69F" },
                    { label: "Comments", background: "#FFC6FF" },
                    { label: "Reviews", background: "#FFF5AD" },
                    { label: "Sharing", background: "#A2F5AD" },
                    { label: "Notes", background: "#FFFFC9" },
                  ]}
                />
                <TabContent activeTab={this.state.activeTab}>
                  <ReusableTab id={1}>
                    <BasicInfo
                      readOnly={this.state.readOnly}
                      setReadOnly={() => this.setReadOnly()}
                      appointmentTypeOptions={this.appointmentTypeOptions}
                      sessionTypeOptions={this.sessionTypeOptions}
                      statusOptions={this.statusOptions}
                      data={this.state.data}
                      onChangeHandler={this.onChangeHandler}
                      onClickHandler={this.onClickHandler}
                      loaded={this.state.loaded}
                      onInputChange={this.handleInputChange}
                    />
                  </ReusableTab>
                  <ReusableTab id={2}>
                    <>
                      <h4>Comments</h4>
                      <p>
                        Nullam ac sapien justo. Nam augue mauris, malesuada non
                        magna sed, feugiat blandit ligula. In tristique
                        tincidunt purus id iaculis. Pellentesque volutpat tortor
                        a mauris convallis, sit amet scelerisque lectus
                        adipiscing.
                      </p>
                    </>
                  </ReusableTab>
                  <ReusableTab id={3}>
                    <>
                      <h4>Reviews</h4>
                      <p>
                        task nr 11
                        http://cameronroe.github.io/react-star-rating/
                        https://github.com/SahajR/react-star-review
                      </p>
                    </>
                  </ReusableTab>
                  <ReusableTab id={4}>
                    <Tabsharing
                      removeUser={this.removeUser}
                      removeInvitedRegisteredUser={this.removeInvitedRegisteredUser}
                      removeInvitedNonRegisteredUser={this.removeInvitedNonRegisteredUser}
                      handleRegisteredUserChange={this.handleRegisteredUserChange}
                      handleNotRegisteredUserChange={this.handleNotRegisteredUserChange}
                      handleCheckboxChange={this.handleCheckboxChange}
                      handleDateChange={this.handleDateChange}
                      handleSubmit={this.handleSubmit}
                      hanldeInvitedUsersSubmit={this.hanldeInvitedUsersSubmit}
                      addUser={this.addUser}
                      data={this.state.data}
                      selectUsers={this.state.users}
                      formatSelectUsers={this.formatSelectUsers}
                      handleInvitedRegisterdUsersCheckboxChange={this.handleInvitedRegisterdUsersCheckboxChange}
                      handleInvitedNonRegisterdUsersCheckboxChange={this.handleInvitedNonRegisterdUsersCheckboxChange}
                      handleInvitedRegisteredUsersDateChange={this.handleInvitedRegisteredUsersDateChange}
                      handleInvitedNonRegisteredUsersDateChange={this.handleInvitedNonRegisteredUsersDateChange}
                      submitted={this.state.submitted}
                    />
                  </ReusableTab>
                  <ReusableTab id={5}>
                    <>
                      <h4>Notes</h4>
                      <p>
                        task nr 10 making use of file email/inbox to for
                        implementation notes in tab “Notes” . the files you have
                        to use and work on are located in src/page/Appointment When
                        clicking on the subject, the “details of note” will be
                        unfold. Use class accordion. For post a note make use of
                        notecompose. c. build in button to close the detail and
                        redirect back to noteinbox
                      </p>
                    </>
                  </ReusableTab>
                </TabContent>
              </PanelBody>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

export default AppointmentProfile;