import axios from 'axios'

const operacionCalculoAbonarApi = axios.create({
    // Produccion
    baseURL: 'https://notify.grupogenera.pe/api/v1/opetemporalsuma-abonar/'

    // Local    
    // baseURL: 'https://notify.grupogenera.pe/api/v1/opetemporalsuma-abonar/'
})

export default operacionCalculoAbonarApi