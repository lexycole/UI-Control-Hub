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
          value === "intake"? "#f1c40f":
          value === "follow"? "#2ecc71":,
    }),
    singleValue: (styles) => ({
      ...styles,
      color:
        value === "intake" ? "white":
        value === "follow" ? "yellow":,
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
    const item = options.find((x) => x.value === selected);
    return item ? item : { value: "", label: "" };
  };

  return (
    <Select
      maxMenuHeight={300}
      onChange={onChange}
      styles={customStyles(selected)}
      options={options}
      placeholder={"Select Priority"}
      value={displayItem(selected)}
      isDisabled={props.readOnly}
      {...props}
    />
  );
}
