import http from "./httpService";
import { apiUrl } from "./../config/config.json";
const apiEndpoint = apiUrl + "/vehicles";

export function vehicleUrl(id) {
	return `${apiEndpoint}/${id}`;
}

export function getVehicles() {
	return http.get(apiEndpoint);
}

export function getVehicle(Id) {
	return http.get(vehicleUrl(Id));
}

export function saveVehicle(vehicle) {
	//clone
	const body = { ...vehicle };
	console.log(body);
	//update
	if (vehicle._id) {
		//delete _id
		delete body._id;
		return http.put(vehicleUrl(vehicle._id), body);
	}

	//add a new vehicle
	return http.post(apiEndpoint, vehicle);
}

//delete vehicles
export function deleteVehicle(Id) {
	return http.delete(vehicleUrl(Id));
}
