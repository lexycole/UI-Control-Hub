import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/shipments';


  function shipmentUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getShipments() {
    return http.get(apiEndpoint);
  }
  
  export function getShipment(Id) {
    return http.get(shipmentUrl(Id));
  }
  
  export function saveShipment(shipment) {
    //clone
    const body = { ...shipment };
    console.log("about to save shipment : " , body);
   //update
   if (shipment._id) {
     delete body._id;
     return http.put(shipmentUrl(shipment._id),body);
   }
 
   //add a new shipment
   return http.post(apiEndpoint, shipment);
 }
  
  //delete shipments
  export function deleteShipment(Id) {
    return http.delete(shipmentUrl(Id));
  }  