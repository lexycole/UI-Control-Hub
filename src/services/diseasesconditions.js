import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/diseasesconditions';


  function diseasesconditionUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getDiseasesconditions() {
    return http.get(apiEndpoint);
  }
  
  export function getDiseasescondition(Id) {
    return http.get(diseasesconditionUrl(Id));
  }
  
  export function saveDiseasescondition(diseasescondition) {
    //clone
    const body = { ...diseasescondition };
    console.log(body);
   //update
   if (diseasescondition.id) {
     //delete _id
     delete body.id;
     return http.put(diseasesconditionUrl(diseasescondition.id),body);
   }
 
   //add a new diseasescondition
   return http.post(apiEndpoint, diseasescondition);
 }
  
  //delete diseasesconditions
  export function deleteDiseasescondition(Id) {
    return http.delete(diseasesconditionUrl(Id));
  }  