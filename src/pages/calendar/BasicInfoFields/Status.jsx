import React, { useState } from "react";
import Select from "react-select";

export default function ReactSelect({ options, selectedValue, ...props }) {
  const [selected, setSelected] = useState(selectedValue);

  const customStyles = (value) => ({
    control: (styles) => ({
      ...styles,
      minHeight: "31px",
      height: "31px",
      width: "100%",
      backgroundColor:
        value === "active"? "#2ECC71":
        value === "pending"? "pink":
        value === "archived"? "gray":
        value === "invoiced"? "#BFFF00":
        value === "canceled<24h"? "red":
        value === "in-treatment"? "green":
		
        "#2b9fc1",
    }),
    singleValue: (styles) => ({
      ...styles,
      color:
        value === "active"? "white":
        value === "pending"? "white":
        value === "archived"? "black":
		value === "invoiced"? "black":
        value === "canceled<24h"? "black":
		value === "in-treatment"? "black":
		
         "white",
    }),
    option: (provided) => ({
      ...provided,
      color: "black",
      // color: 'white',
      padding: "20px",
      minHeight: "25px",
      height: "25px",
    }),
  });

  const onChange = (e) => {
    setSelected(e.value);
  };

  const displayItem = (selected) => {
    const item = options?.find((x) => x.value === selected);
    return item ? item : { value: "", label: "" };
  };

  return (
    <Select
      classNamePrefix="select"
      maxMenuHeight={300}
      onChange={onChange}
      styles={customStyles(selected)}
      options={options}
      placeholder={"Select Status"}
      value={displayItem(selected)}
      isDisabled={props.readOnly}
      {...props}
    />
  );
}
