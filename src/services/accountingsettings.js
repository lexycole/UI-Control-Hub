import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/accountingsettings';


  function accountingsettingUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getAccountingSettings() {
    return http.get(apiEndpoint);
  }

  export function getMyAccountingSetting() {
    return http.get(apiEndpoint+'/me');
  }
  
  export function getAccountingSetting(Id) {
    return http.get(accountingsettingUrl(Id));
  }
  
  export function saveAccountingSetting(accountingsetting) {
    //clone
    const body = { ...accountingsetting };
    console.log(body);
   //update
   if (accountingsetting._id) {
     //delete _id
     delete body._id;
     return http.put(accountingsettingUrl(accountingsetting._id),body);
   }
 
   //add a new accountingsetting
   return http.post(apiEndpoint, accountingsetting);
 }
  
  //delete accountingsettings
  export function deleteAccountingSetting(Id) {
    return http.delete(accountingsettingUrl(Id));
  }  