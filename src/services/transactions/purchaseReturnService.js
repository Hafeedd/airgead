import axios from "../../api/axios"

const usePurchaseReturnServices = () => {

    //post requests =================================

    // post full purchase_return data 
    const postPurchaseReturn = async (data) =>{
        const response = await axios.post('purchase/purchase_returns/created/',data)
        return response.data
    }

    //put requests ==================================

    // update full purchase_return data
    const putPurchaseReturn = async (id,data) =>{
        const response = await axios.put('purchase/purchase_returns/updated/'+id+'/',data)
        return response.data
    }

    //get requests ===================================

    // get all purchase_return data
    const getPurchaseReturnList = async (id) =>{
        const response = await axios.get('purchase/purchase_return/code/')
        return response.data
    }
    // get all purchase_return data
    const getPurchaseReturnWithId = async (id) =>{
        const response = await axios.get('purchase/purchase_returns/updated/'+id+'/')
        return response.data
    }

    //delete requests ===================================

    // get all purchase_return data
    const deletePurchaseReturn = async (id) =>{
        const response = await axios.delete('purchase/purchase_return/updated/'+id+"/")
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