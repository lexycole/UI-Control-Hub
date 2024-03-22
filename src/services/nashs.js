import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/nashs';


  function nashUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getNashs() {
    return http.get(apiEndpoint);
  }
  
  export function getNash(Id) {
    return http.get(nashUrl(Id));
  }
  
  export function saveNash(nash) {
    //clone
    const body = { ...nash };
    console.log("about to save nash : " , body);
   //update
   if (nash._id) {
     delete body._id;
     return http.put(nashUrl(nash._id),body);
   }
 
   //add a new nash
   return http.post(apiEndpoint, nash);
 }
  
  //delete nashs
  export function deleteNash(Id) {
    return http.delete(nashUrl(Id));
  }  