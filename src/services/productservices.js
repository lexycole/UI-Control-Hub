import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/productservices';


  function productserviceUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getProductservices() {
    return http.get(apiEndpoint);
  }
  
  export function getProductservice(Id) {
    return http.get(productserviceUrl(Id));
  }
  
  export function saveProductservice(productservice) {
    //clone
    const body = { ...productservice };
    console.log(body);
   //update
   if (productservice.id) {
     //delete _id
     delete body.id;
     return http.put(productserviceUrl(productservice.id),body);
   }
 
   //add a new productservice
   return http.post(apiEndpoint, productservice);
 }
  
  //delete productservices
  export function deleteProductservice(Id) {
    return http.delete(productserviceUrl(Id));
  }  