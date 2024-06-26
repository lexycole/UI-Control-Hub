import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import auth from './../services/authservice';
const ProtectedRoute = ({path,component:Component,render,...rest}) =>{
        return (

            <Route 
            //path= {path}
            {...rest} 
            render ={props => {
                //console.log(props);
                if(!auth.getProfile()) return <Redirect to="/login" />;
                return Component ? <Component {...props} /> : render(props);
              }}/>
          );
}
 
export default ProtectedRoute;
