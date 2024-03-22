import http from './httpService'; 
import {apiUrl} from './../config/config.json';

const apiEndpoint = apiUrl+'/conversations';

  function conversationUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getConversations() {
    return http.get(apiEndpoint);
  }
  
  export function getConversation(userId) {
    return http.get(conversationUrl(userId));
  }
  
  export function saveConversation(conversation) {
    const body = { ...conversation };
   //update
   if (conversation._id) {
     //delete _id
     delete body._id;
     return http.put(conversationUrl(conversation._id), body);
   }
   return http.post(apiEndpoint, body);
 }
 
  //delete 
  export function deleteConversation(conversationId) {
    return http.delete(conversationUrl(conversationId));
  }  