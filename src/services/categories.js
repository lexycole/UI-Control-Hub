import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl + "/forumcategories";


  function categorieUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getcategories() {
    return http.get(apiEndpoint);
  }
  
  export function getcategorie(Id) {
    return http.get(categorieUrl(Id));
  }
  
  export function savecategorie(categorie,icon) {
    const formData = new FormData();
    //clone
    
  
   //update
   if (categorie._id) {
    const body = { ...categorie };
     //delete _id
     delete body._id;
     for (let key in body) {
      formData.append(key, body[key]);
    }
    formData.append('icon', icon);
     return http.put(categorieUrl(categorie._id),formData);
   }
   console.log(body);
   const body = { ...categorie };
   for ( let key in body ) {
    formData.append(key, body[key]);
    }
   formData.append('icon', icon);
   const config = {     
     headers: { 'content-type': 'multipart/form-data' }
 }


   //add a new categorie
   return http.post(apiEndpoint, formData,config);
 }
  
  //delete categories
  export function deletecategorie(Id) {
    return http.delete(categorieUrl(Id));
  }  