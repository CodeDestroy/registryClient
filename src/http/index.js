import axios from "axios";

export const API_URL = 'http://94.103.83.213:8080/' 

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    
    return config;
});

export default $api;