import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/obcs';


  function obcUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getOBCs() {
    return http.get(apiEndpoint);
  }
  
  export function getOBC(Id) {
    return http.get(obcUrl(Id));
  }
  
  export function saveOBC(obc) {
    //clone
    const body = { ...obc };
    console.log(body);
   //update
   if (obc.id) {
     //delete _id
     delete body.id;
     return http.put(obcUrl(obc.id),body);
   }
 
   //add a new obc
   return http.post(apiEndpoint, obc);
 }
  
  //delete obcs
  export function deleteOBC(Id) {
    return http.delete(obcUrl(Id));
  }  