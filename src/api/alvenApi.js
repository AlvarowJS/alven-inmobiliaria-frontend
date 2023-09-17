import axios from "axios";

const baseURL = 'https://backend.alven-inmobiliaria.com.mx/api';
// const baseURL = 'https://backend.alven-inmobiliaria.com.mx';

const alvenApi = axios.create({ baseURL });

// busApi.interceptors.request.use(
//     async (config) => {
//         const token = await AsyncStorage.getItem('token');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     }
// )

export default alvenApi;
