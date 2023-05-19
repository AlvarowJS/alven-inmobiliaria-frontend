import axios from 'axios'

const operacionExcel = axios.create({
    // Produccion
    responseType: 'blob',

    baseURL: 'https://notify.grupogenera.pe/api/v1/exportexcel/'

    // Local
    // baseURL: 'https://notify.grupogenera.pe/api/v1/exportexcel/'
})

export default operacionExcel