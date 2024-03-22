import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl + "/topics";


  function topicUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function gettopics() {
    return http.get(apiEndpoint);
  }
  
  export function gettopic(Id) {
    return http.get(topicUrl(Id));
  }
  
  export function savetopic(topic) {
    //clone
    const body = { ...topic };
    console.log(body);
   //update
   if (topic._id) {
     //delete _id
     delete body._id;
     return http.put(topicUrl(topic._id),body);
   }
   console.log(body);
   //add a new topic
   return http.post(apiEndpoint, body);
 }
  
  //delete topics
  export function deletetopic(Id) {
    return http.delete(topicUrl(Id));
  }  