import http from "./httpService";
import { apiUrl } from "./../config/config.json";
const apiEndpoint = apiUrl + "/listkanbans";

export function listKanbanUrl(id) {
	return `${apiEndpoint}/${id}`;
}

export function getListKanbans() {
	return http.get(apiEndpoint);
}

export function getListKanban(Id) {
	return http.get(listKanbanUrl(Id));
}
//get listkanban by kanban id
export function getListKanbanId(Id) {
	return http.get(`${apiEndpoint}/kanban/${Id}`);
}


export function saveListKanban(listKanban) {
	//clone
	const body = { ...listKanban };
	console.log(body);
	//update
	if (listKanban._id) {
		//delete _id
		delete body._id;
		return http.put(listKanbanUrl(listKanban._id), body);
	}

	//add a new listkanban
	return http.post(apiEndpoint, listKanban);
}

//delete listkanbans
export function deleteListKanban(Id) {
	return http.delete(listKanbanUrl(Id));
}
