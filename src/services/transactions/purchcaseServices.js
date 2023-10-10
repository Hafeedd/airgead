import axios, { axiosPrivate } from "../../api/axios"

const usePurchaseServices = () => {

    //post requests =================================

    // post full purchase data 
    const postPurchase = async (data) =>{
        const response = await axiosPrivate.post('transactions/purchase/created/',data)
        return response.data
    }
    // post purchase item
    const postPurchaseItem = async (data) =>{
        const response = await axiosPrivate.post('transactions/purchase_item/created/'+id+'/',data)
        return response.data
    }
    // post purchase item batch 
    const postPurchaseItemBatch = async (data) =>{
        const response = await axiosPrivate.post('transactions/purchase_item/batch_qty/created/'+id+'/',data)
        return response.data
    }

    //put requests ==================================

    // update full purchase data
    const putPurchase = async (data,id) =>{
        const response = await axiosPrivate.put('transactions/purchase/updated/'+id+'/',data)
        return response.data
    }
    // update purchase item
    const putPurchaseItem = async (data,id) =>{
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
    const getPurchase = async (data) =>{
        const response = await axiosPrivate.get('transactions/purchase/created/')
        return response.data
    }
    // get purchase item 
    const getPurchaseItem = async (data) =>{
        const response = await axiosPrivate.get('transactions/purchase_item/created/'+id+'/')
        return response.data
    }
    // get purchase item batch 
    const getPurchaseItemBatch = async (data) =>{
        const response = await axiosPrivate.get('transactions/purchase_item/batch_qty/created/'+id+'/')
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
    }
}