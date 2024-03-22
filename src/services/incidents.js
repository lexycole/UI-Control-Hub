import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/incidents';


  function incidentUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getIncidents() {
    return http.get(apiEndpoint);
  }
  
  export function getIncident(Id) {
    return http.get(incidentUrl(Id));
  }
  
  export function saveIncident(incident) {
    //clone
    const body = { ...incident };
    console.log("about to save incident : " , body);
   //update
   if (incident._id) {
     delete body._id;
     return http.put(incidentUrl(incident._id),body);
   }
 
   //add a new incident
   return http.post(apiEndpoint, incident);
 }
  
  //delete incidents
  export function deleteIncident(Id) {
    return http.delete(incidentUrl(Id));
  }  