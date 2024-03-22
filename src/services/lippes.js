import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/lippes';


  function lippeUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getLippes() {
    return http.get(apiEndpoint);
  }
  
  export function getLippe(Id) {
    return http.get(lippeUrl(Id));
  }
  
  export function saveLippe(lippe) {
    //clone
    const body = { ...lippe };
    console.log("about to save lippe : " , body);
   //update
   if (lippe._id) {
     delete body._id;
     return http.put(lippeUrl(lippe._id),body);
   }
 
   //add a new lippe
   return http.post(apiEndpoint, lippe);
 }
  
  //delete lippes
  export function deleteLippe(Id) {
    return http.delete(lippeUrl(Id));
  }  