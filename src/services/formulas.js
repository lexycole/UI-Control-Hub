import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/formulas';


  function formulaUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getFormulas() {
    return http.get(apiEndpoint);
  }
  
  export function getFormula(Id) {
    return http.get(formulaUrl(Id));
  }
  
  export function saveFormula(formula) {
    //clone
    const body = { ...formula };
    console.log(body);
   //update
   if (formula.id) {
     //delete _id
     delete body.id;
     return http.put(formulaUrl(formula.id),body);
   }
 
   //add a new formula
   return http.post(apiEndpoint, formula);
 }
  
  //delete formulas
  export function deleteFormula(Id) {
    return http.delete(formulaUrl(Id));
  }  