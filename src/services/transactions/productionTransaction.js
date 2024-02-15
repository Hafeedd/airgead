import {axiosPrivate} from '../../api/axios'

const useProductionTransactionServices = ()=>{
    const postProductionData = async(data)=>{
        const response = await axiosPrivate.post('production/',data)
        return response.data
    }
    return{
        // post
        postProductionData,
    }
}

export default useProductionTransactionServices