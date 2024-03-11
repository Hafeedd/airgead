import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"

const usePurchaseServices = () => {
    const axios = useAxiosPrivate()

    //post requests =================================

    // post full purchase data 
    const postPurchase = async (data) =>{
        const response = await axios.post('purchase/purchase/created/',data)
        return response.data
    }

    //put requests ==================================

    // update full purchase data
    const putPurchase = async (id,data) =>{
        const response = await axios.put('purchase/purchase/updated/'+id+'/',data)
        return response.data
    }

    //get requests ===================================

    // get all purchase data
    const getPurchase = async (id) =>{
        const response = await axios.get('purchase/purchase/created/')
        return response.data
    }
    // get all purchase data
    const getPurchaseList = async (id) =>{
        const response = await axios.get('purchase/purchase/code/')
        return response.data
    }
    // get all purchase data
    const getPurchaseWithId = async (id) =>{
        const response = await axios.get('purchase/purchase/updated/'+id+'/')
        return response.data
    }

    //delete requests ===================================

    // get all purchase data
    const deletePurchase = async (id) =>{
        const response = await axios.delete('purchase/purchase/updated/'+id+"/")
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
        getPurchase,
        //delete
        deletePurchase,
    }
}

export default usePurchaseServices