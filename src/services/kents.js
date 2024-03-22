import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/kents';


  function kentUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getKents() {
    return http.get(apiEndpoint);
  }
  
  export function getKent(Id) {
    return http.get(kentUrl(Id));
  }
  
  export function saveKent(kent) {
    //clone
    const body = { ...kent };
    console.log("about to save kent : " , body);
   //update
   if (kent._id) {
     delete body._id;
     return http.put(kentUrl(kent._id),body);
   }
 
   //add a new kent
   return http.post(apiEndpoint, kent);
 }
  
  //delete kents
  export function deleteKent(Id) {
    return http.delete(kentUrl(Id));
  }  