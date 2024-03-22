import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/medicalsessions';


  function medicalsessionUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getMedicalsessions() {
    return http.get(apiEndpoint);
  }
  
  export function getMedicalsession(Id) {
    return http.get(medicalsessionUrl(Id));
  }
  
  export function saveTCMsession(medicalsession) {
    //clone
    const body = { ...medicalsession };
    console.log(body);
   //update
   if (medicalsession.id) {
     //delete _id
     delete body.id;
     return http.put(medicalsessionUrl(medicalsession.id),body);
   }
 
   //add a new medicalsession
   return http.post(apiEndpoint, medicalsession);
 }
  
  //delete medicalsessions
  export function deleteMedicalsession(Id) {
    return http.delete(medicalsessionUrl(Id));
  }  