import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/treatmentsbs';


  function treatmentsbUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getTreatmentsbs() {
    return http.get(apiEndpoint);
  }
  
  export function getTreatmentsb(Id) {
    return http.get(treatmentsbUrl(Id));
  }
  
  export function saveTreatmentsb(treatmentsb) {
    //clone
    const body = { ...treatmentsb };
    console.log(body);
   //update
   if (treatmentsb.id) {
     //delete _id
     delete body.id;
     return http.put(treatmentsbUrl(treatmentsb.id),body);
   }
 
   //add a new treatmentsb
   return http.post(apiEndpoint, treatmentsb);
 }
  
  //delete treatmentsbs
  export function deleteTreatmentsb(Id) {
    return http.delete(treatmentsbUrl(Id));
  }  