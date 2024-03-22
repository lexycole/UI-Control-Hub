import { apiUrl } from "./../config/config.json";
import http from "./httpService";
const apiEndpoint = apiUrl + "/items";

function itemUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getItems() {
  return http.get(apiEndpoint);
}

export function getItem(Id) {
  return http.get(itemUrl(Id));
}

/* export function saveItem(item) {
	//clone
	const body = { ...item };
	console.log("item body", body);
	//update
	if (item._id) {
		//delete _id
		delete body._id;
		return http.put(itemUrl(item._id), body);
	}

	//add a new item
	return http.post(apiEndpoint, item);
} */

export function sharingItem(data) {
  const formData = new FormData();
  const body = { ...data };
  delete body._id;
  // const options = ["sharedTill", "sharedTo", "permissions"];
  // for (let key in body) {
  //   if (options.includes(key)) formData.append(key, JSON.stringify(body[key]));
  //   else formData.append(key, body[key]);
  // }
  // console.log(formData);
  console.log(body);
  return http.patch(itemUrl(data._id), body);
}

export function saveItem(item, attachments) {
  const formData = new FormData();
  const options = [
    "participants",
    "sharedTill",
    "sharedTo",
    "permissions",
    "deadline",
  ];
  //update
  if (item._id) {
    //clone item and delete _id
    const body = { ...item };
    delete body._id;
    for (let key in body) {
      if (options.includes(key))
        formData.append(key, JSON.stringify(body[key]));
      else formData.append(key, body[key]);
    }
    //formData.append('attachments', attachments);
    if (attachments) {
      for (let x = 0; x < attachments.length; x++) {
        formData.append("attachments", attachments[x]);
      }
    } else {
      formData.append("attachments", attachments);
    }
    console.log(attachments);
    return http.put(itemUrl(item._id), formData);
  }
  const body = { ...item };
  for (let key in body) {
    //if(key === 'participants' || 'sharedTill' || 'sharedTo') formData.append(key, JSON.stringify(body[key]));
    if (options.includes(key)) formData.append(key, JSON.stringify(body[key]));
    else formData.append(key, body[key]);
  }
  //  formData.append('attachments', attachments);
  if (attachments) {
    for (let x = 0; x < attachments.length; x++) {
      formData.append("attachments", attachments[x]);
    }
  } else {
    formData.append("attachments", attachments);
  }

  //add a new item
  return http.post(apiEndpoint, formData);
}

//delete items
export function deleteItem(Id) {
  return http.delete(itemUrl(Id));
}
