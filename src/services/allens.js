import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/allens';


  function allenUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getAllens() {
    return http.get(apiEndpoint);
  }
  
  export function getAllen(Id) {
    return http.get(allenUrl(Id));
  }
  
  export function saveAllen(allen) {
    //clone
    const body = { ...allen };
    console.log("about to save allen : " , body);
   //update
   if (allen._id) {
     delete body._id;
     return http.put(allenUrl(allen._id),body);
   }
 
   //add a new allen
   return http.post(apiEndpoint, allen);
 }
  
  //delete allens
  export function deleteAllen(Id) {
    return http.delete(allenUrl(Id));
  }  