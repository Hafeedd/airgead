import axios, { axiosPrivate } from "../../api/axios";

const useItemServices = () =>{

    // api for adding new options

    // second name
    const postSecondName = async(data) =>{
        const response = await axiosPrivate.post('master/second_name/created/',data)
        return response.data
    }

    // second name
    const postType = async(data) =>{
        const response = await axiosPrivate.post('master/types/created/',data)
        return response.data
    }

    // second name
    const postCategory = async(data) =>{
        const response = await axiosPrivate.post('master/category/created/',data)
        return response.data
    }

    // second name
    const postSubCategory = async(data) =>{
        const response = await axiosPrivate.post('master/sub_category/created/',data)
        return response.data
    }

    // second name
    const postCompany = async(data) =>{
        const response = await axiosPrivate.post('master/company/created/',data)
        return response.data
    }

    // second name
    const postSize = async(data) =>{
        const response = await axiosPrivate.post('master/size/created/',data)
        return response.data
    }

    // second name
    const postColor = async(data) =>{
        const response = await axiosPrivate.post('master/color/created/',data)
        return response.data
    }

    // second name
    const postGroup = async(data) =>{
        const response = await axiosPrivate.post('master/group/created/',data)
        return response.data
    }

    // second name
    const postTaxGroup = async(data) =>{
        const response = await axiosPrivate.post('master/tax_group/created/',data)
        return response.data
    }

    // second name
    const postRack = async(data) =>{
        const response = await axiosPrivate.post('master/rack/created/',data)
        return response.data
    }

    // second name
    const postUnit = async(data) =>{
        const response = await axiosPrivate.post('master/unit/created/',data)
        return response.data
    }

    // second name
    const postBarcode = async(data) =>{
        const response = await axiosPrivate.post('master/barcode/created/',data)
        return response.data
    }
    // api for listing options

    // second name
    const getSecondName = async(data) =>{
        const response = await axiosPrivate.get('master/second_name/created/',data)
        return response.data
    }

    // second name
    const getType = async(data) =>{
        const response = await axiosPrivate.get('master/types/created/',data)
        return response.data
    }

    // second name
    const getCategory = async(data) =>{
        const response = await axiosPrivate.get('master/category/created/',data)
        return response.data
    }

    // second name
    const getSubCategory = async(data) =>{
        const response = await axiosPrivate.get('master/sub_category/created/',data)
        return response.data
    }

    // second name
    const getCompany = async(data) =>{
        const response = await axiosPrivate.get('master/company/created/',data)
        return response.data
    }

    // second name
    const getSize = async(data) =>{
        const response = await axiosPrivate.get('master/size/created/',data)
        return response.data
    }

    // second name
    const getColor = async(data) =>{
        const response = await axiosPrivate.get('master/color/created/',data)
        return response.data
    }

    // second name
    const getGroup = async(data) =>{
        const response = await axiosPrivate.get('master/group/created/',data)
        return response.data
    }

    // second name
    const getTaxGroup = async(data) =>{
        const response = await axiosPrivate.get('master/tax_group/created/',data)
        return response.data
    }

    // second name
    const getRack = async(data) =>{
        const response = await axiosPrivate.get('master/rack/created/',data)
        return response.data
    }

    // second name
    const getUnit = async(data) =>{
        const response = await axiosPrivate.get('master/unit/created/',data)
        return response.data
    }

    // second name
    const getBarcode = async(data) =>{
        const response = await axiosPrivate.get('master/barcode/created/',data)
        return response.data
    }

    // item adding
    const postItemAdd = async (data) =>{
        const response = await axiosPrivate.post('master/item/created/',data)
        return response.data
    }
 
    // item delete
    const deleteItem = async (id) =>{
        const response = await axiosPrivate.delete('master/item/updated/'+id+"/")
        return response.data
    }

    // item list
    const getItemList = async (data) =>{
        const response = await axiosPrivate.get('master/item/created/')
        return response.data
    }

    // item delete
    const deleteItemList = async (id) =>{
        const response = await axiosPrivate.delete('master/item/updated/'+id+'/')
        return response.data
    }

    //unit convertion

    // unit adding
    const postUnitConvertion = async (id,data) =>{
        const response = await axiosPrivate.post('master/unit_conversion/created/'+id+'/',data)
        return response.data
    }
    // unit conversion 
    // const getUnitConvertion = async (id,data) =>{
    //     const response = await axiosPrivate.post('master/unit_conversion/created/'+id+'/',data)
    //     return response.data
    // }

    return{
        postUnitConvertion,
        postItemAdd,
        postBarcode,
        postUnit,
        postRack,
        postTaxGroup,
        postGroup,
        postColor,
        postSize,
        postCompany,
        postSubCategory,
        postCategory,
        postType,
        postSecondName,
        getBarcode,
        getUnit,
        getRack,
        getTaxGroup,
        getGroup,
        getColor,
        getSize,
        getCompany,
        getSubCategory,
        getCategory,
        getType,
        getSecondName,
        getItemList,
        deleteItemList,
        deleteItem,
    }
    
}

export default useItemServices