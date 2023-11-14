import { axiosPrivate } from "../../api/axios"

const useOpenStockServices = () =>{

    //get open stock
    const getOpenStock = async (params) =>{
        const response = await axiosPrivate.get("/master/items/opening_stock/",{params:params})
        return response.data 
    }
    
    //update open stock
    const putOpenStock = async (data) =>{
        const response = await axiosPrivate.put("/master/items/opening_stock/",{items_list:data})
        return response.data 
    }

    return{
        putOpenStock,
        getOpenStock
    }
}

export default useOpenStockServices