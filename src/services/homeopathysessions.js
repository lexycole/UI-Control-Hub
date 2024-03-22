import http from "./httpService";
import { apiUrl } from "./../config/config.json";
const apiEndpoint = apiUrl + "/homeopathysessions";

function homeosessionUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getHomeosessions() {
  return http.get(apiEndpoint);
}

export function getHomeosession(Id) {
  return http.get(homeosessionUrl(Id));
}

export function saveHomeosession(homeosession) {



  //clone
  const body = { ...homeosession };
  //update
  if (homeosession._id) {
    //delete _id
    delete body._id;
    return http.put(homeosessionUrl(homeosession._id), body);
  }


  //add a new homeosession
  return http.post(apiEndpoint, homeosession);
}

//delete homeosessions
export function deleteHomeosession(Id) {
  return http.delete(homeosessionUrl(Id));
}
