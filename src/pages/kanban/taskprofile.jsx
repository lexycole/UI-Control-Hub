import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../components/panel/panel.jsx";
import BasicInfo from "./task/BasicInfoFields/BasicInfo";
// import SpreadSheet from "./SpreadSheet";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Form,
  FormGroup,
  Input,
  Label,
  TabContent
} from "reactstrap";
import ReusableTab from "./../../newcommon/ReusableTab";
import ReusableTabNavs from "./../../newcommon/ReusableTabNavs";
import Spreadsheet from "./Spreadsheet/SpreadSheet";
//import "./index.css";
import { Spinner } from "react-bootstrap";
import { getUsers } from "../../services/users";
// import { getKanban } from "./../../services/kanbans";
import { getTask, saveTask } from "./../../services/tasks";
import Fishbone from "./Fishbone/Fishbone";

import { apiUrl } from "./../../config/config.json";
import http from "./../../services/httpService";

//import Actions from "./../../../src/components/task/Action";
//import Card from "./../../../src/components/task/Card";
//import Filter from "./../../../src/components/task/Filters";
//import Category from "./../../../src/components/task/Category";
//import "./../../../src/components/kanban/style.css";

import Comments from "../../components/common/comments/Comments.jsx";
import { getInternalPostTopic } from "../../services/internalposts";

