import { axiosPrivate } from "../../api/axios"

const usePurchaseServices = () => {

    //post requests =================================

    // post full purchase data 
    const postPurchase = async (data) =>{
        const response = await axiosPrivate.post('transactions/purchase/created/',data)
        return response.data
    }
    // post purchase item
    const postPurchaseItem = async (data) =>{
        const response = await axiosPrivate.post('transactions/purchase_item/created/',data)
        return response.data
    }
    // post purchase item batch 
    const postPurchaseItemBatch = async (data) =>{
        const response = await axiosPrivate.post('transactions/purchase_item/batch_qty/created/',data)
        return response.data
    }

    //put requests ==================================

    // update full purchase data
    const putPurchase = async (id,data) =>{
        const response = await axiosPrivate.put('transactions/purchase/updated/'+id+'/',data)
        return response.data
    }
    // update purchase item
    const putPurchaseItem = async (id,data) =>{
        const response = await axiosPrivate.put('transactions/purchase_item/updated/'+id+'/',data)
        return response.data
    }
    // update purchase item batch 
    const putPurchaseItemBatch = async (data,id) =>{
        const response = await axiosPrivate.put('transactions/purchase_item/batch_qty/updated/'+id+'/',data)
        return response.data
    }

    //get requests ===================================

    // get all purchase data
    const getPurchase = async (id) =>{
        const response = await axiosPrivate.get('transactions/purchase/created/')
        return response.data
    }
    // get purchase item 
    const getPurchaseItem = async (id) =>{
        const response = await axiosPrivate.get('transactions/purchase_item/created/'+id+'/')
        return response.data
    }
    // get purchase item batch 
    const getPurchaseItemBatch = async (id) =>{
        const response = await axiosPrivate.get('transactions/purchase_item/batch_qty/created/'+id+'/')
        return response.data
    }

    //delete requests ===================================

    // get all purchase data
    const deletePurchase = async (id) =>{
        const response = await axiosPrivate.delete('transactions/purchase/updated/')
        return response.data
    }
    // delete purchase item 
    const deletePurchaseItem = async (id) =>{
        const response = await axiosPrivate.delete('transactions/purchase_item/updated/'+id+'/')
        return response.data
    }
    // delete purchase item batch 
    const deletePurchaseItemBatch = async (id) =>{
        const response = await axiosPrivate.delete('transactions/purchase_item/batch_qty/updated/'+id+'/')
        return response.data
    }

    return{
        //post
        postPurchase,
        postPurchaseItem,
        postPurchaseItemBatch,
        //put
        putPurchase,
        putPurchaseItem,
        putPurchaseItemBatch,
        //get
        getPurchase,
        getPurchaseItem,
        getPurchaseItemBatch,
        //delete
        deletePurchase,
        deletePurchaseItem,
        deletePurchaseItemBatch,
    }
}

export default usePurchaseServices