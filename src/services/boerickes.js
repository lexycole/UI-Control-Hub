import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/boerickes';


  function boerickeUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getBoerickes() {
    return http.get(apiEndpoint);
  }
  
  export function getBoericke(Id) {
    return http.get(boerickeUrl(Id));
  }
  
  export function saveBoericke(boericke) {
    //clone
    const body = { ...boericke };
    console.log("about to save boericke : " , body);
   //update
   if (boericke._id) {
     delete body._id;
     return http.put(boerickeUrl(boericke._id),body);
   }
 
   //add a new boericke
   return http.post(apiEndpoint, boericke);
 }
  
  //delete boerickes
  export function deleteBoericke(Id) {
    return http.delete(boerickeUrl(Id));
  }  