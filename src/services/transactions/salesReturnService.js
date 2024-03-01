import { axiosPrivate } from "../../api/axios"


export const useSalesReturnServices = () => {

    // post sales
    const postSalesReturn = async(data) =>{
        const response = await axiosPrivate.post('/sales/sales_return_master/created/',data)
        return response.data
    }
    
    // get sales
    const getSalesReturn = async() =>{
        const response = await axiosPrivate.get('/sales/sales_return_master/created/')
        return response.data
    }
    
    //put sales
    const putSalesReturn = async(id,data) =>{
        const response = await axiosPrivate.put('/sales/sales_return_master/updated/'+id+'/',data)
        return response.data
    }
    
    //delete sales item
    const deleteSalesReturn = async(id) =>{
        const response = await axiosPrivate.delete('/sales/sales_return_master/updated/'+id+'/')
        return response.data
    }


    return{
        //get
        getSalesReturn,
        //post
        postSalesReturn,
        //put
        putSalesReturn,
        //delete
        deleteSalesReturn,

        
    }
}
