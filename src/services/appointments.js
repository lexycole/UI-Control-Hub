import http from './httpService';
import { apiUrl } from './../config/config.json';
const apiEndpoint = apiUrl + '/appointments';


function appointmentUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getAppointments() {
  return http.get(apiEndpoint);
}

export function getAppointment(Id) {
  return http.get(apiEndpoint + '/' + Id);
}

export function saveAppointment(appointment,attachments=[]) {
  // //clone
  // const body = { ...appointment };
  // console.log(body);
  // //update
  // if (appointment._id) {
  //   //delete _id
  //   delete body._id;
  //   return http.put(appointmentUrl(appointment._id), body);
  // }

  // //add a new appointment
  // return http.post(apiEndpoint, appointment);

  const formData = new FormData();
  const options = [
    "sharedTill",
    "sharedTo",
    "permissions",
    //"start",
    //"end"
  ];
  //update
  if (appointment._id) {
    //clone appointment and delete _id
    const body = { ...appointment };
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
    return http.put(appointmentUrl(appointment._id), formData);
  }
  const body = { ...appointment };
  for (let key in body) {
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

  //add a new appointment
  return http.post(apiEndpoint, formData);


}

export function sharingAppointment(appointment) {
  const formData = new FormData();
  const body = { ...appointment };
  delete body._id;
  console.log("body", body)
  const options = ["usersToMail", "sharedTo", "sharedTill", "permissions", "sharedToNonReg", "sharedTillNonReg", "permissionsNonReg"];
  for (let key in body) {
    if (options.includes(key)) formData.append(key, JSON.stringify(body[key]));
    else formData.append(key, body[key]);
  }
  console.log(formData);
  console.log("FormData", formData)
  return http.patch(appointmentUrl(appointment._id), formData);
}


//delete appointments
export function deleteAppointment(Id) {
  return http.delete(appointmentUrl(Id));
}  