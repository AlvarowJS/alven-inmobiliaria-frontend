import axios from 'axios'

const opreacionTempApi = axios.create({
    // Produccion
    baseURL: 'https://notify.grupogenera.pe/api/v1/opetemporal/'

    // Local    
    // baseURL: 'https://notify.grupogenera.pe/api/v1/opetemporal'
})

export default opreacionTempApi