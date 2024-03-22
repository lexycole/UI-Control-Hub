import { apiUrl } from "./../config/config.json";
import http from "./httpService";
const apiEndpoint = apiUrl + "/tickets";

function ticketUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getTickets() {
  return http.get(apiEndpoint);
}

export function getTicket(Id) {
  return http.get(ticketUrl(Id));
}

/* export function saveTicket(ticket) {
	//clone
	const body = { ...ticket };
	console.log("ticket body", body);
	//update
	if (ticket._id) {
		//delete _id
		delete body._id;
		return http.put(ticketUrl(ticket._id), body);
	}

	//add a new ticket
	return http.post(apiEndpoint, ticket);
} */

export function sharingTicket(data) {
  const formData = new FormData();
  const body = { ...data };
  console.log(body);
  delete body._id;
  // const options = ["sharedTill", "sharedTo", "permissions"];
  // for (let key in body) {
  //   if (options.includes(key)) formData.append(key, JSON.stringify(body[key]));
  //   else formData.append(key, body[key]);
  // }
  // console.log(formData);
  return http.patch(ticketUrl(data._id), body);
}

export function saveTicket(ticket, attachments) {
  const formData = new FormData();
  const options = [
    "participants",
    "sharedTill",
    "sharedTo",
    "permissions",
    "deadline",
  ];
  //update
  if (ticket._id) {
    //clone ticket and delete _id
    const body = { ...ticket };
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
    return http.put(ticketUrl(ticket._id), formData);
  }
  const body = { ...ticket };
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

  //add a new ticket
  return http.post(apiEndpoint, formData);
}

// save the excel file 
export async function saveExcelTicket(ticket,attachments) {
  const formData = new FormData();
     const body = { ...ticket };
     delete body._id;
     delete body.attachments;
     for (let key in body) {
         formData.append(key, JSON.stringify(body[key]));
     }
    //  attachments = {
    //     uri: attachments,
    //     type: 'excel/xlsx',
    //     name: 'excel' + '-' + Date.now() + '.xlsx'
    //   }
      // const response = await fetch(attachments);
      // const blob = await response.blob();
      const blob = new Blob([attachments],{type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"})
      localStorage.setItem('excel',blob)
    formData.append('attachments',blob)
    console.log("aaa",formData.get("attachments"));
    console.log("attachments put",attachments);
    return http.put(ticketUrl(ticket._id), formData);
}




//delete tickets
export function deleteTicket(Id) {
  return http.delete(ticketUrl(Id));
}
