import http from './httptreatment'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/treatments';


  function treatmentUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function gettreatments() {
    return http.get(apiEndpoint);
  }
  
  export function gettreatment(Id) {
    return http.get(treatmentUrl(Id));
  }
  
  export function savetreatment(treatment) {
    //clone
    const body = { ...treatment };
    console.log(body);
   //update
   if (treatment._id) {
     //delete _id
     delete body._id;
     return http.put(treatmentUrl(treatment._id),body);
   }
 
   //add a new treatment
   return http.post(apiEndpoint, treatment);
 }
  
  //delete treatments
  export function deletetreatment(Id) {
    return http.delete(treatmentUrl(Id));
  }  