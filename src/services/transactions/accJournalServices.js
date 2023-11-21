import { axiosPrivate } from "../../api/axios"

const useAccJournalServices = () =>{
    
    // post account journal
    const postAccJournal = async (data) =>{
        const response = await axiosPrivate.post('/transactions/journal/created/',data,{params:{method:"ACCOUNT_JOURNAL"}})
        return response.data
    }

    // get account journal
    const getAccJournal = async () =>{
        const response = await axiosPrivate.get('/transactions/journal/created/',{params:{date:(new Date().toISOString().slice(0,10))}})
        return response.data
    }
    
    // put account journal
    const putAccJournal = async (id,data) =>{
        const response = await axiosPrivate.put(`/transactions/journal/updated/${id}/`,data)
        return response.data
    }
    // delete account journal
    const deleteAccJournal = async (id) =>{
        const response = await axiosPrivate.delete(`/transactions/journal/updated/${id}/`)
        return response.data
    }

    return{
        postAccJournal,
        getAccJournal,
        putAccJournal,
        deleteAccJournal,
    }
    
}

export default useAccJournalServices