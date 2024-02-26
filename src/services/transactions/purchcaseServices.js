import { axiosPrivate } from "../../api/axios"

const usePurchaseServices = () => {

    //post requests =================================

    // post full purchase data 
    const postPurchase = async (data) =>{
        const response = await axiosPrivate.post('purchase/purchase/created/',data)
        return response.data
    }

    //put requests ==================================

    // update full purchase data
    const putPurchase = async (id,data) =>{
        const response = await axiosPrivate.put('purchase/purchase/updated/'+id+'/',data)
        return response.data
    }

    //get requests ===================================

    // get all purchase data
    const getPurchase = async (id) =>{
        const response = await axiosPrivate.get('purchase/purchase/created/')
        return response.data
    }

    //delete requests ===================================

    // get all purchase data
    const deletePurchase = async (id) =>{
        const response = await axiosPrivate.delete('purchase/purchase/updated/'+id+"/")
        return response.data
    }

    
    return{
        //post
        postPurchase,
        //put
        putPurchase,
        //get
        getPurchase,
        //delete
        deletePurchase,
    }
}

export default usePurchaseServices