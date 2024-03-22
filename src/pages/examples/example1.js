import "./styles.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import React, { Component, useState } from "react";

class WidgetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: this.props.allItems
    };
  }

  onChangeTag = (event, item) => {
    item.tag = event.target.value;
    const updatedValue = [...this.state.allItems];
    this.setState({
      allItems: updatedValue.map((data) => {
        if (data.name === item.name) {
          data = item;
        }
        return data;
      })
    });
  };

  render() {
    const { allItems } = this.state;
    const { selectedItems } = this.props;

    return (
      <List>
        {allItems.map((item) => {
          return (
            <ListItem
              key={item.name}
              role={undefined}
              dense
              button
              disableRipple
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedItems.has(item)}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={`${item.name}`} />
              <ListItemSecondaryAction>
                <Select
                  native
                  value={item.tag}
                  onChange={(e) => this.onChangeTag(e, item)}
                >
                  <option value={0}>foo</option>
                  <option value={1}>bar</option>
                  <option value={2}>baz</option>
                </Select>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    );
  }
}

let allItems = [
  { name: "1", tag: 0 },
  { name: "2", tag: 1 },
  { name: "3", tag: 2 }
];
let selectedItems = new Set([allItems[0], allItems[1]]);

export default function App() {
  // const [selectedItems,setSelectedItem] = useState(selectedItems);
  return (
    <div className="App">
      <WidgetList allItems={allItems} selectedItems={selectedItems} />
    </div>
  );
}
