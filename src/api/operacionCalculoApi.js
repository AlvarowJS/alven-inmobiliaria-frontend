import axios from 'axios'

const operacionCalculoApi = axios.create({
    // Produccion
    baseURL: 'https://notify.grupogenera.pe/api/v1/opetemporalsuma/'

    // Local    
    // baseURL: 'https://notify.grupogenera.pe/api/v1/opetemporalsuma/'
})

export default operacionCalculoApi