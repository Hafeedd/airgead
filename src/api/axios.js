import axios from 'axios'

// const BASE_URL = 'http://localhost/api/v1/'
// const BASE_URL = 'https://accounts-api.foxa.in/api/v1/'
const BASE_URL = 'http://localhost:8000/api/v1/'
// const BASE_URL = 'https://192.168.29.163/api/v1/'

export default axios.create({
    baseURL: BASE_URL,
    headers:{
        'Content-Type': "application/json",
    },
})

export const axiosPrivate=axios.create({
    baseURL: BASE_URL,
    headers:{
        'Content-Type': "application/json",
    },
    withCredentials:false
});