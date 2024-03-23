import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"

const useStockJournalServices = () =>{
    const axios = useAxiosPrivate()

    //get stock journal
    const getStockJ = async (data) =>{
        const response = await axios.get('/transactions/stock_journal/created/?activity_code=1287',data)
        return response.data
    }
    
    //post stock journal
    const postStockJ = async (data) =>{
        const response = await axios.post('/transactions/stock_journal/created/?activity_code=1288',data)
        return response.data
    }
    
    //put stock journal
    const putStockJ = async (data,id) =>{
        const response = await axios.put(`/transactions/stock_journal/updated/${id}/?activity_code=1289`,data)
        return response.data
    }
   
    // delete stock journal
    const deleteStockJ = async (id) =>{
        const response = await axios.delete(`/transactions/stock_journal/updated/${id}/?activity_code=1290`)
        return response.data
    }

    return {
        getStockJ,
        postStockJ,
        putStockJ,
        deleteStockJ,
    }
}

export default useStockJournalServices