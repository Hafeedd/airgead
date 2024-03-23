import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"


const useCustomerServices = () => {
    const axios = useAxiosPrivate()

// POST Services--------------------------------------------------------------
    // Route
    const postRoute = async(data) =>{
        const response = await axios.post('master/route/created/',data)
        return response.data
    }

    // City
    const postCity = async(data) =>{
        const response = await axios.post('master/city/created/',data)
        return response.data
    } 

    // Town
    const postTown = async(data) =>{
        const response = await axios.post('master/town/created/',data)
        return response.data
    }

    // District
    const postDistrict = async(data) =>{
        const response = await axios.post('master/district/created/',data)
        return response.data
    }

    // rateType
    const postRateType = async(data) =>{
        const response = await axios.post('master/rate_type/created/',data)
        return response.data
    }

    // types
    const postTypes = async(data) =>{
        const response = await axios.post('master/types/created/',data)
        return response.data
    }

    // supplier
    const postSupplier = async(data) =>{
        const response = await axios.post('master/supplier/created/?activity_code=1145',data)
        return response.data
    }
   
    // supplier
    const postBillType = async(data) =>{
        const response = await axios.post('master/bill_types/created/',data)
        return response.data
    }

    // customer
    const postCustomer = async(data) =>{
        const response = await axios.post('master/customer/created/?activity_code=1096',data)
        return response.data
    }

// GET Services------------------------------------------------------------------
    // route
    const getRoute = async() =>{
        const response = await axios.get('master/route/created/')
        return response.data
    }

    // city
    const getCity = async() =>{
        const response = await axios.get('master/city/created/')
        return response.data
    } 

    // town
    const getTown = async() =>{
        const response = await axios.get('master/town/created/')
        return response.data
    }

    // district
    const getDistrict = async() =>{
        const response = await axios.get('master/district/created/')
        return response.data
    }

    // district
    const getBillType = async() =>{
        const response = await axios.get('master/bill_types/created/')
        return response.data
    }

    // rateType
    const getRateType = async() =>{
        const response = await axios.get('master/rate_type/created/')
        return response.data
    }

    // types
    const getTypes = async() =>{
        const response = await axios.get('master/types/created/')
        return response.data
    }

    // supplier
    const getSupplier = async(data) =>{
        const response = await axios.get('master/supplier/created/?activity_code=1143',{params:{data}})
        return response.data
    }

    // customer
    const getCustomer = async(data) =>{
        const response = await axios.get('master/customer/created/?activity_code=1094',{params:{...data}})
        return response.data
    }

// put Services----------------------------------------------------------------------

    // rote
    const putRoute = async(id,data) =>{
        const response = await axios.put(`master/route/updated/${id}/`,data)
        return response.data
    }

    // city
    const putCity = async(id,data) =>{
        const response = await axios.put(`master/city/updated/${id}/`,data)
        return response.data
    }
    
    // town
    const putTown = async(id,data) =>{
        const response = await axios.put(`master/town/updated/${id}/`,data)
        return response.data
    }
    
    // district
    const putDistrict = async(id,data) =>{
        const response = await axios.put(`master/district/updated/${id}/`,data)
        return response.data
    }
    
    // rateType
    const putRateType = async(id,data) =>{
        const response = await axios.put(`master/rate_type/updated/${id}/`,data)
        return response.data
    }
    
    // types
    const putTypes = async(id,data) =>{
        const response = await axios.put(`master/rate_type/updated/${id}/`,data)
        return response.data
    }
    
    // supplier
    const putSupplier = async(id,data) =>{
        const response = await axios.put(`master/supplier/updated/${id}/?activity_code=1146`,data)
        return response.data
    }
    
    // customer
    const putCustomer = async(id,data) =>{
        const response = await axios.put(`master/customer/updated/${id}/?activity_code=1097`,data)
        return response.data
    }
// delete Services----------------------------------------------------------------------


    // route
    const deleteRoute = async(id) =>{
        const response = await axios.delete(`master/route/updated/${id}/`)
        return response.data
    }

    // city
    const deleteCity = async(id) =>{
        const response = await axios.delete(`master/city/updated/${id}/`)
        return response.data
    }
    
    // town
    const deleteTown = async(id) =>{
        const response = await axios.delete(`master/town/updated/${id}/`)
        return response.data
    }
    
    // district
    const deleteDistrict = async(id) =>{
        const response = await axios.delete(`master/district/updated/${id}/`)
        return response.data
    }
    
    // rateType
    const deleteRateType = async(id) =>{
        const response = await axios.delete(`master/rate_type/updated/${id}/`)
        return response.data
    }
    
    // types
    const deleteTypes = async(id) =>{
        const response = await axios.delete(`master/rate_type/updated/${id}/`)
        return response.data
    }
    
    // supplier
    const deleteSupplier = async(id) =>{
        const response = await axios.delete(`master/supplier/updated/${id}/?activity_code=1147`)
        return response.data
    }
    
    // customer
    const deleteCustomer = async(id) =>{
        const response = await axios.delete(`master/customer/updated/${id}/?activity_code=1098`)
        return response.data
    }

    // set_rates create get
    const postSetRate = async(id,data) =>{
        const response = await axios.post(`master/set_rate/created/${id}/`,data)
        return response.data
    }
    const getSetRate = async(id) =>{
        const response = await axios.get(`master/set_rate/created/${id}/`)
        return response.data
    }

    // set_rates update delete 
    const putSetRate = async(id,data) =>{
        const response = await axios.put(`master/set_rate/updated/${id}/`,data)
        return response.data
    }
    const deleteSetRate = async(id) =>{
        const response = await axios.delete(`master/set_rate/updated/${id}/`)
        return response.data
    }

  return{
    // post
    postBillType,
    postRoute,
    postCity,
    postTown,
    postDistrict,
    postRateType,
    postTypes,
    postSupplier,
    postCustomer,
    postSetRate,

    // get
    getBillType,
    getRoute,
    getCity,
    getTown,
    getDistrict,
    getRateType,
    getTypes,
    getSupplier,
    getCustomer,
    getSetRate,

    // put
    putRoute,
    putCity,
    putTown,
    putDistrict,
    putRateType,
    putTypes,
    putSupplier,
    putCustomer,
    putSetRate,

    // delete
    deleteRoute,
    deleteCity,
    deleteTown,
    deleteDistrict,
    deleteRateType,
    deleteTypes,
    deleteSupplier,
    deleteCustomer,
    deleteSetRate,
  }
}

export default useCustomerServices