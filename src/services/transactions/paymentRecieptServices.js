import { async } from "q"
import { axiosPrivate } from "../../api/axios"

const usePaymentRecieptServices = () =>{
    // post 

    const postPaymentReciept = async (data) => {
        const response = await axiosPrivate.post('/transactions/receipt/create/',data)
        return response.data
    }

    //put 
    
    const putPaymentReciept = async (id,data) => {
        const response = await axiosPrivate.put('transactions/receipt/update/'+id+'/',data)
        return response.data
    }
  
    //delete 
    
    const delPaymentReciept = async (id) => {
        const response = await axiosPrivate.delete('transactions/receipt/updated/'+id+'/')
        return response.data
    }

    //get 

    const getPaymentReciept = async () => {
        const response = await axiosPrivate.get('/transactions/receipt/create/')
        return response.data
    }

    return {
        //post
        postPaymentReciept,
        //put
        putPaymentReciept,
        //delete
        delPaymentReciept,
        //get
        getPaymentReciept,
    }
}

export default usePaymentRecieptServices