import map from "lodash/map";
import Moment from "moment";
import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, withRouter } from "react-router-dom";

const Filter = ({ statusOptions, priorityOptions, categoryOptions, onfilter, kanban, history, ...props }) => {
	statusOptions = [{ value: "", label: "Select" }, { value: "showall", label: "Show All" }, ...statusOptions];
	priorityOptions = [{ value: "", label: "Select" }, { value: "showall", label: "Show All" }, ...priorityOptions];
	categoryOptions = [{ value: "", label: "Select" }, { value: "showall", label: "Show All" }, ...categoryOptions];

	const [kanbanData, setKanbanData] = useState();

	useEffect(() => {
		setKanbanData(kanban);
	});

	const [dateRange, setDateRange] = useState({
		currentWeek: Moment().subtract("days", 7).format("D MMMM YYYY") + " - " + Moment().format("D MMMM YYYY"),
		prevWeek:
			Moment().subtract("days", 15).format("D MMMM") + " - " + Moment().subtract("days", 8).format("D MMMM YYYY"),
	});

	const handleDateApplyEvent = (event, picker) => {
		var startDate = picker.startDate;
		var endDate = picker.endDate;
		var gap = endDate.diff(startDate, "days");

		var currentWeek = startDate.format("D MMMM YYYY") + " - " + endDate.format("D MMMM YYYY");
		var prevWeek =
			Moment(startDate).subtract("days", gap).format("D MMMM") +
			" - " +
			Moment(startDate).subtract("days", 1).format("D MMMM YYYY");

		dateRange.currentWeek = currentWeek;
		dateRange.prevWeek = prevWeek;

		this.setState((dateRange) => ({
			currentWeek: currentWeek,
			prevWeek: prevWeek,
		}));
	};

	const renderDatePresets = () => {
		const { presets, styles } = this.props;
		const { startDate, endDate } = this.state;

		return (
			<div>
				<button type="button">Next</button>
				<button type="button">back</button>
				<button type="button">next week</button>
				<button type="button">comming week</button>
			</div>
		);
	};

	return (
		<div className="filters">
			{/* {console.log("kanban in filters: ", kanbanData)} */}
			<div className="d-flex  dropdown flex-wrap">
				<Link
					to={{
						pathname: "/kanban/listkanbans/new",
						state: {
							kan: kanbanData ? kanbanData.data?._id : "",
							prevPage: "scrumboard",
						},
					}}
				>
					<button className="btn btn-light addList mb-1">Add List</button>
				</Link>
				<select className="custom-select filterbtn mb-1 " onChange={(e) => onfilter("status", e.target.value)}>
					{map(statusOptions, (item) => (
						<option value={item.value}>{item.label}</option>
					))}
				</select>
				<select
					className="custom-select btn-danger filterbtn mb-1 "
					onChange={(e) => onfilter("priority", e.target.value)}
				>
					{map(priorityOptions, (item) => (
						<option value={item.value}>{item.label}</option>
					))}
				</select>
				<select
					className="custom-select btn-danger filterbtn mb-1 "
					onChange={(e) => onfilter("category", e.target.value)}
				>
					{map(categoryOptions, (item) => (
						<option value={item.value}>{item.label}</option>
					))}
				</select>

				<button className="btn btn-light mr-2 text-truncate" onClick={props.onChangeDateRange}>
					<i className="fa fa-calendar fa-fw  ml-n1"></i>
					<span>{dateRange.currentWeek} </span>
					<b className="caret"></b>
				</button>

				{/* <DateRangePicker
          renderCalendarInfo={renderDatePresets}
          startDate={startDate}
          endDate={endDate}
          onApply={handleDateApplyEvent}
        >
          
         
        </DateRangePicker> */}
			</div>
			<div className="d-flex search mb-1">
				<input className=" mr-sm-2 fitersearch" type="search" placeholder="Search" aria-label="Search" />
				<button className="btn btn-outline-success searchbtn my-2 my-sm-0" type="submit">
					<i className="fa fa-search"></i>
				</button>
			</div>
		</div>
	);
};

export default withRouter(Filter);