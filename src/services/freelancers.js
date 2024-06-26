//import axios from 'axios';
import http from "./httpService";
import { apiUrl } from "./../config/config.json";

const apiEndpoint = apiUrl + "/freelancers";

function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getFreelancers() {
  return http.get(apiEndpoint);
}

export function getFreelancer(userId) {
  return http.get(userUrl(userId));
}

export function getFreelancerByUser(id) {
  return http.get(`${apiEndpoint}/user/${id}`);
}

export function saveFreelancer(user, imageSrc) {
  const formData = new FormData();
  //update
  const options = ["skills", "certifications"];
  if (user._id) {
    //clone user and delete _id
    const body = { ...user };
    delete body._id;
    for (let key in body) {
      if (options.includes(key))
        formData.append(key, JSON.stringify(body[key]));
      else formData.append(key, body[key]);
    }
    formData.append("imageSrc", imageSrc);
    return http.put(userUrl(user._id), formData);
  }
  const body = { ...user };
  for (let key in body) {
    if (options.includes(key)) formData.append(key, JSON.stringify(body[key]));
    else formData.append(key, body[key]);
  }
  formData.append("imageSrc", imageSrc);
  //add a new user
  return http.post(apiEndpoint, formData);
}

export function patchFreelancer(user, imageSrc) {
  const formData = new FormData();
  //update
  if (user._id) {
    const body = { ...user };
    delete body._id;
    delete body.imageSrc;
    for (let key in body) {
      formData.append(key, body[key]);
    }
    formData.append("imageSrc", imageSrc);
    return http.patch(userUrl(user._id), formData);
  }
}

//delete users
export function deleteFreelancer(userId) {
  return http.delete(userUrl(userId));
}
