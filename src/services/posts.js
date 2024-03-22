import http from './httpService'; 
import {apiUrl} from '../config/config.json';
const apiEndpoint = apiUrl + "/posts";


  function postUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getPosts() {
    return http.get(apiEndpoint);
  }
  
  export function getPost(Id) {
    
    return http.get(postUrl(Id));
  }
  
  export function savePost(categorie) {
    //clone
  
   //update
   if (categorie._id) {
    const body = { ...categorie };
   delete body._id;
 
     //formData.append('attachments', attachments);
   
     console.log(body)
   
   return http.put(postUrl(categorie._id), body);
   }
   const body = { ...categorie };

   console.log(body);
 
   //add a new categorie
   return http.post(apiEndpoint, body);
 }
  
  //delete categories
  export function deletePost(Id) {
      console.log(postUrl(Id))
    return http.delete(postUrl(Id));
  }  