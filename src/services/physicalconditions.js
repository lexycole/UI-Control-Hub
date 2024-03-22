import http from './httpService'; 
import {apiUrl} from '../config/config.json';
const apiEndpoint = apiUrl+'/physicalconditions';


  function physicalconditionUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getPhysicalConditions() {
    return http.get(apiEndpoint);
  }
  
  export function getPhysicalCondition(Id) {
    return http.get(physicalconditionUrl(Id));
  }
  
  export function savePhysicalCondition(physicalcondition) {
    //clone
    const body = { ...physicalcondition };
    console.log(body);
   //update
   if (physicalcondition._id) {
     //delete _id
     delete body._id;
     return http.put(physicalconditionUrl(physicalcondition._id),body);
   }
 
   //add a new physicalcondition
   return http.post(apiEndpoint, physicalcondition);
 }
  
  //delete physicalconditions
  export function deletePhysicalCondition(Id) {
    return http.delete(physicalconditionUrl(Id));
  }  