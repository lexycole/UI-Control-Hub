import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/medicalfiles';


  function medicalfileUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getMedicalFiles() {
    return http.get(apiEndpoint);
  }
  
  export function getMedicalFile(Id) {
    return http.get(medicalfileUrl(Id));
  }
  
  export function saveMedicalFile(medicalfile) {
    //clone
    const body = { ...medicalfile };
    console.log(body);
   //update
   if (medicalfile.id) {
     //delete _id
     delete body.id;
     return http.put(medicalfileUrl(medicalfile.id),body);
   }
 
   //add a new medicalfile
   return http.post(apiEndpoint, medicalfile);
 }
  
  //delete medicalfiles
  export function deleteMedicalfile(Id) {
    return http.delete(medicalfileUrl(Id));
  }  