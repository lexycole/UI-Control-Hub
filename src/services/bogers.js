import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/bogers';


  function bogerUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getBogers() {
    return http.get(apiEndpoint);
  }
  
  export function getBoger(Id) {
    return http.get(bogerUrl(Id));
  }
  
  export function saveBoger(boger) {
    //clone
    const body = { ...boger };
    console.log("about to save boger : " , body);
   //update
   if (boger._id) {
     delete body._id;
     return http.put(bogerUrl(boger._id),body);
   }
 
   //add a new boger
   return http.post(apiEndpoint, boger);
 }
  
  //delete bogers
  export function deleteBoger(Id) {
    return http.delete(bogerUrl(Id));
  }  