import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext'

//taking in a component and anything else passed in 
const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading } = authContext;

    return (
    <Route 
        {...rest} render= {props=> 
        !isAuthenticated && !loading ? (
           <Redirect to ='/login' />
        ): (
            <Component {...props} />
       )
    } 
    />
    )
}

export default PrivateRoute
