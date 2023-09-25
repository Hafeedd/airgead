import axios from 'axios'

const BASE_URL = 'https://accounts-api.foxa.in/api/v1/'

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