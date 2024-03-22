import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
// Icon
//import trashIcon from "../../assets/Icons/trash.svg";
import { Image } from "react-bootstrap";
import { getProductImage } from "../../services/products";
import { apiUrl } from "../../config/config.json";

class TableBody extends Component {
	getCategoryBackground = (value) =>
		value === "feature-request"
			? "#ff5b57"
			: value === "disconnection"
			? "#f1c40f"
			: value === "bug-error"
			? "#2ecc71"
			: value === "sales"
			? "#2b9fc1"
			: value === "complaint"
			? "#f1c40f"
			: value === "orders"
			? "#2ecc71"
			: "white";

	getPriorityBackground = (value) =>
		value === "urgent"
			? "#ff5b57"
			: value === "high"
			? "#f1c40f"
			: value === "normal"
			? "#2ecc71"
			: value === "low"
			? "#2b9fc1"
			: "white";

	getStatusBackground = (value) =>
		value === "open"
			? "#2ECC71"
			: value === "onhold"
			? "black"
			: value === "closed"
			? "gray"
			: value === "reopen"
			? "#BFFF00"
			: "#2b9fc1";

	renderCell(item, column) {
		if (column.path === "expiredDate") return moment(item.expiredDate).format("L");
		if (column.path === "createdOn") return moment(item.createdOn).format("L, h:mm");

		if (column.content) return column.content(item);
		return _.get(item, column.path, "-");
	}

	// deleteThis = (item, column, onDelete) => {
	//   return (
	//     <div className="d-flex justify-content-center">
	//       <Image onClick={() => onDelete(item._id)} style={delete_icon} src={trashIcon} rounded />
	//     </div>
	//   )
	// }

	// Function for image
	productImage = (item, column) => {
		// console.log("61 ", `${apiUrl}/${item?.productImage[0]?.filePath}`);

		return (
			<div className="">
				<Image style={productImage} src={`${apiUrl}/${item?.productImage[0]?.filePath}`} alt="product image" />
			</div>
		);
	};

	renderCustomCell = (item, column) => {
		return (
			<div
				style={{
					backgroundColor: `${
						column.path === "category"
							? this.getCategoryBackground(_.get(item, column.path, "category"))
							: column.path === "priority"
							? this.getPriorityBackground(_.get(item, column.path, "priority"))
							: this.getStatusBackground()
					}`,
					padding: "6px 12px",
					whiteSpace: "nowrap",
					color: "black",
					fontWeight: "500",
					borderRadius: "5px",
				}}
			>
				{column.content ? column.content(item) : _.get(item, column.path, "status")}
			</div>
		);
	};

	//key for td
	createKey(item, column) {
		return item._id + (column.path || column.key);
	}

	render() {
		const { data, columns, selectedCategory, selectedSubCategory } = this.props;
		// console.log(data);
		return (
			<tbody>
				{data
					.filter((item) => (selectedCategory ? item.category === selectedCategory : true))
					.filter((item) => (selectedSubCategory ? item.subCategory === selectedSubCategory : true))
					.map((item) => (
						<tr key={item._id}>
							{columns.map((column) => (
								<td key={this.createKey(item, column)}>
									{column.path === "category" || column.path === "priority" || column.path === "status"
										? this?.renderCustomCell(item, column)
										: column?.path === "image"
										? this.productImage(item, column) // for image
										: // : column.path === "delete"
										  // ? this.deleteThis(item, column, onDelete)
										  this?.renderCell(item, column)}
								</td>
							))}
						</tr>
					))}
			</tbody>
		);
	}
}

const delete_icon = {
	maxHeight: "25px",
	cursor: "pointer",
};

const productImage = {
	maxHeight: "50px",
	maxWidth: "50px",
	cursor: "pointer",
};

export default TableBody;
