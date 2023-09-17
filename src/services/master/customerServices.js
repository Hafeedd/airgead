import { axiosPrivate } from "../../api/axios"


const useCustomerServices = () => {

// POST Services--------------------------------------------------------------
    // Route
    const postRoute = async(data) =>{
        const response = await axiosPrivate.post('master/route/created/',data)
        return response.data
    }

    // City
    const postCity = async(data) =>{
        const response = await axiosPrivate.post('master/city/created/',data)
        return response.data
    } 

    // Town
    const postTown = async(data) =>{
        const response = await axiosPrivate.post('master/town/created/',data)
        return response.data
    }

    // District
    const postDistrict = async(data) =>{
        const response = await axiosPrivate.post('master/district/created/',data)
        return response.data
    }

    // rateType
    const postRateType = async(data) =>{
        const response = await axiosPrivate.post('master/rate_type/created/',data)
        return response.data
    }

    // types
    const postTypes = async(data) =>{
        const response = await axiosPrivate.post('master/types/created/',data)
        return response.data
    }

    // supplier
    const postSupplier = async(data) =>{
        const response = await axiosPrivate.post('master/supplier/created/',data)
        return response.data
    }
   
    // supplier
    const postBillType = async(data) =>{
        const response = await axiosPrivate.post('master/bill_types/created/',data)
        return response.data
    }

    // customer
    const postCustomer = async(data) =>{
        const response = await axiosPrivate.post('master/customer/created/',data)
        return response.data
    }

// GET Services------------------------------------------------------------------
    // route
    const getRoute = async() =>{
        const response = await axiosPrivate.get('master/route/created/')
        return response.data
    }

    // city
    const getCity = async() =>{
        const response = await axiosPrivate.get('master/city/created/')
        return response.data
    } 

    // town
    const getTown = async() =>{
        const response = await axiosPrivate.get('master/town/created/')
        return response.data
    }

    // district
    const getDistrict = async() =>{
        const response = await axiosPrivate.get('master/district/created/')
        return response.data
    }

    // district
    const getBillType = async() =>{
        const response = await axiosPrivate.get('master/bill_types/created/')
        return response.data
    }

    // rateType
    const getRateType = async() =>{
        const response = await axiosPrivate.get('master/rate_type/created/')
        return response.data
    }

    // types
    const getTypes = async() =>{
        const response = await axiosPrivate.get('master/types/created/')
        return response.data
    }

    // supplier
    const getSupplier = async() =>{
        const response = await axiosPrivate.get('master/supplier/created/')
        return response.data
    }

    // customer
    const getCustomer = async() =>{
        const response = await axiosPrivate.get('master/customer/created/')
        return response.data
    }

// put Services----------------------------------------------------------------------

    // rote
    const putRoute = async(id,data) =>{
        const response = await axiosPrivate.put(`master/route/updated/${id}/`,data)
        return response.data
    }

    // city
    const putCity = async(id,data) =>{
        const response = await axiosPrivate.put(`master/city/updated/${id}/`,data)
        return response.data
    }
    
    // town
    const putTown = async(id,data) =>{
        const response = await axiosPrivate.put(`master/town/updated/${id}/`,data)
        return response.data
    }
    
    // district
    const putDistrict = async(id,data) =>{
        const response = await axiosPrivate.put(`master/district/updated/${id}/`,data)
        return response.data
    }
    
    // rateType
    const putRateType = async(id,data) =>{
        const response = await axiosPrivate.put(`master/rate_type/updated/${id}/`,data)
        return response.data
    }
    
    // types
    const putTypes = async(id,data) =>{
        const response = await axiosPrivate.put(`master/rate_type/updated/${id}/`,data)
        return response.data
    }
    
    // supplier
    const putSupplier = async(id,data) =>{
        const response = await axiosPrivate.put(`master/supplier/updated/${id}/`,data)
        return response.data
    }
    
    // customer
    const putCustomer = async(id,data) =>{
        const response = await axiosPrivate.put(`master/customer/updated/${id}/`,data)
        return response.data
    }
// delete Services----------------------------------------------------------------------


    // route
    const deleteRoute = async(id) =>{
        const response = await axiosPrivate.delete(`master/route/updated/${id}/`)
        return response.data
    }

    // city
    const deleteCity = async(id) =>{
        const response = await axiosPrivate.delete(`master/city/updated/${id}/`)
        return response.data
    }
    
    // town
    const deleteTown = async(id) =>{
        const response = await axiosPrivate.delete(`master/town/updated/${id}/`)
        return response.data
    }
    
    // district
    const deleteDistrict = async(id) =>{
        const response = await axiosPrivate.delete(`master/district/updated/${id}/`)
        return response.data
    }
    
    // rateType
    const deleteRateType = async(id) =>{
        const response = await axiosPrivate.delete(`master/rate_type/updated/${id}/`)
        return response.data
    }
    
    // types
    const deleteTypes = async(id) =>{
        const response = await axiosPrivate.delete(`master/rate_type/updated/${id}/`)
        return response.data
    }
    
    // supplier
    const deleteSupplier = async(id) =>{
        const response = await axiosPrivate.delete(`master/supplier/updated/${id}/`)
        return response.data
    }
    
    // customer
    const deleteCustomer = async(id) =>{
        const response = await axiosPrivate.delete(`master/customer/updated/${id}/`)
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

    // put
    putRoute,
    putCity,
    putTown,
    putDistrict,
    putRateType,
    putTypes,
    putSupplier,
    putCustomer,

    // delete
    deleteRoute,
    deleteCity,
    deleteTown,
    deleteDistrict,
    deleteRateType,
    deleteTypes,
    deleteSupplier,
    deleteCustomer,

  }
}

export default useCustomerServices