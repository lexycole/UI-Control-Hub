import React, { useState } from "react";
import Select from "react-select";

export default function ReactSelect({ options, selectedValue, ...props }) {
  const [selected, setSelected] = useState(selectedValue);

  const targetHeight = 34;

  const customStyles = (value) => ({
    control: (styles) => ({
      ...styles,
      minHeight: "initial",
      color:
        value === "urgent"
          ? "white"
          : value === "high"
          ? "yellow"
          : value === "normal"
          ? "white"
          : value === "low"
          ? "white"
          : "white",
      width: "120px",
      backgroundColor:
        value === "urgent"
          ? "#ff5b57"
          : value === "high"
          ? "#f1c40f"
          : value === "normal"
          ? "#2ecc71"
          : value === "low"
          ? "#2b9fc1"
          : "white",
    }),
    option: (provided) => ({
      ...provided,
    }),
    valueContainer: (base) => ({
      ...base,
      height: `${targetHeight - 1 - 1}px`,
      padding: "0 8px",
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
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
      onChange={onChange}
      styles={customStyles(selected)}
      options={options}
      placeholder={"Select Priority"}
      value={displayItem(selected)}
      {...props}
    />
  );
}
