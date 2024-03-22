import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/tcmsessions';


  function tcmsessionUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getTCMsessions() {
    return http.get(apiEndpoint);
  }
  
  export function getTCMsession(Id) {
    return http.get(tcmsessionUrl(Id));
  }
  
  export function saveTCMsession(tcmsession) {
    //clone
    const body = { ...tcmsession };
    console.log(body);
   //update
   if (tcmsession._id) {
     //delete _id
     delete body._id;
     return http.put(tcmsessionUrl(tcmsession._id),body);
   }
 
   //add a new tcmsession
   return http.post(apiEndpoint, tcmsession);
 }
  
  //delete tcmsessions
  export function deleteTCMsession(Id) {
    return http.delete(tcmsessionUrl(Id));
  }  