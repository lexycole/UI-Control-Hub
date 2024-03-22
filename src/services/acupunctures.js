import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/acupunctures';


  function acupunctureUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getAcupunctures() {
    return http.get(apiEndpoint);
  }
  
  export function getAcupuncture(Id) {
    return http.get(acupunctureUrl(Id));
  }
  
  export function saveAcupuncture(acupuncture) {
    //clone
    const body = { ...acupuncture };
    console.log(body);
   //update
   if (acupuncture.id) {
     //delete _id
     delete body.id;
     return http.put(acupunctureUrl(acupuncture.id),body);
   }
 
   //add a new acupuncture
   return http.post(apiEndpoint, acupuncture);
 }
  
  //delete acupunctures
  export function deleteAcupuncture(Id) {
    return http.delete(acupunctureUrl(Id));
  }  