import {axiosPrivate} from '../../api/axios'

const useProductionTransactionServices = ()=>{
    const postProductionData = async(data)=>{
        const response = await axiosPrivate.post('production/',data)
        return response.data
    }

    const putProductionData = async(data,id)=>{
        const response = await axiosPrivate.put(`/production/${id}/`,data)
        return response.data
    }

    const getProductionDaybookPart = async(params)=>{
        const response = await axiosPrivate.get('/production/production_daybook_part_list/',{params:{...params}})
        return response?.data
    }
    
    const getProductionDetails = async(id)=>{
        const response = await axiosPrivate.get(`/production/${id}/`)
        return response?.data
    }

    const delProductionData = async(id)=>{
        const response = await axiosPrivate.get(`/production/${id}/`)
        return response?.data
    }

    return{
        //post
        postProductionData,
        //get
        getProductionDaybookPart,
        getProductionDetails,
        //put
        putProductionData,
        //delete
        delProductionData
    }
}

export default useProductionTransactionServices