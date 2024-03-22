import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/hahnemanns';


  function hahnemannUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getHahnemanns() {
    return http.get(apiEndpoint);
  }
  
  export function getHahnemann(Id) {
    return http.get(hahnemannUrl(Id));
  }
  
  export function saveHahnemann(hahnemann) {
    //clone
    const body = { ...hahnemann };
    console.log("about to save hahnemann : " , body);
   //update
   if (hahnemann._id) {
     delete body._id;
     return http.put(hahnemannUrl(hahnemann._id),body);
   }
 
   //add a new hahnemann
   return http.post(apiEndpoint, hahnemann);
 }
  
  //delete hahnemanns
  export function deleteHahnemann(Id) {
    return http.delete(hahnemannUrl(Id));
  }  