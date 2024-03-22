import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/kanbans';


  function kanbanUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getKanbans() {
    return http.get(apiEndpoint);
  }
  
  export function getKanban(Id) {
    return http.get(kanbanUrl(Id));
  }
  
  export function saveKanban(kanban) {
    //clone
    const body = { ...kanban };
    console.log(body);
   //update
   if (kanban._id) {
     //delete _id
     delete body._id;
     return http.put(kanbanUrl(kanban._id),body);
   }
 
   //add a new kanban
   return http.post(apiEndpoint, kanban);
 }
  
  //delete kanbans
  export function deleteKanban(Id) {
    return http.delete(kanbanUrl(Id));
  }  