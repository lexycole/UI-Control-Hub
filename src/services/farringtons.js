import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/farringtons';


  function farringtonUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getFarringtons() {
    return http.get(apiEndpoint);
  }
  
  export function getFarrington(Id) {
    return http.get(farringtonUrl(Id));
  }
  
  export function saveFarrington(farrington) {
    //clone
    const body = { ...farrington };
    console.log("about to save farrington : " , body);
   //update
   if (farrington._id) {
     delete body._id;
     return http.put(farringtonUrl(farrington._id),body);
   }
 
   //add a new farrington
   return http.post(apiEndpoint, farrington);
 }
  
  //delete farringtons
  export function deleteFarrington(Id) {
    return http.delete(farringtonUrl(Id));
  }  