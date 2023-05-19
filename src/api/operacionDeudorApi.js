import axios from 'axios'

const operacionDeudorApi = axios.create({
    // Produccion
    baseURL: 'https://notify.grupogenera.pe/api/v1/opedeudor'

    // Local    
    // baseURL: 'https://notify.grupogenera.pe/api/v1/opedeudor'
})

export default operacionDeudorApi