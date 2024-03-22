import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/cards';


  function cardUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getCards() {
    return http.get(apiEndpoint);
  }
  
  export function getCard(Id) {
    return http.get(cardUrl(Id));
  }
  
  export function saveCard(card) {
    //clone
    const body = { ...card };
    console.log(body);
   //update
   if (card.id) {
     //delete _id
     delete body.id;
     return http.put(cardUrl(card.id),body);
   }
 
   //add a new card
   return http.post(apiEndpoint, card);
 }
  
  //delete cards
  export function deleteCard(Id) {
    return http.delete(cardUrl(Id));
  }  