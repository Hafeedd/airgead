import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"

const usePurchaseReturnServices = () => {
    const axios = useAxiosPrivate()

    //post requests =================================

    // post full purchase_return data 
    const postPurchaseReturn = async (data) =>{
        const response = await axios.post('purchase/purchase_returns/created/?activity_code=1201',data)
        return response.data
    }

    //put requests ==================================

    // update full purchase_return data
    const putPurchaseReturn = async (id,data) =>{
        const response = await axios.put('purchase/purchase_returns/updated/'+id+'/?activity_code=1203',data)
        return response.data
    }

    //get requests ===================================

    // get all purchase_return data
    const getPurchaseReturnList = async (id) =>{
        const response = await axios.get('purchase/purchase_return/code/?activity_code=1467')
        return response.data
    }
    // get all purchase_return data
    const getPurchaseReturnWithId = async (id) =>{
        const response = await axios.get('purchase/purchase_returns/updated/'+id+'/?activity_code=1202')
        return response.data
    }

    //delete requests ===================================

    // get all purchase_return data
    const deletePurchaseReturn = async (id) =>{
        const response = await axios.delete('purchase/purchase_return/updated/'+id+"/?activity_code=1204")
        return response.data
    }
    
    return{
        //post
        postPurchaseReturn,
        //put
        putPurchaseReturn,
        //get
        getPurchaseReturnList,
        getPurchaseReturnWithId,
        //delete
        deletePurchaseReturn,
    }
}

export default usePurchaseReturnServices