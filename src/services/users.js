//import axios from 'axios';
import http from './httpService';
import { apiUrl } from './../config/config.json';

const apiEndpoint = apiUrl + '/users';

// export async function getUsers(){
// const response = await http.get("http://localhost:4500/api/users");
// return response;
//   }
function userUrl(id) {
	return `${apiEndpoint}/${id}`;
}

export function getUsers() {
	return http.get(apiEndpoint);
}

export function getUser(userId) {
	return http.get(userUrl(userId));
}

export function saveUser(user, imageSrc) {
	const formData = new FormData();
	//update
	if (user._id) {
		//clone user and delete _id
		const body = { ...user };
		delete body._id;
		for (let key in body) {
			formData.append(key, body[key]);
		}
		formData.append('imageSrc', imageSrc);
		return http.put(userUrl(user._id), formData);
	}
	const body = { ...user };
	for (let key in body) {
		formData.append(key, body[key]);
	}
	formData.append('imageSrc', imageSrc);
	//add a new user
	return http.post(apiEndpoint, formData);
}

//patch users
export function patchUser(user, imageSrc) {
	const formData = new FormData();
	//update
	if (user._id) {
		const body = { ...user };
		delete body._id;
		delete body.imageSrc;
		for (let key in body) {
			formData.append(key, body[key]);
		}
		formData.append('imageSrc', imageSrc);
		return http.patch(userUrl(user._id), formData);
	}
}


//delete users
export function deleteUser(userId) {
	return http.delete(userUrl(userId));
}  