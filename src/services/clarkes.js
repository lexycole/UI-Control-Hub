import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/clarkes';


  function clarkeUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getClarkes() {
    return http.get(apiEndpoint);
  }
  
  export function getClarke(Id) {
    return http.get(clarkeUrl(Id));
  }
  
  export function saveClarke(clarke) {
    //clone
    const body = { ...clarke };
    console.log("about to save clarke : " , body);
   //update
   if (clarke._id) {
     delete body._id;
     return http.put(clarkeUrl(clarke._id),body);
   }
 
   //add a new clarke
   return http.post(apiEndpoint, clarke);
 }
  
  //delete clarkes
  export function deleteClarke(Id) {
    return http.delete(clarkeUrl(Id));
  }  