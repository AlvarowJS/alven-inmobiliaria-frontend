import axios from 'axios'

const xmlApi = axios.create({
    // Produccion
    baseURL: 'https://notify.grupogenera.pe/api/v1/readxml/'

    // Local
    // baseURL: 'https://notify.grupogenera.pe/api/v1/readxml/'
})

export default xmlApi