import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Panel,
  PanelHeader,
  PanelBody,
} from "./../../components/panel/panel.jsx";
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { getKanbans } from "./../../services/kanbans";
import { getTasks } from "./../../services/tasks";
import "bootstrap/dist/css/bootstrap.min.css";
//import FloatSubMenu from './../../components/float-sub-menu/float-sub-menu';
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import TaskTable from "../../components/tasksTable.jsx";
import SearchBox from "./../../common/searchBox";
import _ from "lodash";
import http from "./../../services/httpService";
import { apiUrl } from "./../../config/config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  Label,
  ModalHeader,
  ModalBody,
  Row,
} from "reactstrap";

// Icons imports
import newIcon from "../../assets/Icons/new.svg";
import eyeIcon from "../../assets/Icons/eye.svg";
import editIcon from "../../assets/Icons/edit.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";
import sharingIcon from "../../assets/Icons/sharing.svg";
import Icon from "./../../common/icon";

class TasksTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      pageSize: 10,
      currentPage: 1,
      checkedTasks: [],
      sortColumn: { path: "title", order: "asc" },
      searchQuery: "",
      errors: {},
    };
  }

  async componentDidMount() {
    const {data:tasks} = await getTasks();
    this.setState({ tasks });
  }
  handleDelete = (user) => {
    console.log(user);
    const tasks = this.state.tasks.filter((el) => el._id !== user._id);
    this.setState({ tasks: tasks });
  };
  //sorting columns
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handlePageChange = (page) => {
    console.log(page);
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    console.log(query);
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleCheckboxChange = ({ target: { checked, value } }) => {
    if (checked) {
      this.setState(({ checkedTasks }) => ({
        checkedTasks: [...checkedTasks, value],
      }));
    } else {
      this.setState(({ checkedTasks }) => ({
        checkedTasks: checkedTasks.filter((e) => e !== value),
      }));
    }
    console.log("checked tasks: ", this.state.checkedTasks);
  };

  handleMassDelete = (CheckedTasks) => {
    const originalTasks = this.state.tasks;
    CheckedTasks.map(async (task) => {
      try {
        await http.delete(apiUrl + "/tasks/" + task);
        const tasks = this.state.tasks.filter((Task) => Task._id !== task);
        this.setState({ tasks });
      } catch (ex) {
        if (ex.response && ex.response === 404) {
          alert("already deleted");
        }

        this.setState({ tasks: originalTasks });
      }
      console.log("Tasks: ", this.state.tasks);
    });
  };

  getDataPgnation = () => {
    const {
      pageSize,
      currentPage,
      tasks: Tasks,
      sortColumn,
      searchQuery,
    } = this.state;
    //
    //filter maybe next time
    let filtered = Tasks;
    if (searchQuery) {
      console.log(searchQuery);
      filtered = Tasks.filter(
        (el) =>
          el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          el.username.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    //
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const tasks = paginate(sorted, currentPage, pageSize);
    return { data: tasks };
  };

  render() {
    const { length: count } = this.state.tasks;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    // if(count === 0)  return "<p>No data available</p>";

    const { data: tasks } = this.getDataPgnation();
    
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/kanban/tasks">tasks</Link>
          </li>
          <li className="breadcrumb-item active">Listkanbans</li>
        </ol>
        <h1 className="page-header">Tasks </h1>
        <Panel>
          <PanelHeader>Tasks Management</PanelHeader>

          <React.Fragment>
            <ToastContainer />
            <div className="toolbar" style={toolbarStyles}>
              <Icon
                to="/kanban/tasks/new"
                title="Add Task"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={newIcon}
              />
              <Icon
                to={this.state.checkedTasks?.length?`/kanban/task/taskprofile/${this.state.checkedTasks[0]}`:"/kanban/tasks"}
                title="View Profile of Task"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={eyeIcon}
              />
              <Icon
                to={
                  this.state.checkedTasks?.length
                    ? `/kanban/tasks/${this.state.checkedTasks[0]}`
                    : "/kanban/tasks/"
                }
                title="Edit Task"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={editIcon}
              />
              <Icon
                to="/kanban/tasks/"
                handleClick={() =>
                  this.handleMassDelete(this.state.checkedTasks)
                }
                title="Delete task"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={trashIcon}
              />
              <Icon
                to="/kanban/tasks/"
                title="Xlsx task"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={xlsIcon}
              />
              <Icon
                to="/kanban/tasks/"
                title="CSV task"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={csvIcon}
              />

              <Icon
                to="/kanban/tasks/"
                title="pdf task"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={pdfIcon}
              />

              <Icon
                to="/kanban/tasks/"
                title="share task"
                btnStyle={btnStyles}
                iconStyle={iconStyles}
                icon={sharingIcon}
              />
            </div>
            <div className="table-responsive">
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              <p
                className="page-header float-xl-left"
                style={
                  ({ marginBottom: 5 }, { marginLeft: 20 }, { marginTop: 5 })
                }
              >
                {count} entries
              </p>

              <TaskTable
                tasks={tasks}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                sortColumn={sortColumn}
                handleCheckboxChange={this.handleCheckboxChange}
              />
            </div>
          </React.Fragment>

          <hr className="m-0" />
          <PanelBody>
            <div className="d-flex align-items-center justify-content-center">
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
                // handleCheckboxChange={this.handleCheckboxChange}
              />
            </div>
          </PanelBody>
        </Panel>
      </div>
    );
  }
}
const toolbarStyles = {
  background: "#c8e9f3",
  padding: "10px",
};

const btnStyles = { background: "#348fe2", margin: "0rem" };

const iconStyles = {
  width: "25px",
  height: "25px",
  marginRight: "0rem",
};

export default TasksTable;
