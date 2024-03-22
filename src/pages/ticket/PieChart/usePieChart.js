import React, { useState, useEffect, useReducer } from "react";
import { apiUrl } from "../../../config/config.json";
import http from "../../../services/httpService";

const endpoint = apiUrl + "/tickets/";

function usePieChart() {
  // ============================================ //
  // constant data
  const categoryInfo = {
    "bug-error": { color: "#ff00d3", name: "Bug Error" },
    complaint: { color: "#b854ea", name: "Complaint" },
    disconnection: { color: "#6055eb", name: "Disconnection" },
    invoices: { color: "#00c5f0", name: "Invoices" },
    "feature-request": { color: "#00f2d3", name: "Feature Requests" },
    sales: { color: "#00f179", name: "Sales" },
    support: { color: "#90f05c", name: "Support" },
    other: { color: "#facb52", name: "Other" },
  };

  // ============================================ //
  // State and reducer
  const initialState = {
    tickets: {},
    padding: {
      top: "70px",
      bottom: "70px",
    },
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "SORT_DATA":
        let categoryWiseData = {};
        // Separating by category
        for (let item of action.payload) {
          categoryWiseData[item.category] = categoryWiseData[item.category]
            ? [...categoryWiseData[item.category], item]
            : [item];
        }
        const pTop =
          (categoryWiseData["bug-error"]?.length >
          categoryWiseData["other"]?.length
            ? calcP(categoryWiseData["bug-error"])
            : calcP(categoryWiseData["other"])) + "px";
        const pBottom =
          (categoryWiseData["invoices"]?.length >
          categoryWiseData["feature-request"]?.length
            ? calcP(categoryWiseData["invoices"])
            : calcP(categoryWiseData["feature-request"])) + "px";
        console.log(
          "🚀 ~ file: usePieChart.js:34 ~ reducer ~ categoryWiseData",
          categoryWiseData
        );
        // Sorting by priority
        const priorityOrder = ["urgent", "high", "normal", "low"];
        for (let category in categoryWiseData) {
          let sortedArr = [];
          for (let priority of priorityOrder) {
            let separateByPriority = [];
            for (let ticket of categoryWiseData[category]) {
              if (ticket.priority === priority) {
                separateByPriority.push(ticket);
              }
            }
            sortedArr = [...sortedArr, ...separateByPriority];
          }
          categoryWiseData[category] = sortedArr;
        }
        return {
          tickets: categoryWiseData,
          padding: { top: pTop, bottom: pBottom },
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  // ============================================ //
  // Helper Functions
  useEffect(() => {
    const unsub = async () => {
      try {
        const res = await http.get(endpoint);
        dispatch({ type: "SORT_DATA", payload: res.data });
      } catch (error) {
        console.log(error);
      }
    };
    unsub();
    return unsub;
  }, []);

  // const calcPadding = (data) => {
  //   let checkEntries = {
  //     top: ["bug-error", "other"],
  //     bottom: ["feature-request", "invoices"],
  //   };
  //   let result = { top: "0px", bottom: "0px" };

  //   for (let [key, value] in Object.entries(checkEntries)) {
  //     console.log("length of ", value[0], " is ", value[0].length);
  //     console.log("padding is ", calc(data[value[0]]));
  //     console.log("length of ", value[1], " is ", value[1].length);
  //     console.log("padding is ", calc(data[value[1]]));
  //     let p =
  //       data[value[0]].length > data[value[1]].length
  //         ? calc(data[value[0]])
  //         : calc(data[value[1]]);
  //     result[key] = p + "px";
  //   }

  //   return result;
  // };
  function calcP(arr) {
    return (arr.length > 2 ? arr.length - 2 : 0) * 150 + 70;
  }

  return { tickets: state.tickets, padding: state.padding, categoryInfo };
}

export default usePieChart;
