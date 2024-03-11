import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"


export const useSalesOrderServices = () => {
    const axios = useAxiosPrivate()

    // post sales
    const postSalesOrder = async(data) =>{
        const response = await axios.post('/sales/sales/order/created/',data)
        return response.data
    }
    
    // get sales
    const getSalesOrderList = async() =>{
        const response = await axios.get('/sales/sales_order/code/')
        return response.data
    }
    // get sales with id
    const getSalesOrderWithId = async(id) =>{
        const response = await axios.get('/sales/sales/order/updated/'+id+'/')
        return response.data
    }
    
    //put sales
    const putSalesOrder = async(id,data) =>{
        const response = await axios.put('/sales/sales/order/updated/'+id+'/',data)
        return response.data
    }
    
    //delete sales item
    const deleteSalesOrder = async(id) =>{
        const response = await axios.delete('/sales/sales/order/updated/'+id+'/')
        return response.data
    }


    return{
        //get
        getSalesOrderList,
        getSalesOrderWithId,
        //post
        postSalesOrder,
        //put
        putSalesOrder,
        //delete
        deleteSalesOrder,

        
    }
}
