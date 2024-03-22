import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/amateriamedicas';


  function amateriamedicaUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getMateriamedicas() {
    return http.get(apiEndpoint);
  }
  
  export function getMateriamedica(Id) {
    return http.get(amateriamedicaUrl(Id));
  }
  
  export function saveMateriamedica(amateriamedica) {
    //clone
    const body = { ...amateriamedica };
    console.log(body);
   //update
   if (amateriamedica.id) {
     //delete _id
     delete body.id;
     return http.put(amateriamedicaUrl(amateriamedica.id),body);
   }
 
   //add a new amateriamedica
   return http.post(apiEndpoint, amateriamedica);
 }
  
  //delete amateriamedicas
  export function deleteMateriamedica(Id) {
    return http.delete(amateriamedicaUrl(Id));
  }  