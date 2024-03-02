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
    const getPurchaseList = async (id) =>{
        const response = await axiosPrivate.get('purchase/purchase/code/')
        return response.data
    }
    // get all purchase data
    const getPurchaseWithId = async (id) =>{
        const response = await axiosPrivate.get('purchase/purchase/updated/'+id+'/')
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
        getPurchaseList,
        getPurchaseWithId,
        //delete
        deletePurchase,
    }
}

export default usePurchaseServices