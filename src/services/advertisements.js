import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/advertisements';


  function advertisementUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getAdvertisements() {
    return http.get(apiEndpoint);
  }
  
  export function getAdvertisement(Id) {
    return http.get(advertisementUrl(Id));
  }
  
  export function saveAdvertisement(advertisement) {
    //clone
    const body = { ...advertisement };
    console.log("about to save advertisement : " , body);
   //update
   if (advertisement._id) {
     delete body._id;
     return http.put(advertisementUrl(advertisement._id),body);
   }
 
   //add a new advertisement
   return http.post(apiEndpoint, advertisement);
 }
  
  //delete advertisements
  export function deleteAdvertisement(Id) {
    return http.delete(advertisementUrl(Id));
  }  