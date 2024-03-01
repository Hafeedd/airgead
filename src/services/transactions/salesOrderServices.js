import { axiosPrivate } from "../../api/axios"


export const useSalesOrderServices = () => {

    // post sales
    const postSalesOrder = async(data) =>{
        const response = await axiosPrivate.post('/sales/sales/order/created/',data)
        return response.data
    }
    
    // get sales
    const getSalesOrder = async() =>{
        const response = await axiosPrivate.get('/sales/sales/order/created/')
        return response.data
    }
    
    //put sales
    const putSalesOrder = async(id,data) =>{
        const response = await axiosPrivate.put('/sales/sales/order/updated/'+id+'/',data)
        return response.data
    }
    
    //delete sales item
    const deleteSalesOrder = async(id) =>{
        const response = await axiosPrivate.delete('/sales/sales/order/updated/'+id+'/')
        return response.data
    }


    return{
        //get
        getSalesOrder,
        //post
        postSalesOrder,
        //put
        putSalesOrder,
        //delete
        deleteSalesOrder,

        
    }
}
