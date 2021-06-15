import React, { useReducer, useEffect } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCESS,
    LOGOUT,
    CLEAR_ERRORS
}  from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    //ACTIONS

    //Load User - check which user is logged in. get user data

    //Register User - sign user up

    //Login User - 

    //Logout - destroy the token 

    // Clear Errors

    return (
        <AuthContext.Provider 
        value = {{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            token: state.error,

        }} 
        >
        {props.children}

        </AuthContext.Provider>

    );
};

export default AuthState;