import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/invoices';


  function invoiceUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getInvoices() {
    return http.get(apiEndpoint);
  }
  
  export function getInvoice(Id) {
    return http.get(invoiceUrl(Id));
  }
  
  export function saveInvoice(invoice) {
    //clone
    const body = { ...invoice };
    console.log(body);
   //update
   if (invoice._id) {
     //delete _id
     delete body._id;
     return http.put(invoiceUrl(invoice._id),body);
   }
 
   //add a new invoice
   return http.post(apiEndpoint, invoice);
 }
  
  //delete invoices
  export function deleteInvoice(Id) {
    return http.delete(invoiceUrl(Id));
  }  