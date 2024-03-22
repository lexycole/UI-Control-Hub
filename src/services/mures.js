import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/mures';


  function mureUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getMures() {
    return http.get(apiEndpoint);
  }
  
  export function getMure(Id) {
    return http.get(mureUrl(Id));
  }
  
  export function saveMure(mure) {
    //clone
    const body = { ...mure };
    console.log("about to save mure : " , body);
   //update
   if (mure._id) {
     delete body._id;
     return http.put(mureUrl(mure._id),body);
   }
 
   //add a new mure
   return http.post(apiEndpoint, mure);
 }
  
  //delete mures
  export function deleteMure(Id) {
    return http.delete(mureUrl(Id));
  }  