import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/transactions';


  function transactionUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getTransactions() {
    return http.get(apiEndpoint);
  }
  
  export function getTransaction(Id) {
    return http.get(transactionUrl(Id));
  }
  
  export function saveTransaction(transaction) {
    //clone
    const body = { ...transaction };
    console.log(body);
   //update
   if (transaction.id) {
     //delete _id
     delete body.id;
     return http.put(transactionUrl(transaction.id),body);
   }
 
   //add a new transaction
   return http.post(apiEndpoint, transaction);
 }
  
  //delete transactions
  export function deleteTransaction(Id) {
    return http.delete(transactionUrl(Id));
  }  