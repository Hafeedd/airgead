import { axiosPrivate } from "../../api/axios"

const usePurchaseReturnServices = () => {

    //post requests =================================

    // post full purchase_return data 
    const postPurchaseReturn = async (data) =>{
        const response = await axiosPrivate.post('purchase/purchase_return/created/',data)
        return response.data
    }
    // post purchase_return item
    const postPurchaseReturnItem = async (data) =>{
        const response = await axiosPrivate.post('purchase/purchase_return/item/created/',data)
        return response.data
    }
    // post purchase_return item batch 
    const postPurchaseReturnItemBatch = async (data) =>{
        const response = await axiosPrivate.post('purchase/purchase_return/item/batch_qty/created/',data)
        return response.data
    }

    //put requests ==================================

    // update full purchase_return data
    const putPurchaseReturn = async (id,data) =>{
        const response = await axiosPrivate.put('purchase/purchase_return/updated/'+id+'/',data)
        return response.data
    }
    // update purchase_return item
    const putPurchaseReturnItem = async (id,data) =>{
        const response = await axiosPrivate.put('purchase/purchase_return/item/updated/'+id+'/',data)
        return response.data
    }
    // update purchase_return item batch 
    const putPurchaseReturnItemBatch = async (data,id) =>{
        const response = await axiosPrivate.put('purchase/purchase_return/item/batch_qty/updated/'+id+'/',data)
        return response.data
    }

    //get requests ===================================

    // get all purchase_return data
    const getPurchaseReturn = async (id) =>{
        const response = await axiosPrivate.get('purchase/purchase_return/created/')
        return response.data
    }
    // get purchase_return item 
    const getPurchaseReturnItem = async () =>{
        const response = await axiosPrivate.get('purchase/purchase_return/item/created/')
        return response.data
    }
    // get purchase_return item batch 
    const getPurchaseReturnItemBatch = async (id) =>{
        const response = await axiosPrivate.get('purchase/purchase_return/item/batch_qty/created/'+id+'/')
        return response.data
    }

    //delete requests ===================================

    // get all purchase_return data
    const deletePurchaseReturn = async (id) =>{
        const response = await axiosPrivate.delete('purchase/purchase_return/updated/'+id+"/")
        return response.data
    }
    // delete purchase_return item 
    const deletePurchaseReturnItem = async (id) =>{
        const response = await axiosPrivate.delete('purchase/purchase_return/item/updated/'+id+'/')
        return response.data
    }
    // delete purchase_return item batch 
    const deletePurchaseReturnItemBatch = async (id) =>{
        const response = await axiosPrivate.delete('purchase/purchase_return/item/batch_qty/updated/'+id+'/')
        return response.data
    }

    
    return{
        //post
        postPurchaseReturn,
        postPurchaseReturnItem,
        postPurchaseReturnItemBatch,
        //put
        putPurchaseReturn,
        putPurchaseReturnItem,
        putPurchaseReturnItemBatch,
        //get
        getPurchaseReturn,
        getPurchaseReturnItem,
        getPurchaseReturnItemBatch,
        //delete
        deletePurchaseReturn,
        deletePurchaseReturnItem,
        deletePurchaseReturnItemBatch,
    }
}

export default usePurchaseReturnServices