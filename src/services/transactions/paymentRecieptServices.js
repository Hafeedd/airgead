import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"
const usePaymentRecieptServices = () =>{
    const axios = useAxiosPrivate()
   
    // post 

    const postPaymentReciept = async (data) => {
        const response = await axios.post('/transactions/receipt/created/',data)
        return response.data
    }

    //put 
    
    const putPaymentReciept = async (id,data) => {
        const response = await axios.put('transactions/receipt/updated/'+id+'/',data)
        return response.data
    }
  
    //delete 
    
    const delPaymentReciept = async (id) => {
        const response = await axios.delete('transactions/receipt/updated/'+id+'/')
        return response.data
    }

    //get 

    const getPaymentReciept = async (params) => {
        const response = await axios.get('/transactions/receipt/created/',{...params})
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