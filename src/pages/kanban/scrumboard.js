import "bootstrap";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import size from "lodash/size";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DateRange from "../../components/kanban/DateRangePicker";
import { Panel, PanelBody, PanelHeader } from "../../components/panel/panel";
import Actions from "./../../../src/components/kanban/Action";
import Task from "./../../../src/components/kanban/Task";
import Filter from "./../../../src/components/kanban/Filters";
import "./../../../src/components/kanban/style.css";
import { getListKanbans } from "../../services/listkanbans.js";
import { saveTask, getTasks } from "../../services/tasks.js";
import { getKanban } from "../../services/kanbans.js";
import { apiUrl } from "./../../config/config.json";
import http from "./../../services/httpService";

function KanbanBoard(props) {
  const [datePickerClass, setPickerClass] = useState("d-none");
  const [listkanbans, setListkanbans] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [kanban, setKanban] = useState([]);
  const [columns, setColumns] = useState();
  const [filterColumn, setFilterColumns] = useState([]);
  const [prevFilter, setprevFilter] = useState({ title: "", value: "" });
  const [listIdWithTasks, setlistIdWithTasks] = useState([]);
  const url = window.location.href;
  const kanbanId = (url.substring(url.lastIndexOf("/") + 1)).replaceAll("#", '');

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    let sourceItems;
    let destItems;
    let sourceIndex, destIndex, clonnedArray;
    if (source.droppableId !== destination.droppableId) {
      listIdWithTasks.map((lkWithTasks, i) => {
        if (source.droppableId == lkWithTasks.listkanban) {
          sourceItems = [...lkWithTasks.tasks];
          sourceIndex = i;
        }
        if (destination.droppableId == lkWithTasks.listkanban) {
          destItems = [...lkWithTasks.tasks];
          destIndex = i;
        }
      });
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      clonnedArray = [...listIdWithTasks];
      clonnedArray[sourceIndex].tasks = sourceItems;
      clonnedArray[destIndex].tasks = destItems;
      setlistIdWithTasks(clonnedArray)

      let data;
      filterColumn.map((task) => {

        if (result.draggableId == task?._id) {
          data = {
            _id: task._id,
            userID: task.userID?._id,
            listKanbanNo: destination.droppableId,
            kanbanNo: task.kanbanNo,
            taskNo: task.taskNo,
            taskname: task.name,
            narrative: task.narrative,
            category: task.category,
            priority: task.priority,
            deadline: task.deadline,
            participants: task.participants?.map(part => part?._id),
            documentNo: "",
            field: task.field,
            tags: task.tags,
            reference: task.reference,
            sharingLink: task.share.link,
            sharedTo: task.share.sharedTo,
            sharedTill: task.share.sharedTill,
            note: task.note,
            createdOn: task.createdOn,
            status: task.status,
          };
          saveTask(data);
        }
      })
    } else {
      if (!filterColumn) return;
      listIdWithTasks.map((lkWithTasks, i) => {
        if (source.droppableId == lkWithTasks.listkanban) {
          sourceItems = [...lkWithTasks.tasks];
          sourceIndex = i;
        }
      });
      const [removed] = sourceItems.splice(source.index, 1);
      sourceItems.splice(destination.index, 0, removed);
      clonnedArray = [...listIdWithTasks];
      clonnedArray[sourceIndex].tasks = sourceItems;
      setlistIdWithTasks(clonnedArray)
    }
  };

  const filterTaskHandler = (title, value) => {
    console.log("filter values: ", title, " ", value);
    if (title === "priority" && !isEmpty(value)) {
      if (prevFilter.title === "category" || prevFilter.title === "status") {
        if (value === "showall" || value === "priority") {
          const newColumns = filter(filterColumn, (item) => item.priority);
          setFilterColumns(newColumns);
        } else {
          const newColumns = filter(
            filterColumn,
            (item) => item.priority === value
          );
          setFilterColumns(newColumns);
        }
      } else {
        if (value === "showall" || value === "priority") {
          const newColumns = filter(columns, (item) => item.priority);
          setFilterColumns(newColumns);
        } else {
          const newColumns = filter(columns, (item) => item.priority === value);
          setFilterColumns(newColumns);
        }
      }
    } else if (title === "status" && !isEmpty(value)) {
      if (prevFilter.title === "category" || prevFilter.title === "priority") {
        if (value === "showall" || value === "status") {
          const newColumns = filter(filterColumn, (item) => item.status);
          setFilterColumns(newColumns);
        } else {
          const newColumns = filter(
            filterColumn,
            (item) => item.status === value
          );
          setFilterColumns(newColumns);
        }
      } else {
        if (value === "showall" || value === "status") {
          const newColumns = filter(columns, (item) => item.status);
          setFilterColumns(newColumns);
        } else {
          const newColumns = filter(columns, (item) => item.status === value);
          setFilterColumns(newColumns);
        }
      }
    } else if (title === "category" && !isEmpty(value)) {
      if (prevFilter.title === "status" || prevFilter.title === "priority") {
        if (value === "showall" || value === "category") {
          const newColumns = filter(filterColumn, (item) => item.category);
          setFilterColumns(newColumns);
        } else {
          const newColumns = filter(
            filterColumn,
            (item) => item.category === value
          );
          setFilterColumns(newColumns);
        }
      } else {
        if (value === "showall" || value === "category") {
          const newColumns = filter(columns, (item) => item.category);
          setFilterColumns(newColumns);
        } else {
          const newColumns = filter(columns, (item) => item.category === value);
          setFilterColumns(newColumns);
        }
      }
    }
    setprevFilter({ title, value });
  };

  const [priorityOptions, setpriorityOptions] = useState([
    { value: "urgent", label: "Urgent" },
    { value: "high", label: "High" },
    { value: "normal", label: "Normal" },
    { value: "low", label: "Low" },
  ]);

  const [statusOptions, setStatusOptions] = useState([
    { value: "in progress", label: "In Progress" },
    { value: "pending", label: "Pending" },
    { value: "new", label: "New" },
    { value: "active", label: "Active" },
    { value: "archive", label: "Archive" },
  ]);

  const [categoryOptions, setCategoryOptions] = useState([
    { value: "bug-error", label: "bug-error" },
    { value: "disconnection", label: "disconnection" },
    { value: "feature-request", label: "feature-request" },
    { value: "frontend", label: "frontend" },
    { value: "backend", label: "backend" },
    { value: "AI", label: "AI" },
    { value: "NLP", label: "NLP" },
    { value: "image-recognization", label: "image-recognization" },
    { value: "hosting", label: "hosting" },
    { value: "tablet", label: "tablet" },
    { value: "phone", label: "phone" },
    { value: "web", label: "web" },
  ]);

  const getAllListkanbans = async () => {
    const { data: listkanbans } = await getListKanbans();
    setListkanbans(listkanbans);
  };

  const getAllTasks = async () => {
    const allTasks = await getTasks();
    setTasks(allTasks?.data);
    //setColumns(allTasks?.data);
    setFilterColumns(allTasks?.data);
  };
  const getKanbanData = async () => {
    setKanban(await getKanban(kanbanId));
  };

  const LightenDarkenColor = (col, amt) => {
    var usePound = false;
    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }
    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00ff) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000ff) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  };

  const handleDelete = async (listkanban) => {
    try {
      await http.delete(apiUrl + "/listkanbans/" + listkanban?._id);
      const newListkanbans = listkanbans.filter((ListKanban) => ListKanban._id !== listkanban._id);
      setListkanbans(newListkanbans);
    } catch (ex) {
      if (ex.response && ex.response === 404) {
        alert("already deleted");
      }
    }
  };

  useEffect(() => {
    getAllTasks();
    getKanbanData();
    getAllListkanbans();
  }, [kanbanId]);

  useEffect(async () => {
    const { data: users } = await http.get(apiUrl + "/users");
    const tempArr = filterColumn?.map(task => {
      let taskPart = task?.participants?.map((part) => {
        const user = users?.filter((user) => {
          return user?._id == part
        });
        return user[0] ? user[0] : part;
      })
      taskPart = taskPart ? taskPart : [];
      task.participants = [...taskPart];
      return task
    })
    let list = [];
    listkanbans?.map((lk) => {
      list = [...list, { listkanban: lk?._id, tasks: [] }];
    });
    filterColumn?.map((task) => {
      list = list?.map((lkTasks) => {
        return task?.listKanbanNo?._id == lkTasks.listkanban ? { listkanban: lkTasks.listkanban, tasks: [...lkTasks.tasks, task] } : lkTasks
      })
    })
    setlistIdWithTasks(list)
  }, [listkanbans, filterColumn])
  return (
    <>
      <div className="m-3">
        <div className="scroll">
          <Panel className="mb-0">
            <PanelHeader>{kanban.data?.name}</PanelHeader>
            <PanelBody>
              <Filter
                kanban={kanban}
                statusOptions={statusOptions}
                priorityOptions={priorityOptions}
                categoryOptions={categoryOptions}
                onChangeDateRange={() => {
                  if (datePickerClass !== "") {
                    setPickerClass("");
                  } else {
                    setPickerClass("d-none");
                  }
                }}
                onfilter={(title, value) => {
                  filterTaskHandler(title, value);
                }}
              />
              <DateRange className={datePickerClass} />
            </PanelBody>
          </Panel>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          {listkanbans?.map((column) => {
            return (
              <div>
                {column?.kanbanNo?._id === kanbanId && (
                  <Droppable droppableId={column._id} key={column._id}>
                    {(provided, snapShot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            backgroundColor: column.color,
                            padding: 4,
                            width: 350,
                            minHeight: "100%",
                            margin: 10,
                          }}
                        >
                          <div
                            style={{
                              ...headerStyles,
                              backgroundColor: LightenDarkenColor(
                                column.color,
                                50
                              ),
                            }}
                          >
                            <h4 style={headingStyles}>{column.name}</h4>
                            <Actions
                              kanban={kanban}
                              listkanban={column}
                              handleDelete={handleDelete}
                              name={column.name}
                              actionN={column._id}
                              backgroundC={column.color}
                            />
                          </div>
                          {listIdWithTasks.map((lkIdWithTask) => {

                            return (
                              lkIdWithTask?.listkanban === column?._id && (
                                lkIdWithTask?.tasks?.map((task, index) => {
                                  return (
                                    <Draggable
                                      key={task?._id}
                                      draggableId={task?._id}
                                      index={index}
                                    >
                                      {(provided, snapshot) => {
                                        return (

                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                              userSelect: "none",
                                              ...provided.draggableProps.style,
                                            }}
                                          >
                                            <Task
                                              setFilterColumns={setFilterColumns}
                                              filterColumn={filterColumn}
                                              tasks={tasks}
                                              setTasks={setTasks}
                                              statusOptions={statusOptions}
                                              priorityOptions={priorityOptions}
                                              categoryOptions={categoryOptions}
                                              content={task}
                                            //handleTaskDelete={handleTaskDelete}
                                            />

                                          </div>
                                        )
                                      }}
                                    </Draggable>)

                                })

                              ));
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                )}
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}

const pageStyles = {
  display: "flex",
  flexDirection: "row",
  overflow: "hidden",
};
const headerStyles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  color: "white",
  paddingLeft: "10px",
};
const headingStyles = {
  paddingTop: "10px",
};

export default KanbanBoard;
