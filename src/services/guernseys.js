import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/guernseys';


  function guernseyUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getGuernseys() {
    return http.get(apiEndpoint);
  }
  
  export function getGuernsey(Id) {
    return http.get(guernseyUrl(Id));
  }
  
  export function saveGuernsey(guernsey) {
    //clone
    const body = { ...guernsey };
    console.log("about to save guernsey : " , body);
   //update
   if (guernsey._id) {
     delete body._id;
     return http.put(guernseyUrl(guernsey._id),body);
   }
 
   //add a new guernsey
   return http.post(apiEndpoint, guernsey);
 }
  
  //delete guernseys
  export function deleteGuernsey(Id) {
    return http.delete(guernseyUrl(Id));
  }  