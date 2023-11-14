import { axiosPrivate } from "../../api/axios"

const useStockJournalServices = () =>{

    //get stock journal
    const getStockJ = async (data) =>{
        const response = await axiosPrivate.get('/transactions/stock_journal/created/',data)
        return response.data
    }
    
    //post stock journal
    const postStockJ = async (data) =>{
        const response = await axiosPrivate.post('/transactions/stock_journal/created/',data)
        return response.data
    }
    
    //put stock journal
    const putStockJ = async (data,id) =>{
        const response = await axiosPrivate.put('/transactions/stock_journal/updated/'+id+'/',data)
        return response.data
    }
   
    // delete stock journal
    const deleteStockJ = async (id) =>{
        const response = await axiosPrivate.delete('/transactions/stock_journal/updated/'+id+'/')
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