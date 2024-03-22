import useAxios from '../../hooks/axios/useAxios'
import useAxiosPrivate from '../../hooks/axios/useAxiosPrivate'
import { handleNetworkError } from '../ErrorHandler/errorHandler'

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

    const verifyUser = async () =>{
        try{
            const resp = await axiosPrivate.get('auth/verify')
            return resp.data
        }catch(err){
            handleNetworkError(err)
        }
    }

    return {
        register,
        loginAuth,
        verifyUser,
    }
}