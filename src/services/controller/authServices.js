import useAxios from '../../hooks/axios/useAxios'
import useAxiosPrivate from '../../hooks/axios/useAxiosPrivate'

export const useAuthServices = () =>{
    const axiosPrivate = useAxiosPrivate()
    const axios = useAxios()

    const register = async (data) =>{
        const resp = await axios.post('controller/controller_register/',data,
        {headers:{'Content-Type': 'multipart/form-data'}}
        )
        return resp.data
    }
    
    const loginAuth = async (data,params) =>{
        const resp = await axios.post('auth/login/',data,
        {params:params}
        )
        return resp.data
    }
    const logoutAuth = async () =>{
        const resp = await axiosPrivate.post('auth/logout/')
        return resp.data
    }

    const verifyUser = async () =>{
        const resp = await axiosPrivate.get('auth/verify')
        return resp.data
    }

    return {
        register,
        loginAuth,
        verifyUser,
        logoutAuth,
    }
}