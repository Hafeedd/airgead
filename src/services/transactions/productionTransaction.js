import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"

const useProductionTransactionServices = ()=>{
    const axios = useAxiosPrivate()

    const postProductionData = async(data)=>{
        const response = await axios.post('production/?activity_code=1390',data)
        return response.data
    }

    const putProductionData = async(data,id)=>{
        const response = await axios.put(`/production/${id}/?activity_code=1391`,data)
        return response.data
    }

    const getProductionDaybookPart = async(params)=>{
        const response = await axios.get('/production/production_daybook_part_list/?activity_code=1389',{params:{...params}})
        return response?.data
    }
    
    const getProductionDetails = async(id)=>{
        const response = await axios.get(`/production/${id}/?activity_code=1392`)
        return response?.data
    }

    const delProductionData = async(id)=>{
        const response = await axios.get(`/production/${id}/?activity_code=1393`)
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