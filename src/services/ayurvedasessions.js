import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/ayurvedasessions';


  function ayurvedasessionUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getAyurvedasessions() {
    return http.get(apiEndpoint);
  }
  
  export function getAyurvedasession(Id) {
    return http.get(ayurvedasessionUrl(Id));
  }
  
  export function saveAyurvedasession(ayurvedasession) {
    //clone
    const body = { ...ayurvedasession };
    console.log(body);
   //update
   if (ayurvedasession._id) {
     //delete _id
     delete body._id;
     return http.put(ayurvedasessionUrl(ayurvedasession._id),body);
   }
 
   //add a new ayurvedasession
   return http.post(apiEndpoint, ayurvedasession);
 }
  
  //delete ayurvedasessions
  export function deleteAyurvedasession(Id) {
    return http.delete(ayurvedasessionUrl(Id));
  }  