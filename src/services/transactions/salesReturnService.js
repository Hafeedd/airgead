import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"


export const useSalesReturnServices = () => {
    const axios = useAxiosPrivate()

    // post sales
    const postSalesReturn = async(data) =>{
        const response = await axios.post('/sales/sales_return_master/created/?activity_code=1220',data)
        return response.data
    }
    
    // get sales
    const getSalesReturnList = async() =>{
        const response = await axios.get('/sales/sales_return/code/?activity_code=1470')
        return response.data
    }
    // get sales wiht id
    const getSalesReturnWihtId = async(id) =>{
        const response = await axios.get('/sales/sales_return_master/updated/'+id+'/?activity_code=1221')
        return response.data
    }
    
    //put sales
    const putSalesReturn = async(id,data) =>{
        const response = await axios.put('/sales/sales_return_master/updated/'+id+'/?activity_code=1222',data)
        return response.data
    }
    
    //delete sales item
    const deleteSalesReturn = async(id) =>{
        const response = await axios.delete('/sales/sales_return_master/updated/'+id+'/?activity_code=1223')
        return response.data
    }


    return{
        //get
        getSalesReturnList,
        getSalesReturnWihtId,
        //post
        postSalesReturn,
        //put
        putSalesReturn,
        //delete
        deleteSalesReturn,

        
    }
}
