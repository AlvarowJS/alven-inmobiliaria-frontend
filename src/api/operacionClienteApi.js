import axios from 'axios'

const operacionClienteApi = axios.create({
    // Produccion
    baseURL: 'https://notify.grupogenera.pe/api/v1/opecliente'

    // Local    
    // baseURL: 'https://notify.grupogenera.pe/api/v1/opecliente'
})

export default operacionClienteApi