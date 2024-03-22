import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/expenses';


  function expenseUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getExpenses() {
    return http.get(apiEndpoint);
  }
  
  export function getExpense(Id) {
    return http.get(expenseUrl(Id));
  }
  
  export function saveExpense(expense) {
    //clone
    const body = { ...expense };
    console.log(body);
   //update
   if (expense._id) {
     //delete _id
     delete body._id;
     return http.put(expenseUrl(expense._id),body);
   }
 
   //add a new expense
   return http.post(apiEndpoint, expense);
 }
  
  //delete expenses
  export function deleteExpense(Id) {
    return http.delete(expenseUrl(Id));
  }  