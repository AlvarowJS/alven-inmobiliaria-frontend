import axios from 'axios'

const operacionApi = axios.create({
    // Produccion
    baseURL: 'https://notify.grupogenera.pe/api/v1/operacion/'

    // Local    
    // baseURL: 'https://notify.grupogenera.pe/api/v1/operacion/'
})

export default operacionApi