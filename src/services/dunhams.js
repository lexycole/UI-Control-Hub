import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/dunhams';


  function dunhamUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getDunhams() {
    return http.get(apiEndpoint);
  }
  
  export function getDunham(Id) {
    return http.get(dunhamUrl(Id));
  }
  
  export function saveDunham(dunham) {
    //clone
    const body = { ...dunham };
    console.log("about to save dunham : " , body);
   //update
   if (dunham._id) {
     delete body._id;
     return http.put(dunhamUrl(dunham._id),body);
   }
 
   //add a new dunham
   return http.post(apiEndpoint, dunham);
 }
  
  //delete dunhams
  export function deleteDunham(Id) {
    return http.delete(dunhamUrl(Id));
  }  