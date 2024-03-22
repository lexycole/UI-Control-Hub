import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/rootcauses';


  function rootcauseUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getRootcauses() {
    return http.get(apiEndpoint);
  }
  
  export function getRootcause(Id) {
    return http.get(rootcauseUrl(Id));
  }
  
  export function saveRootcause(rootcause) {
    //clone
    const body = { ...rootcause };
    console.log(body);
   //update
   if (rootcause.id) {
     //delete _id
     delete body.id;
     return http.put(rootcauseUrl(rootcause.id),body);
   }
 
   //add a new rootcause
   return http.post(apiEndpoint, rootcause);
 }
  
  //delete rootcauses
  export function deleteRootcause(Id) {
    return http.delete(rootcauseUrl(Id));
  }  