import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/coas';


  function coaUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getCOAs() {
    return http.get(apiEndpoint);
  }
  
  export function getCOA(Id) {
    return http.get(coaUrl(Id));
  }
  
  export function saveCOA(coa) {
    //clone
    const body = { ...coa };
    console.log(body);
   //update
   if (coa.id) {
     //delete _id
     delete body.id;
     return http.put(coaUrl(coa.id),body);
   }
 
   //add a new coa
   return http.post(apiEndpoint, coa);
 }
  
  //delete coas
  export function deleteCOA(Id) {
    return http.delete(coaUrl(Id));
  }  