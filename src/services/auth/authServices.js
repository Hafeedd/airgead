import axios from '../../api/axios'

export const useAuthServices = () =>{
    const register = async (data) =>{
        const resp = await axios.post('controller/controller_register/',data,
        {headers:{'Content-Type': 'multipart/form-data'}}
        )
        return resp.data
    }
    const login = async (data,params) =>{
        const resp = await axios.post('auth/login/',data,
        {params:params}
        )
        return resp.data
    }

    return {
        register,
        login
    }
}