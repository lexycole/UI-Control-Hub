import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Panel,
  PanelHeader,
  PanelBody,
} from "../../components/panel/panel.jsx";
// import { UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";
// import ReactTags from "react-tag-autocomplete";
// import DatePicker from "react-datepicker";
import DateTime from "react-datetime";
// import moment from "moment";
//import Select from 'react-select';
//import Select from "../../common/select";

// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";

import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "react-datetime/css/react-datetime.css";
import "react-datepicker/dist/react-datepicker.css";
import Joi from "joi";
import Select from "react-select";
import Form from "../../common/form.jsx";
import { apiUrl } from "../../config/config.json";
import http from "../../services/httpService";
import auth from "../../services/authservice";

import { saveKanban, getKanban } from "./../../services/kanbans";
import { getClinics } from "./../../services/clinics";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

class Kanban extends Form {
  constructor(props) {
    super(props);
    const user = auth.getProfile();
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
      isEditable: true,
      profiles: [],
      users: [],
      imageSrc: "",
      clinics:[],
      data: {
        userID: user._id,
        kanbanNo: this.makeKanbanNo(),
        name: "",
        participants: [],
        //businessNo: "",
        department: "",
        subDepartment: "",
        locations: "",
        description: "",
        field: "",
        tags: "",
        note: "",
        status: "active",
      },
      selectedFile: null,
      errors: {},
    };

    this.statusOptions = [
      { value: "in progress", label: "In Progress" },
      { value: "active", label: "Active" },
      { value: "pending", label: "Pending" },
      { value: "archive", label: "Archive" },
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
    this.onChangeImgHandler = this.onChangeImgHandler.bind(this);
  }

  async populateStatus() {
    this.statusoptions = this.statusOptions.map((option) => (
      <option key={option.label} value={option.value}>
        {option.value}
      </option>
    ));
  }

  async populateParticipants() {
    const { data: users } = await http.get(apiUrl + "/users");
    this.setState({ users });
    this.selectParticipants = this.state.users.map((user) => ({
      _id: user._id,
      label: user.username,
      value: user._id,
    }));
  }

  async populateKanban() {
    try {
      const kanbanId = this.props.match.params.id;

      if (kanbanId === "new") return;
      const { data: kanban } = await getKanban(kanbanId);

      kanban.userID = kanban.userID;
      kanban.kanbanNo = kanban.kanbanNo;
      kanban.name = kanban.name;
      kanban.participants = kanban?.participants?.map((part) => {
        return part?._id
  });
//      kanban.businessNo = kanban.businessNo;
      kanban.department = kanban.department;
      kanban.subDepartment = kanban.subDepartment;
      kanban.locations = kanban.locations;
      kanban.description = kanban.description;
      kanban.field = kanban.field;
      kanban.tags = kanban.tags;
      kanban.note = kanban.note;
      kanban.status = kanban.status;

      this.setState({ data: this.mapToViewModel(kanban) });

      console.log(this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/error");
    }
  }

  async componentDidMount() {
    await this.populateParticipants();
    await this.populateKanban();
    await this.populateStatus();
    //await this.populateClinics();
  }

  schema = Joi.object({
    userID: Joi.any().optional(),
    kanbanNo: Joi.any().optional(),
    name: Joi.any().optional(),
    participants: Joi.any().optional(),
//    businessNo: Joi.any().optional(),
    department: Joi.any().optional(),
    subDepartment: Joi.any().optional(),
    locations: Joi.any().optional(),
    doescription: Joi.any().optional(),
    field: Joi.any().optional(),
    tags: Joi.any().optional(),
    note: Joi.any().optional(),
    status: Joi.any().optional(),
  });

  handlecreatedOnChange = (e) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    data["createdOn"] = e;
    this.setState({ data });
    console.log(this.state.data);
  };

