import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl + "/forumsubcategories";


  function subCategorieUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getSubCategories() {
    return http.get(apiEndpoint);
  }
  
  export function getSubCategorie(Id) {
    
    return http.get(subCategorieUrl(Id));
  }
  
  export function saveSubCategorie(categorie) {
    //clone
  
  
   //update
   if (categorie._id) {
    const body = { ...categorie };
     //delete _id
     delete body._id;
     return http.put(subCategorieUrl(categorie._id),body);
   }
   const body = { ...categorie };
   console.log(body);
  
   //add a new categorie
   return http.post(apiEndpoint, body);
 }
  
  //delete categories
  export function deleteSubCategorie(Id) {
      console.log(subCategorieUrl(Id))
    return http.delete(subCategorieUrl(Id));
  }  