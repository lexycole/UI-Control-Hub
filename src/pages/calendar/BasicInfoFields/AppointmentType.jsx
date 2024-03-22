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
		value === "clinic"? "#8411E9":
        value === "videocall"? "#1F11E9":
        value === "home"? "#11A8E9":
        "BFFF00",
    }),
    singleValue: (styles) => ({
      ...styles,
      color:
		value === "clinic"? "white":
        value === "videocall"? "white":
        value === "home"? "white":
        "white",
    }),
    option: (provided) => ({
      ...provided,
      padding: "20px",
      minHeight: "25px",
      height: "25px",
    }),
  });

  const onChange = (e) => {
    setSelected(e.value);
  };

  const displayItem = (selected) => {
    //const item = options?.find((x) => x.value === selected);
    const item = options.find((x) => x.value === selected);
    return item ? item : { value: "", label: "" };
  };

  return (
    <Select
      maxMenuHeight={300}
      onChange={onChange}
      styles={customStyles(selected)}
      options={options}
      placeholder={"Select Category"}
      value={displayItem(selected)}
      isDisabled={props.readOnly}
      {...props}
    />
  );
}