  handledeadlineChange = (e) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    data["deadline"] = e;
    this.setState({ data });
    console.log(this.state.data);
  };

  onChangeImgHandler = (event) => {
    this.setState({ imageSrc: event.target.files[0] });
    console.log(event.target.files[0]);
  };

  handleMultiChange = (name, options) => {
    const data = { ...this.state.data };
    console.log("value", options);
    data[name] = options.map((o) => o.value);
    console.log(
      "options",
      options.map((o) => o.value)
    );
    this.setState({ data });
  };

  doSubmit = async (kanban) => {
    try {
      console.log(this.state.data);
      await saveKanban(this.state.data);
      this.props.history.push("/kanban/kanbans");
    } catch (ex) {
      //if(ex.response && ex.response.status === 404){
      if (ex.response) {
        const errors = { ...this.state.errors };
        errors.kanbanname = ex.response.data;
        this.setState({ errors });
        //console.log(this.state.errors);
      }
    }
  };

  makeKanbanNo() {
    let kanbanNumber = "KB-";
    const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
    for (let i = 0; i <= 5; i++)
      kanbanNumber += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
    return kanbanNumber;
  }

  mapToViewModel(kanban) {
    return {
      _id: kanban._id,
      userID: kanban.userID,
      kanbanNo: kanban.kanbanNo,
      name: kanban.name,
      participants: kanban.participants,
//      businessNo: kanban.businessNo,
      department: kanban.department,
      subDepartment: kanban.subDepartment,
      locations: kanban.locations,
      description: kanban.description,
      field: kanban.field,
      tags: kanban.tags,
      note: kanban.note,
      status: kanban.status,
    };
  }

  async populateClinics() {
    const { data: clinics } = await getClinics();
    this.setState({ clinics });
    this.selectClinics = this.state.clinics.map(option => (
    <option key={option._id} value={option._id}>
      {option.companyInfo.businessName}
    </option>
    ));
    }

  render() {
    const { data, errors, imageSrc } = this.state;
    return (
      <React.Fragment>
        <div>
          <ol className="breadcrumb float-xl-right">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/kanban/kanbans">Kanbans</Link>
            </li>
            <li className="breadcrumb-item active">Add Kanban</li>
          </ol>
          <h1 className="page-header">
            Add Kanban-Solo <small>Kanban-registration-form</small>
          </h1>

          <div className="row">
            <div className="col-xl-10">
              <Panel>
                <PanelHeader>Add Kanban</PanelHeader>
                <PanelBody className="panel-form">
                  <form
                    className="form-horizontal form-bordered"
                    onSubmit={this.handleSubmit}
                  >
                    {this.renderInput(
                      "name",
                      "Name of kanban",
                      "text",
                      "Enter Name/Title/subject for kanban"
                    )}
                    {/* {this.renderInput(
                      "participants",
                      "Participants",
                      "text",
                      "Participants"
                    )} */}
                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label" htmlFor="participants" >
                        Participants
                      </label>
                      <div className="col-lg-8">
                        <Select
                          isDisabled={!this.state.isEditable}
                          isMulti
                          name="participants"
                          //styles={customStyles}
                          options={this.selectParticipants}
                          placeholder={"Select Participants..."}
                          value={this.selectParticipants?.filter((opt) =>
                            data.participants.includes(opt.value)
                          )}
                          onChange={(e) =>
                            this.handleMultiChange("participants", e)
                          }
                        />
                      </div>
                    </div>
                    
                    {/* <div className="form-group row">
										<label className="col-lg-4 col-form-label">Subscription Type</label>
										<div className="btn-group col-lg-8">
											<div className="btn btn-secondary active">
												<input type="radio" name="subscription" onChange={this.handleChange} value="Kanban"  checked={data.subscription === "Kanban" } />
												<label>Kanban</label>
											</div>
											<div className="btn btn-secondary">
												<input type="radio" name="subscription" onChange={this.handleChange} value="Solo" checked={data.subscription === "Solo" } />
												<label>SoloPractice</label>
											</div>
										</div>
										{errors.subscription && (<div className="alert alert-danger">{errors.subscription}</div>)}
									</div>  */}

                    {/* {this.renderInput("businessNo", "BusinessNo", "text", "Business Number")} */}
                    {this.renderInput(
                      "department",
                      "Department",
                      "text",
                      "Enter Department"
                    )}
                    {this.renderInput(
                      "subDepartment",
                      "Sub-Department",
                      "text",
                      "Enter Sub-department"
                    )}
{/*                    <div className="form-group row">
                      <label className="col-lg-4 col-form-label" htmlFor="clinicNo" > Select Clinic
                      </label>
                      <div className="col-lg-8">
                        <select
                          name="businessNo"
                          id="businessNo"
                          value={data.businessNo}
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
                    </div>  */}
                    {this.renderInput(
                      "locations",
                      "Locations",
                      "text",
                      "Enter Locations"
                    )}
                    {this.renderTextarea(
                      "description",
                      "Description",
                      "Enter Description"
                    )}
                    {this.renderInput("field", "field", "text", "Enter field")}
                    {this.renderInput("tags", "Tags", "text", "Enter Tags")}
                    {this.renderTextarea("note", "Note", "Enter note")}

                    <div className="form-group row">
                      <label
                        className="col-lg-4 col-form-label"
                        htmlFor="status"
                      >
                        Status
                      </label>
                      <div className="col-lg-8">
                        <select
                          name="status"
                          id="status"
                          value={data.status?data.status:"active"}
                          onChange={this.handleChange}
                          className="form-control"
                        >
                          <option value="">Select Status</option>
                          {this.statusoptions}
                        </select>
                      </div>
                      {errors.category && (
                        <div className="alert alert-danger">
                          {errors.status}
                        </div>
                      )}
                    </div>

                    <div className="form-group row">
                      <div className="col-lg-8">
                        <button
                          type="submit"
                          disabled={this.validate()}
                          className="btn btn-primary width-65"
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

export default withRouter(Kanban);
