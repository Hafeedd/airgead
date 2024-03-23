import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"

const useOpenStockServices = () =>{
    const axios = useAxiosPrivate()
    
    //get open stock
    const getOpenStock = async (params) =>{
        const response = await axios.get("/master/items/opening_stock/?activity_code=1160",{params:params})
        return response.data 
    }
    
    //update open stock
    const putOpenStock = async (data) =>{
        const response = await axios.put("/master/items/opening_stock/?activity_code=1161",{items_list:data})
        return response.data 
    }

    return{
        putOpenStock,
        getOpenStock
    }
}

export default useOpenStockServices