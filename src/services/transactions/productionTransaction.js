import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"

const useProductionTransactionServices = ()=>{
    const axios = useAxiosPrivate()

    const postProductionData = async(data)=>{
        const response = await axios.post('production/',data)
        return response.data
    }

    const putProductionData = async(data,id)=>{
        const response = await axios.put(`/production/${id}/`,data)
        return response.data
    }

    const getProductionDaybookPart = async(params)=>{
        const response = await axios.get('/production/production_daybook_part_list/',{params:{...params}})
        return response?.data
    }
    
    const getProductionDetails = async(id)=>{
        const response = await axios.get(`/production/${id}/`)
        return response?.data
    }
    return{
        // post
        postProductionData,
        //get
        getProductionDaybookPart,
        getProductionDetails,
        //put
        putProductionData
    }
}

export default useProductionTransactionServices