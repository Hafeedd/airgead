import { axiosPrivate } from "../../api/axios"

const usePurchaseOrderServices = () => {

    //post requests =================================

    // post full purchase data 
    const postPurchaseOrder = async (data) =>{
        const response = await axiosPrivate.post('purchase/purchase_order/created/',data)
        return response.data
    }

    //put requests ==================================

    // update full purchase data
    const putPurchaseOrder = async (id,data) =>{
        const response = await axiosPrivate.put('purchase/purchase_order/updated/'+id+'/',data)
        return response.data
    }

    //get requests ===================================

    // get all purchase data
    const getPurchaseOrder = async () =>{
        const response = await axiosPrivate.get('purchase/purchase_order/created/')
        return response.data
    }

    // get all purchase data
    const getPurchaseOrderDoc = async () =>{
        const response = await axiosPrivate.get('purchase/purchase_order/code/')
        return response.data
    }
    
    // get all purchase data with id
    const getPurchaseOrderWithId = async (id) =>{
        const response = await axiosPrivate.get('purchase/purchase_order/updated/'+id+'/')
        return response.data
    }

    //delete requests ===================================

    // delete purchaseOrder data
    const deletePurchaseOrder = async (id) =>{
        const response = await axiosPrivate.delete('purchase_order/updated/'+id+"/")
        return response.data
    }
 

    
    return{
        //post
        postPurchaseOrder,
        //put
        putPurchaseOrder,
        //get
        getPurchaseOrder,
        getPurchaseOrderDoc,
        getPurchaseOrderWithId,
        //delete
        deletePurchaseOrder,
    }
}

export default usePurchaseOrderServices