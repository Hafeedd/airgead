import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"


const useSalesServices = () => {
    const axios = useAxiosPrivate()

    // post sales
    const postSales = async(data) =>{
        const response = await axios.post('/sales/sales_master/created/',data)
        return response.data
    }
    
    // get sales
    const getSales = async() =>{
        const response = await axios.get('/sales/sales_master/created/')
        return response.data
    }

    // get sales code date customer and net-amount
    const getSalesList = async() =>{
        const response = await axios.get('/sales/sales_master/code/')
        return response.data
    }
    // get sales id
    const getSalesWithId = async(id) =>{
        const response = await axios.get('/sales/sales_master/updated/'+id+'/')
        return response.data
    }
    
    //put sales
    const putSales = async(id,data) =>{
        const response = await axios.put('/sales/sales_master/updated/'+id+'/',data)
        return response.data
    }
    
    //delete sales item
    const deleteSales = async(id) =>{
        const response = await axios.delete('/sales/sales_master/updated/'+id+'/')
        return response.data
    }
    

    // get code -----------------------------------------------------------------------

    const getCodeWithBillType = async()=>{
        const response = await axios.get('/sales/sales_billcode/created/')
        return response.data
    }

    // get all accounts of users only 
    const getAllUserAc = async (id) =>{
        const response = await axios.get('/master/all_user/accounts/')
        return response.data
    }

    return{
        //get
        getAllUserAc,
        getCodeWithBillType,
        getSalesList,
        getSalesWithId,
        getSales,
        //post
        postSales,
        //put
        putSales,
        //delete
        deleteSales,

        
    }
}

export default useSalesServices;