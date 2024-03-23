import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"
const usePaymentRecieptServices = () =>{
    const axios = useAxiosPrivate()
   
    // post 

    const postPaymentReciept = async (data) => {
        const response = await axios.post('/transactions/receipt/created/?activity_code=1458',data)
        return response.data
    }

    //put 
    
    const putPaymentReciept = async (id,data) => {
        const response = await axios.put('transactions/receipt/updated/'+id+'/?activity_code=1459',data)
        return response.data
    }
  
    //delete 
    
    const delPaymentReciept = async (id) => {
        const response = await axios.delete('transactions/receipt/updated/'+id+'/?activity_code=1460')
        return response.data
    }

    //get 

    const getPaymentReciept = async (params) => {
        const response = await axios.get('/transactions/receipt/created/?activity_code=1457',{...params})
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