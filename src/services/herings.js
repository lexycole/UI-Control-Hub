import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/herings';


  function heringUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getHerings() {
    return http.get(apiEndpoint);
  }
  
  export function getHering(Id) {
    return http.get(heringUrl(Id));
  }
  
  export function saveHering(hering) {
    //clone
    const body = { ...hering };
    console.log("about to save hering : " , body);
   //update
   if (hering._id) {
     delete body._id;
     return http.put(heringUrl(hering._id),body);
   }
 
   //add a new hering
   return http.post(apiEndpoint, hering);
 }
  
  //delete herings
  export function deleteHering(Id) {
    return http.delete(heringUrl(Id));
  }  