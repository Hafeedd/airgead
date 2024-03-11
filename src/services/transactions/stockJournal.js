import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"

const useStockJournalServices = () =>{
    const axios = useAxiosPrivate()

    //get stock journal
    const getStockJ = async (data) =>{
        const response = await axios.get('/transactions/stock_journal/created/',data)
        return response.data
    }
    
    //post stock journal
    const postStockJ = async (data) =>{
        const response = await axios.post('/transactions/stock_journal/created/',data)
        return response.data
    }
    
    //put stock journal
    const putStockJ = async (data,id) =>{
        const response = await axios.put('/transactions/stock_journal/updated/'+id+'/',data)
        return response.data
    }
   
    // delete stock journal
    const deleteStockJ = async (id) =>{
        const response = await axios.delete('/transactions/stock_journal/updated/'+id+'/')
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