class Taskprofile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      readOnly: true,
      activeTab: 1,
      read: true,
      users: [],
      kanbanName:"",
      tops:[] ,
      allPosts : [],
      allComments: [],
      data: {
        username: "",
        category: "",
        narrative:"",		
        priority: "",
        businessName: "",
        department: "",
        subDepartment: "",
        locations: "",
        deadline: new Date(),
        field: "",
        tags: "",
        budget: "",
        cost: "",		
        reference: "",
        //assigned to one only
        participants: [],
        status: "",
        requester:"",
        users: [
          {
            userid: "",
            email: "",
            username: "",
            sharedtilldate: "",
            view: true,
            comment: false,
            edit: false,
          },
        ],
        sharedTo: [],
        sharedTill: [],
        permissions: [],
        sharingLink: "",
        sharedUsers: [],
        kanbanId:""
      },
      isLoading: true,
      selectedFile: null,
      loaded: 0,
    };

    this.categoryOptions = [
      { value: "feature-request", label: "feature-request" },
      { value: "disconnection", label: "disconnection" },
      { value: "bug-error", label: "bug-error" },
      { value: "sales", label: "sales" },
      { value: "complaint", label: "complaint" },
      { value: "orders", label: "orders" },
      { value: "other", label: "other" },
    ];

    this.priorityOptions = [
      { value: "high", label: "high" },
      { value: "normal", label: "normal" },
      { value: "low", label: "low" },
      { value: "urgent", label: "urgent" },
    ];

    this.statusOptions = [
      { value: "open", label: "open" },
      { value: "new", label: "new" },
      { value: "onhold", label: "onhold" },
      { value: "closed", label: "closed" },
      { value: "reopen", label: "reopen" },
    ];

    this.setReadOnly = this.setReadOnly.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
    this.toggleRead = this.toggleRead.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.updateComments = this.updateComments.bind(this);
  }

  removeFile=(files)=>{
    this.setState({selectedFile:files})
  }

  async populateTask() {
    try {
      const id = this.props.match.params.id;
      const { data: task } = await getTask(id);
      
      const postsOfTask = await getInternalPostTopic(id)
      this.setState({ allComments:postsOfTask?.data });

      let sharedusers = [];
      this.setState({ data: this.mapToViewModel(task, sharedusers) });
      this.setState({isLoading: false});
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/error");
    }
  }

  async updateComments({action, payload}){

    switch (action) {
      case "create":
          this.setState({ allComments: [...this.state.allComments, payload] });
        break;
      
      case "edit":
          const updatedComments = this.state.allComments.map((comment) => {
            if (comment._id === payload._id) {
              return payload;
            }
            return comment;
          });
          this.setState({ allComments: updatedComments });
        break;

      case "delete":
          const updateDeleteComment = this.state.allComments.filter(
            (comment) => comment._id !== payload._id
          );
          this.setState({ allComments: updateDeleteComment });
        break;
    
      default:
        break;
    }
  }

  async populateUsers() {
    const { data: users } = await getUsers();
    this.setState({ users });
    this.selectUsers = this.state.users.map((user) => ({
      value: user._id,
      label: user.email,
    }));
  }

  handleChange = (name, value, userIndex) => {
    const data = { ...this.state.data };
    let username, useremail;
    this.state.users.map((user) => {
      if (user._id === value) {
        username = user.username;
        useremail = user.email;
      }
    });
    data["users"] = this.state.data.users.map((item, index) =>
      index === userIndex
        ? {
            ...item,
            [name]: value,
            "username": username,
            "email": useremail,
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

  addUser = () =>
    this.setState({
      data: {
        ...this.state.data,
        users: [
          ...this.state.data.users,
          {
            username: "",
            email: "",
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

  async populateParticipants() {
		const { data: users } = await http.get(apiUrl + "/users");
    const temppartticipants=this.state.data.participants?.map((part)=>{
      const user=users.filter((user) => {
        return user._id==part;
       });
       return user[0];
    });
    this.setState({ data:{...this.state.data,participants:temppartticipants} });
	  }

  handleSubmit = async () => {
    const data = { ...this.state.data };
    let sharedto = [],
      sharedtill = [],
      permissions = [];
    const promises = await data.users.map((user, index) => {
      sharedto.push(user.userid);
      sharedtill.push(new Date(user.sharedtilldate));
      permissions.push({
        view: user.view,
        comment: user.comment,
        edit: user.edit,
      });
    });
    Promise.all(promises);
    data["sharedTo"] = sharedto;
    data["sharedTill"] = sharedtill;
    data["permissions"] = permissions;
    this.setState({ data });
    try {
      await saveTask(this.state.data, this.state.imageSrc);
      this.props.history.push("/task/tasks");
    } catch (ex) {
      if (ex.response) {
        const errors = { ...this.state.errors };
        errors.status = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  // populateKanban = async() => {
  //   const { data: kanban } = await getKanban(this.state.data?.kanbanId);
  //   this.setState({kanbanName:kanban.name})


  // }
  async componentDidMount() {
    await this.populateTask();	
    await this.populateUsers();
    await this.populateParticipants();
    // await this.populateKanban();
    this.setState({ isLoading: false });
  }
  
  mapToViewModel(task, sharedusers) {
    return {
      _id: task._id,
      username: task?.userID?.username,
      name: task?.name,
      narrative: task?.narrative,	  
      category: task?.category,
      priority: task?.priority,
      businessName: task?.businessName,
      department: task?.department,
      subDepartment: task?.subDepartment,
      locations: task?.locations,
      deadline: new Date(task?.deadline),
      field: task?.field,
      tags: task?.tags,
      budget: task?.budget,
      cost: task?.cost,
      reference: task?.reference,
      //assigned to one only
      participants: task?.participants,
      status: task?.status,
      requester: task?.userID,
      users: this.state.data.users,
      sharedTo: this.state.data.sharedTo,
      sharedTill: this.state.data.sharedTill,
      permissions: this.state.data.permissions,
      sharingLink: window.location.pathname,
      sharedUsers: sharedusers,
      narrative:task?.narrative,
      kanbanId: task?.kanbanNo
    };
  }

  setActiveTab = (n) => this.setState({ activeTab: n });
  actions = [
    { label: "Save", icon: "fa-save", trigger: () => {} },
    { label: "Edit", icon: "fa-edit", trigger: () => this.setReadOnly() },
    { label: "Print", icon: "fa-print", trigger: () => {} },
    { label: "Share", icon: "fa-share", trigger: () => {} },
    {
      label: "Archive",
      icon: "fa-archive",
      trigger: () => {},
    },

    {
      label: "Save as PDF",
      icon: "fas-fa-file-pdf",
      trigger: () => {},
    },
    {
      label: "Save as XLS",
      icon: "fas-fa-file-excel",
      trigger: () => {},
    },
    {
      label: "Save as CSV",
      icon: "fa-csv",
      trigger: () => {},
    },
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
    try {
      const { data, selectedFile } = this.state;
      const apiEndpoint = apiUrl + "/tasks";
      const formData = new FormData();
      const body = { ...data };
      delete body._id;
      for (let key in body) {
        formData.append(key, body[key]);
      }
      for (let x = 0; x < selectedFile.length; x++) {
        formData.append("attachments", selectedFile[x]);
      }
      http.put(apiEndpoint + "/" + data._id, formData, {
        onUploadProgress: (ProgressEvent) => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          });
        },
      });

      //this.props.history.push("/clinic/tasks");
    } catch (ex) {
      if (ex.response) {
        console.log(ex.response.data);
      }
    }
  };

  render() {
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

    // filter root comments
    const rootComments = this.state.allComments.filter(comment => !comment.parentId );

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
			<Link   style={{fontSize:"15px"}} to={`/kanban/allkanbans/${this.state.data?.kanbanId}`}>{this.state.kanbanName}</Link>		  
          </li>
        </ol>
        <h1 className="page-header">{this.state.data?.name}</h1>
        <div className="row">
          <div className="col-12">
            <Panel>
              <PanelHeader noButton>Task-Profile</PanelHeader>
              <PanelBody>
                <ReusableTabNavs
                  actions={this.actions}
                  setActiveTab={(n) => this.setActiveTab(n)}
                  activeTab={this.state.activeTab}
                  navprops={[
                    { label: "Basic information", background: "#FFC69F" },
                    { label: "Data Spreadsheet", background: "#DED99F" },
                    { label: "Comments", background: "#FFC6FF" },
                    { label: "Reviews", background: "#FFF5AD" },
                    { label: "Sharing", background: "#A2F5AD" },
                    { label: "Notes", background: "#FFFFC9" },
                    { label: "Fishbone", background: "#F4FF2B" },
                    { label: "Piechart", background: "#B09EFF" },
                  ]}
                />
                <TabContent activeTab={this.state.activeTab}>
                  <ReusableTab id={1} height={"100%"} width={"100%"}>
                    <BasicInfo
                      readOnly={this.state.readOnly}
                      setReadOnly={() => this.setReadOnly()}
                      categoryOptions={this.categoryOptions}
                      priorityOptions={this.priorityOptions}
                      statusOptions={this.statusOptions}
                      data={this.state.data}
                      onChangeHandler={this.onChangeHandler}
                      onClickHandler={this.onClickHandler}
                      loaded={this.state.loaded}
                    />
                  </ReusableTab>
                  <ReusableTab id={2} height={"100%"} width={"100%"}>
                    <Spreadsheet
                      readOnly={this.state.readOnly}
                      setReadOnly={() => this.setReadOnly()}
                    />
                  </ReusableTab>
                  <ReusableTab id={3}>
                    <Comments updateCommentsState={this.updateComments} createdAt="Task" rootComments={rootComments} allComments={this.state.allComments} />
                  </ReusableTab>
                  <ReusableTab id={4}>
                    <>
                      <h4>Reviews</h4>
                      <p>
                        task nr 11
                        http://cameronroe.github.io/react-star-rating/
                        https://github.com/SahajR/react-star-review
                      </p>
                    </>
                  </ReusableTab>
                  <ReusableTab id={5}>
                    <>
                      <div className="panel-body">
                        <fieldset>
                          <legend className="legend-text">
                            Sharing with others
                          </legend>

                          <CopyToClipboard text={this.state.data.sharingLink}>
                            <button type="linkclipboard" className="btn btn-sm btn-green m-r-5" >
                              Copy sharing-link to clipboard
                            </button>
                          </CopyToClipboard>

                          <div className="form-group">
                            <button type="button" class="btn btn-primary btn-sm"onClick={this.addUser}>
                              Add User/Email to share
                            </button>
                          </div>
                          {this.state.data?.users?.map((user, index) => (
                            <div className="row">
                              <div className="col-12 col-md-3">
                                <div className="form-group">
                                  <label>
                                    <b>Email :</b>
                                  </label>
                                  <Select options={this.selectUsers} placeholder={"Select user"}
                                    value={
                                      user.email && {
                                        value: user.email,
                                        label: user.email,
                                      }
                                    }
                                    onChange={(e) =>
                                      this.handleChange( "userid",e.value, index)
                                    }
                                  />
                                </div>
                              </div>

                              <div className="col-12 col-md-2">
                                <div className="form-group">
                                  <label>
                                    <b>User Name :</b>
                                  </label>
                                  <input disabled type="text" className="form-control" name="username" value={user.username}/>
                                </div>
                              </div>
                              <div className="col-12 col-md-4">
                                <div className="form-group">
                                  <label>
                                    <b>Rights &amp; permission</b>
                                  </label>
                                  <div>
                                    <FormGroup check inline>
                                      <Label check>
                                        <Input type="checkbox" name="view" checked={user.view}onChange={(e) =>
                                            this.handleCheckboxChange("view",index)
                                          }
                                        />
                                        <strong>View</strong>
                                      </Label>
                                    </FormGroup>
                                    <FormGroup check inline>
                                      <Label check>
                                        <Input type="checkbox" name="comment" checked={user.comment} onChange={(e) => 
                                            this.handleCheckboxChange( "comment", index
                                            )
                                          }
                                        />
                                        <strong>Comment</strong>
                                      </Label>
                                    </FormGroup>
                                    <FormGroup check inline>
                                      <Label check>
                                        <Input type="checkbox" name="edit" checked={user.edit}onChange={(e) =>
                                            this.handleCheckboxChange("edit",index)
                                          }
                                        />
                                        <strong>Edit</strong>
                                      </Label>
                                    </FormGroup>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-2">
                                <div className="form-group">
                                  <label>
                                    <b>Share Till :</b>
                                  </label>
                                  <Input type="date" placeholder="Select End-Date for sharing" value={user.sharedtilldate}onChange={(e) =>
                                      this.handleDateChange("sharedtilldate", e.target.value,index)
                                    }
                                  />
                                </div>
                              </div>

                              {index > 0 && (
                                <div className="col-6 col-md-1">
                                  <div className="form-group">
                                    <label>
                                      <b>Remove</b>
                                    </label>
                                    <button className="btn btn-danger btn-icon btn-circle btn-sm" onClick={() => this.removeUser(index)} >
                                      <i className="fa fa-trash"></i>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </fieldset>
                      </div>
                      <div className="form-group text-left">
                        <button type="button" class="btn btn-primary btn-sm" onClick={this.handleSubmit} >
                          Send invitation
                        </button>
                      </div>
                      <div className="p-3">
                        {/* <!-- begin #accordion --> */}
                        <div id="accordion" className="accordion ">
                          {/* <!-- begin card --> */}
                          <div className="card pointer-cursor my-1">
                            <div className="card-header bg-dark text-white pointer-cursor collapsed" data-toggle="collapse" data-target="#acl">
                              Access Control List
                            </div>
                            <div id="acl" className="collapse" data-parent="#accordion" >
                              <div className="card-body">
                                {/* <!-- begin panel-body --> */}
                                {this.state.data?.sharedUsers?.map(
                                  (user, index) => (
                                    <div className="row">
                                      <div className="col-12 col-md-3">
                                        <div className="form-group">
                                          <label>
                                            <b>Email :</b>
                                          </label>
                                          <Select options={this.selectUsers} 
                                            placeholder={"Select user"}
                                            value={
                                              user.email && {
                                                value: user.email,
                                                label: user.email,
                                              }
                                            }
                                            onChange={(e) =>
                                              this.handleChange( "userid",e.value, index
                                              )
                                            }
                                          />
                                        </div>
                                      </div>

                                      <div className="col-12 col-md-2">
                                        <div className="form-group">
                                          <label>
                                            <b>User Name :</b>
                                          </label>
                                          <input disabled type="text"  className="form-control" name="username" value={user.username} />
                                        </div>
                                      </div>
                                      <div className="col-12 col-md-4">
                                        <div className="form-group">
                                          <label>
                                            <b>Rights &amp; permission</b>
                                          </label>
                                          <div>
                                            <FormGroup check inline>
                                              <Label check>
                                                <Input type="checkbox" name="view" checked={user.view} onChange={(e) => 
                                                    this.handleCheckboxChange( "view", index )
                                                  }
                                                />
                                                <strong>View</strong>
                                              </Label>
                                            </FormGroup>
                                            <FormGroup check inline>
                                              <Label check>
                                                <Input type="checkbox" name="comment" checked={user.comment} 
                                                  onChange={(e) =>
                                                    this.handleCheckboxChange("comment",index)
                                                  }
                                                />
                                                <strong>Comment</strong>
                                              </Label>
                                            </FormGroup>
                                            <FormGroup check inline>
                                              <Label check>
                                                <Input type="checkbox" name="edit" checked={user.edit} onChange={(e) =>
                                                    this.handleCheckboxChange( "edit", index
                                                    )
                                                  }
                                                />
                                                <strong>Edit</strong>
                                              </Label>
                                            </FormGroup>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-12 col-md-2">
                                        <div className="form-group">
                                          <label>
                                            <b>Share Till :</b>
                                          </label>
                                          <Input type="date" placeholder="Select End-Date for sharing" value={user.sharedtilldate}
                                            onChange={(e) =>
                                              this.handleDateChange("sharedtilldate", e.target.value, index
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="col-6 col-md-1">
                                        <div className="form-group">
                                          <label>
                                            <b>Remove</b>
                                          </label>
                                          <button className="btn btn-danger btn-icon btn-circle btn-sm" onClick={() => 
                                              this.removeUser(index)
                                            }
                                          >
                                            <i className="fa fa-trash"></i>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                                {/* <!-- end panel-body --> */}
                              </div>
                            </div>
                          </div>
                          {/*  end card 
											< begin card  */}
                          <div className="card accordian" id="accordionforpublicity" >
                            <div className="card-header pointer-cursor bg-dark text-white pointer-cursor collapsed" data-toggle="collapse" data-target="#publicity">
                              Publicity
                            </div>
                            <div id="publicity" className="collapse p-20" data-parent="#accordionforpublicity" >
                              <div className="col-md-9">
                                <div className="radio radio-css ">
                                  <input type="radio" name="radio_css" id="cssRadio1" value="" />
                                  <label for="cssRadio1">
                                    Only users listed in Access Control List have access.
                                  </label>
                                </div>
                                <div className="radio radio-css is-valid">
                                  <input type="radio" name="radio_css" id="cssRadio2" value="" />
                                  <label for="cssRadio2">
                                    Publish over the world.
                                  </label>
                                </div>
                                <div className="radio radio-css is-invalid">
                                  <input type="radio" name="radio_css" id="cssRadio3" value="" />
                                  <label for="cssRadio3">
                                    Access by having link for everyone.
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <!-- end card -->
                            
											<!-- begin card --> */}
                          <div className="card accordian my-1" id="accordionforsetting">
                            <div className="card-header pointer-cursor bg-dark text-white pointer-cursor collapsed" data-toggle="collapse" data-target="#settings"> 
                              Settings
                            </div>
                            <div id="settings" className="collapse p-10" data-parent="#accordionforsetting" >
                              <Form row>
                                <FormGroup check inline>
                                  <Label className=" checkbox-css" check>
                                    <Input type="checkbox" invalid />
                                    <strong>
                                      Allow viewers to download, save, copy
                                    </strong>
                                  </Label>
                                </FormGroup>
                                <FormGroup className=" checkbox-css" check inline >
                                  <Label check>
                                    <Input type="checkbox" valid />{" "}
                                    <strong>checkbox level 2</strong>
                                  </Label>
                                </FormGroup>
                              </Form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  </ReusableTab>
                  <ReusableTab id={6}>
                    <>
                      <h4>Notes</h4>
                      <p>
                        task nr 10 making use of file email/inbox to for
                        implementation notes in tab “Notes” . the files you have
                        to use and work on are located in src/page/task When
                        clicking on the subject, the “details of note” will be
                        unfold. Use class accordion. For post a note make use of
                        notecompose. c. build in button to close the detail and
                        redirect back to noteinbox
                      </p>
                    </>
                  </ReusableTab>
                  <ReusableTab id={7}>
                    <Fishbone />
                  </ReusableTab>
                  <ReusableTab id={8}>
                    <>
                      <h4>Pie-chart of tasks</h4>
                      <p>
                        pie-chart with tasks on it
                        https://stackoverflow.com/questions/10028182/how-to-make-a-pie-chart-in-css/51679606
                        https://keithclark.co.uk/articles/single-element-pure-css-pie-charts/
                        https://www.smashingmagazine.com/2015/07/designing-simple-pie-charts-with-css/
                        https://codeburst.io/how-to-pure-css-pie-charts-w-css-variables-38287aea161e
                        https://css-tricks.com/simple-interactive-pie-chart-with-css-variables-and-houdini-magic/
                        !
                        http://mrbool.com/how-to-create-pie-charts-with-css3/29014
                        Creating a pie-chart with 9 equal sections. Each section
                        is a category of tasks. Each sections has its own
                        color Display a task on the pie-chart. Place it in the
                        right section. Create a pie-chart for tasks. Retrieve
                        data from table tasks and display them on the
                        pie-chart. The tasks will be divided into 8
                        categories: (bug-error (0 to 45 degree), complaint (45
                        to 90 degree), disconnection (90 to 135 degree),
                        invoices (135 to 180 degree), feature-request (180 to
                        225 degree), orders (225 to 270 degree, support (270 to
                        315 degree ), other (315 to 360 degree)) See next pic
                        create a card like next pic display in the pie-chart:
                        task-nr, username of the creator and username of the
                        one who is assigned to as a kind of “sticky note” in the
                        pie-chart , sort by category. If there are more cards
                        from the same category, display them cascades on that
                        piece of pie
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

export default Taskprofile;