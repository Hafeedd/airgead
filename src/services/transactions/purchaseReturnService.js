import { axiosPrivate } from "../../api/axios"

const usePurchaseReturnServices = () => {

    //post requests =================================

    // post full purchase_return data 
    const postPurchaseReturn = async (data) =>{
        const response = await axiosPrivate.post('purchase/purchase_returns/created/',data)
        return response.data
    }

    //put requests ==================================

    // update full purchase_return data
    const putPurchaseReturn = async (id,data) =>{
        const response = await axiosPrivate.put('purchase/purchase_returns/updated/'+id+'/',data)
        return response.data
    }

    //get requests ===================================

    // get all purchase_return data
    const getPurchaseReturn = async (id) =>{
        const response = await axiosPrivate.get('purchase/purchase_returns/created/')
        return response.data
    }

    //delete requests ===================================

    // get all purchase_return data
    const deletePurchaseReturn = async (id) =>{
        const response = await axiosPrivate.delete('purchase/purchase_return/updated/'+id+"/")
        return response.data
    }
    
    return{
        //post
        postPurchaseReturn,
        //put
        putPurchaseReturn,
        //get
        getPurchaseReturn,
        //delete
        deletePurchaseReturn,
    }
}

export default usePurchaseReturnServices