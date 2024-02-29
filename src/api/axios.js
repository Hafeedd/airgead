import axios from 'axios'

const BASE_URL = 'https://accounts-api.foxa.in/api/v1/' // normal server api 
// const BASE_URL = 'http://localhost:8000/api/v1/'
// const BASE_URL = 'https://192.168.29.163/api/v1/' // benison api (can be changed)
// const BASE_URL = 'http://192.168.29.171:8000/api/v1/' // dilshad api (can be changed)

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