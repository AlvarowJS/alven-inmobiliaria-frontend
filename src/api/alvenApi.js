import axios from "axios";

const alvenApi = axios.create({ 
    baseURL: 'http://127.0.0.1:8000/api'
    // baseURL: 'https://backend.alven-inmobiliaria.com.mx/api'
});

export default alvenApi;
