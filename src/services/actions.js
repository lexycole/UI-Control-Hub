import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/actions';


  function actionUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getActions() {
    return http.get(apiEndpoint);
  }
  
  export function getAction(Id) {
    return http.get(actionUrl(Id));
  }
  
  export function saveAction(action) {
    //clone
    const body = { ...action };
    console.log(body);
   //update
   if (action.id) {
     //delete _id
     delete body.id;
     return http.put(actionUrl(action.id),body);
   }
 
   //add a new action
   return http.post(apiEndpoint, action);
 }
  
  //delete actions
  export function deleteAction(Id) {
    return http.delete(actionUrl(Id));
  }  