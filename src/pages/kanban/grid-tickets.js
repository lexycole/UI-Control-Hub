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
import TicketCard from "./../../../src/components/kanban/Card";
import Filter from "./../../../src/components/kanban/Filters";
import "./../../../src/components/kanban/style.css";

const itemsFromBackend = [
  { id: "a", content: "First task", priority: "low", status: "closed" },
  { id: "b", content: "Second task", priority: "urgent", status: "open" },
  { id: "c", content: "Third task", priority: "normal", status: "reopen" },
  { id: "d", content: "Fourth task", priority: "urgent", status: "onhold" },
  { id: "e", content: "Fifth task", priority: "high", status: "open" },
  { id: "f", content: "Six task", priority: "urgent", status: "reopen" },
  { id: "g", content: "Seven task", priority: "normal", status: "closed" },
  { id: "h", content: "Eight task", priority: "normal", status: "onhold" },
];

const columnsFromBackend = {
  1: {
    name: "Requested",
    items: [itemsFromBackend[0], itemsFromBackend[1], itemsFromBackend[2]],
    classN: "t1 ticketsD",
    number: 0,
  },
  2: {
    name: "To do",
    items: [itemsFromBackend[3], itemsFromBackend[4]],
    classN: "t2 ticketsD",
    number: 1,
  },
  3: {
    name: "In Progress",
    items: [itemsFromBackend[5]],
    classN: "t3 ticketsD",
    number: 2,
  },
  4: {
    name: "Done",
    items: [itemsFromBackend[6], itemsFromBackend[7]],
    classN: "t4 ticketsD",
    number: 3,
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function KanBanBoard(props) {
  const [datePickerClass, setPickerClass] = useState("d-none");

  const [columns, setColumns] = useState(Object.entries(columnsFromBackend));
  const [filterColumn, setFilterColumns] = useState(columns);

  const filterTaskHandler = (title, value) => {
    if (title === "priority" && !isEmpty(value)) {
      switch (value) {
        case "urgent": {

          const filteredvalue = map(filterColumn, ([col1, col]) => {
            let { items, ...rest } = col;
            items = filter(items, ({ priority }) => priority === "urgent");
            
            return [col1, { items, ...rest }];
          });
          // setFilterColumns(filteredvalue);
          
          const removeEmptyItems = filter(
            filteredvalue,
            ([col1, col]) => size(col.items) !== 0
          );
          setFilterColumns(removeEmptyItems);

          break;
        }
        case "low": {
          const filteredvalue = map(filterColumn, ([col1, col]) => {
            let { items, ...rest } = col;
            items = filter(items, ({ priority }) => priority === "low");

            return [col1, { items, ...rest }];
          });
          const removeEmptyItems = filter(
            filteredvalue,
            ([col1, col]) => size(col.items) !== 0
          );
          setFilterColumns(removeEmptyItems);

          break;
        }
        case "normal": {
          const filteredvalue = map(filterColumn, ([col1, col]) => {
            let { items, ...rest } = col;
            items = filter(items, ({ priority }) => priority === "normal");
            return [col1, { items, ...rest }];
          });
          const removeEmptyItems = filter(
            filteredvalue,
            ([col1, col]) => size(col.items) !== 0
          );
          setFilterColumns(removeEmptyItems);
          break;
        }
        case "high": {
          const filteredvalue = map(filterColumn, ([col1, col]) => {
            let { items, ...rest } = col;
            items = filter(items, ({ priority }) => priority === "high");

            return [col1, { items, ...rest }];
          });
          const removeEmptyItems = filter(
            filteredvalue,
            ([col1, col]) => size(col.items) !== 0
          );
          setFilterColumns(removeEmptyItems);
          break;
        }
        case "select": {
          setFilterColumns(columns);
        }
        case "showall": {
          setFilterColumns(columns);
        }

        default: {
          setFilterColumns(columns);
        }
      }
      // if (value !== "showall" && value !== "select") {
      //   const filteredvalue = map(filterColumn, ([col1, col]) => {
      //     let { items, ...rest } = col;
      //     items = filter(items, ({ priority }) => priority === value);

      //     return [col1, { items, ...rest }];
      //   });

      //   setFilterColumns(filteredvalue);
      // } else {
      //   setFilterColumns(columns);
      // }
    }
else if (title === "category" && !isEmpty(value)) {
      switch (value) {
        case "open": {
          const filteredvalue = map(filterColumn, ([col1, col]) => {
            let { items, ...rest } = col;
            items = filter(items, ({ category }) => category === "open");

            return [col1, { items, ...rest }];
          });
          const removeEmptyItems = filter(
            filteredvalue,
            ([col1, col]) => size(col.items) !== 0
          );
          setFilterColumns(removeEmptyItems);
          break;
        }
        case "onhold": {
          const filteredvalue = map(filterColumn, ([col1, col]) => {
            let { items, ...rest } = col;
            items = filter(items, ({ category }) => category === "onhold");

            return [col1, { items, ...rest }];
          });
          const removeEmptyItems = filter(
            filteredvalue,
            ([col1, col]) => size(col.items) !== 0
          );
          setFilterColumns(removeEmptyItems);
          break;
        }
        case "reopen": {
          const filteredvalue = map(filterColumn, ([col1, col]) => {
            let { items, ...rest } = col;
            items = filter(items, ({ category }) => category === "reopen");
            return [col1, { items, ...rest }];
          });
          const removeEmptyItems = filter(
            filteredvalue,
            ([col1, col]) => size(col.items) !== 0
          );
          setFilterColumns(removeEmptyItems);
          break;
        }
        case "closed": {
          const filteredvalue = map(filterColumn, ([col1, col]) => {
            let { items, ...rest } = col;
            items = filter(items, ({ category }) => category === "closed");

            return [col1, { items, ...rest }];
          });
          const removeEmptyItems = filter(
            filteredvalue,
            ([col1, col]) => size(col.items) !== 0
          );
          setFilterColumns(removeEmptyItems);
          break;
        }
        case "select": {
          setFilterColumns(columns);
        }
        case "showall": {
          setFilterColumns(columns);
        }

        default: {
          setFilterColumns(columns);
        }
      }
    }
  };
  const [priorityOptions, setpriorityOptions] = useState([
    { value: "urgent", label: "Urgent" },
    { value: "high", label: "High" },
    { value: "normal", label: "Normal" },
    { value: "low", label: "Low" },
  ]);

  const [statusOptions, setStatusOptions] = useState([
    { value: "open", label: "Open" },
    { value: "onhold", label: "on-Hold" },
    { value: "closed", label: "Closed" },
    { value: "reopen", label: "Re-open" },
  ]);

  const [categoryOptions, setCategoryOptions] = useState([
    { value: "open", label: "Open" },
    { value: "onhold", label: "on-Hold" },
    { value: "closed", label: "Closed" },
    { value: "reopen", label: "Re-open" },
  ]);
  
  useEffect(() => {
    console.log("object entries ", Object.entries(columns));
  });

  return (
    <div className="m-3">
      <div className="scroll">
        <Panel className="mb-0">
          <PanelHeader>Tickets</PanelHeader>
          <PanelBody>
            {/* <h1 className="page-header m-b-10">Kanban name</h1> */}

            <Filter
              statusOptions={statusOptions}
              priorityOptions={priorityOptions}
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
        <div className="TicketCardsHo">
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {filterColumn.map(([columnId, column], index) => {
              return (
                <div className={`${column.classN}`}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <Actions name={column.name} actionN={column.number} />
                          <div className="cards">
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <TicketCard
                                          statusOptions={statusOptions}
                                          priorityOptions={priorityOptions}
                                          content={item}
                                        />
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default tickets;
