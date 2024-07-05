import axios from "axios";

const alvenApi = axios.create({ 
    // baseURL: 'https://backend.alven-inmobiliaria.com.mx/api'
    baseURL: 'https://backend.alven-inmobiliaria.com.mx/api'
});

export default alvenApi;
