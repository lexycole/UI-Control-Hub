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
				value === "open"
					? "#2ECC71"
					: value === "onhold"
					? "black"
					: value === "closed"
					? "gray"
					: value === "reopen"
					? "#BFFF00"
					: "#2b9fc1",
		}),
		singleValue: (styles) => ({
			...styles,
			color:
				value === "open"
					? "white"
					: value === "onhold"
					? "white"
					: value === "closed"
					? "black"
					: value === "reopen"
					? "black"
					: "white",
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

// control: (styles) => ({
// 			...styles,
// 			minHeight: "31px",
// 			height: "31px",
// 			width: "100%",
// 			backgroundColor:
// 				value === "in progress"
// 					? "#2ECC71"
// 					: value === "pending"
// 					? "black"
// 					: value === "new"
// 					? "gray"
// 					: value === "archive"
// 					? "#BFFF00"
// 					: "#2b9fc1",
// 		}),
// 		singleValue: (styles) => ({
// 			...styles,
// 			color:
// 				value === "in progress"
// 					? "white"
// 					: value === "pending"
// 					? "white"
// 					: value === "new"
// 					? "black"
// 					: value === "archive"
// 					? "black"
// 					: "white",
// 		}),
