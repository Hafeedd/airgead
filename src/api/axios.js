import axios from 'axios'

// const BASE_URL = 'http://localhost/api/v1/'
// const BASE_URL = 'https://accounts-live-api.foxa.in/api/v1/'
// const BASE_URL = 'https://accounts-live-api.foxa.in/api/v1/'
const BASE_URL = 'https://accounts-auth-api.foxa.in/api/v1/' // server api for authentication testing
// const BASE_URL = 'https://accounts-api.foxa.in/api/v1/' // normal server api 
// const BASE_URL = 'http://localhost:8000/api/v1/'    
// const BASE_URL = 'http://192.168.29.171:8000/api/v1/'
// export const MEDIA_URL = 'https://accounts-auth-api.foxa.in/'
// export const MEDIA_URL = 'https://accounts-live-api.foxa.in/'
// export const MEDIA_URL = 'http://localhost:8000/media/'
// export const MEDIA_URL = 'https://accounts-auth-api.foxa.in/'
export const MEDIA_URL = 'https://accounts-live-api.foxa.in/'
// export const MEDIA_URL = 'http://192.168.29.171:8000/'
// export const MEDIA_URL = 'http://localhost:8000/api/v1/'
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
    }
});