import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
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

    //Load User - check which user is logged in. get user data from backend and put in state.
    const loadUser = async () =>{
        if(localStorage.token) {
            setAuthToken(localStorage.token)
        }
        try{
            const res = await axios.get('/api/auth');

            dispatch({ 
                type: USER_LOADED, 
                payload: res.data 
            });
        }catch(err){
            dispatch({ type: AUTH_ERROR})
        }
    }

    //Register User - sign user up
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //Make request to backend
        try{
            const res = await axios.post('/api/users', formData, config);

            dispatch({ 
                type: REGISTER_SUCCESS, 
                payload: res.data })
            
                loadUser();
        }catch(err) {
            dispatch({ 
                type: REGISTER_FAIL, 
                payload: err.response.data.msg
            })
        }

    }

    //Login User - 
    const logIn = () => console.log('login')

    //Logout - destroy the token 
    const logOut = () => console.log('logout')

    // Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS })

    return (
        <AuthContext.Provider 
        value = {{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register, 
            loadUser, 
            logIn, 
            logOut,
            clearErrors
        }} 
        >
        {props.children}

        </AuthContext.Provider>

    );
};

export default AuthState;