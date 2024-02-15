import {axiosPrivate} from '../../api/axios'

const useProductionTransactionServices = ()=>{
    const postProductionData = async(data)=>{
        const response = await axiosPrivate.post('production/',data)
        return response.data
    }

    const getProductionDaybookPart = async(params)=>{
        const response = await axiosPrivate.get('/production/production_daybook_part_list/',{params:{...params}})
        return response?.data
    }

    return{
        // post
        postProductionData,
        //get
        getProductionDaybookPart,
    }
}

export default useProductionTransactionServices