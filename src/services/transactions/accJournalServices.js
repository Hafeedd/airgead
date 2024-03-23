import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"

const useAccJournalServices = () =>{
    const axios = useAxiosPrivate()
    
    // post account journal
    const postAccJournal = async (data) =>{
        const response = await axios.post('/transactions/journal/created/?activity_code=1299',data,{params:{method:"ACCOUNT_JOURNAL"}})
        return response.data
    }

    // get account journal
    const getAccJournal = async () =>{
        const response = await axios.get('/transactions/journal/created/?activity_code=1298',{params:{date:(new Date().toISOString().slice(0,10))}})
        return response.data
    }
    
    // put account journal
    const putAccJournal = async (id,data) =>{
        const response = await axios.put(`/transactions/journal/updated/${id}/?activity_code=1300`,data)
        return response.data
    }
    // delete account journal
    const deleteAccJournal = async (id) =>{
        const response = await axios.delete(`/transactions/journal/updated/${id}/?activity_code=1301`)
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