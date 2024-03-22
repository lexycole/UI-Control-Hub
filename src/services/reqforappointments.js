//import http from "../pages/reqForAppointments/http-common";
//import axios from "axios";
import http from './httpService';
import { apiUrl } from "./../config/config.json";
const apiEndpoint = apiUrl + "/reqforappointments";
const getAll = () => {
  return http.get("/reqforappointments");
};
const get = id => {
  return http.get(`/reqforappointments/${id}`);
};
const create = data => {
  return http.post("/reqforappointments", data);
};
const update = (id, data) => {
  return http.put(`/reqforappointments/${id}`, data);
};
const remove = id => {
  return http.delete(`/reqforappointments/${id}`);
};
const removeAll = () => {
  return http.delete(`/reqforappointments`);
};
const findByTitle = title => {
  return http.get(`/reqforappointments?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};






// export default new reqForAppointments();

function reqForAppointmentUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getreqForAppointments() {
  return http.get(apiEndpoint);
}

export function getreqForAppointment(Id) {
  return http.get(reqForAppointmentUrl(Id));
}

export function saveReqForAppointment(reqForAppointment) {
  //clone
  const body = { ...reqForAppointment };
  // console.log(body);
  //update
  if (reqForAppointment._id) {
    //delete _id
    delete body._id;
    return http.put(reqForAppointmentUrl(reqForAppointment._id), body);
  }

  //add a new appointment
  return http.post(apiEndpoint, reqForAppointment);
}

//delete appointments
export function deletereqForAppointment(Id) {
  return http.delete(reqForAppointmentUrl(Id));
}








// import http from "./httpService";
// import { apiUrl } from "./../config/config.json";
// const apiEndpoint = apiUrl + "/reqforappointments";

// function reqForAppointmentUrl(id) {
// 	return `${apiEndpoint}/${id}`;
// }

// export function getreqForAppointments() {
// 	return http.get(apiEndpoint);
// }

// export function getreqForAppointment(Id) {
// 	return http.get(reqForAppointmentUrl(Id));
// }

// export function savereqForAppointment(reqForAppointment) {
// 	//clone
// 	const body = { ...reqForAppointment };
// 	console.log(body);
// 	//update
// 	if (reqForAppointment._id) {
// 		//delete _id
// 		delete body._id;
// 		return http.put(reqForAppointmentUrl(reqForAppointment._id), body);
// 	}

// 	//add a new appointment
// 	return http.post(apiEndpoint, reqForAppointment);
// }

// //delete appointments
// export function deletereqForAppointment(Id) {
// 	return http.delete(reqForAppointmentUrl(Id));
// }
