import React from 'react';
import { Redirect, Route } from 'react-router';
import auth from './../services/authservice';
const PublicRoute = ({path,component:Component,render,...rest}) =>{
        return (

            <Route 
            //path= {path}
            {...rest} 
            render ={props => {
                // console.log(props);
                if(auth.getProfile()) return <Redirect to="/dashboard" />;
                return Component ? <Component {...props} /> : render(props);
              }}/>
          );
}
 
export default PublicRoute;
