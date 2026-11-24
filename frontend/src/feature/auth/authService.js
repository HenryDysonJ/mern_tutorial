import axios from 'axios';

const API_URL = '/api/user';
const BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: BASE_URL
});

const register = async (userData)=>{
   
    const responds = await api.post(API_URL, userData);

    if(responds.data){
        localStorage.setItem('user', JSON.stringify(responds.data))
    }
    
    return responds.data;
}

const login = async (userData)=>{
   
    const responds = await api.post(API_URL+"/login", userData);
    if(responds.data){
        localStorage.setItem('user', JSON.stringify(responds.data))
    }
    
    return responds.data;
}
const authService = {
     register,
     login
}

export default authService