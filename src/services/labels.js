import { apiUrl } from "./../config/config.json";
import http from "./httpService";
const apiEndpoint = apiUrl + "/labels";

function labelUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getLabels() {
  return http.get(apiEndpoint);
}

export function getLabel(Id) {
  return http.get(labelUrl(Id));
}
//need to be reviewed
// export function saveLabel(service, imageSrc) {
//   const formData = new FormData(); 
//   //clone
//   const body = { ...service };
//   console.log({ service, imageSrc });
//  //update
//  if (service._id) {
//    //delete _id
//    delete body._id;
//     for (let key in body) {
//     formData.append(key, body[key]);
//   }
//   formData.append('imageSrc', imageSrc);
//   return http.put(labelUrl(service._id),body);
// }

export function saveLabel(label) {
  //clone
  const body = { ...label };
  //update
  if (label._id) {
    //delete _id
    delete body._id;
    return http.put(labelUrl(label._id), body);
  }

  //add a new label
  return http.post(apiEndpoint, label);
}

//delete labels
export function deleteLabel(Id) {
  return http.delete(labelUrl(Id));
}
