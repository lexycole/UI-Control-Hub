import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/cargos';


  function cargoUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getCargos() {
    return http.get(apiEndpoint);
  }
  
  export function getCargo(Id) {
    return http.get(cargoUrl(Id));
  }
  
  export function saveCargo(cargo) {
    //clone
    const body = { ...cargo };
    console.log(body);
   //update
   if (cargo.id) {
     //delete _id
     delete body.id;
     return http.put(cargoUrl(cargo.id),body);
   }
 
   //add a new cargo
   return http.post(apiEndpoint, cargo);
 }
  
  //delete cargos
  export function deleteCargo(Id) {
    return http.delete(cargoUrl(Id));
  }  