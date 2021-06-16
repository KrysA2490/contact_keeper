//Check if token is passed in. If yes set it to global header. If not, remove it from the global header.

import axios from "axios"


const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else{
        delete axios.defaults.headers.common['x-auth-token'] 
    }
}

export default setAuthToken;