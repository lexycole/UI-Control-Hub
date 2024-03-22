import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/meriadians';


  function meriadianUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getMeriadians() {
    return http.get(apiEndpoint);
  }
  
  export function getMeriadian(Id) {
    return http.get(meriadianUrl(Id));
  }
  
  export function saveMeriadian(meriadian) {
    //clone
    const body = { ...meriadian };
    console.log(body);
   //update
   if (meriadian.id) {
     //delete _id
     delete body.id;
     return http.put(meriadianUrl(meriadian.id),body);
   }
 
   //add a new meriadian
   return http.post(apiEndpoint, meriadian);
 }
  
  //delete meriadians
  export function deleteMeriadian(Id) {
    return http.delete(meriadianUrl(Id));
  }  