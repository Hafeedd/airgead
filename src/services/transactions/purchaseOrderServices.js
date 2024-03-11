import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"

const usePurchaseOrderServices = () => {
    const axios = useAxiosPrivate()

    //post requests =================================

    // post full purchase data 
    const postPurchaseOrder = async (data) =>{
        const response = await axios.post('purchase/purchase_order/created/',data)
        return response.data
    }

    //put requests ==================================

    // update full purchase data
    const putPurchaseOrder = async (id,data) =>{
        const response = await axios.put('purchase/purchase_order/updated/'+id+'/',data)
        return response.data
    }

    //get requests ===================================

    // get all purchase data
    const getPurchaseOrderList = async () =>{
        const response = await axios.get('purchase/purchase_order/code/')
        return response.data
    }
    
    // get all purchase data with id
    const getPurchaseOrderWithId = async (id) =>{
        const response = await axios.get('purchase/purchase_order/updated/'+id+'/')
        return response.data
    }

    //delete requests ===================================

    // delete purchaseOrder data
    const deletePurchaseOrder = async (id) =>{
        const response = await axios.delete('purchase_order/updated/'+id+"/")
        return response.data
    }
 

    
    return{
        //post
        postPurchaseOrder,
        //put
        putPurchaseOrder,
        //get
        getPurchaseOrderList,
        getPurchaseOrderWithId,
        //delete
        deletePurchaseOrder,
    }
}

export default usePurchaseOrderServices