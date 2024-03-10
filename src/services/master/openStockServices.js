import axios from "../../api/axios"

const useOpenStockServices = () =>{

    //get open stock
    const getOpenStock = async (params) =>{
        const response = await axios.get("/master/items/opening_stock/",{params:params})
        return response.data 
    }
    
    //update open stock
    const putOpenStock = async (data) =>{
        const response = await axios.put("/master/items/opening_stock/",{items_list:data})
        return response.data 
    }

    return{
        putOpenStock,
        getOpenStock
    }
}

export default useOpenStockServices