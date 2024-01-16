import { axiosPrivate } from "../../api/axios"

const useProductionServices = () =>{
    const postMaterialComposition = async(data) =>{
        const response = await axiosPrivate.post('production/compositions/',data)
        return response.data
    }
    const getMaterialComposition = async() =>{
        const response = await axiosPrivate.get('production/compositions/')
        return response.data
    }
    const putMaterialComposition =async(id,data)=>{
        const response = await axiosPrivate.put(`production/composition/${id}/`,data)
        return response.data
    }
    const delMaterialComposition =async(id)=>{
        const response = await axiosPrivate.delete(`production/composition/${id}/`)
        return response.data
    }
    return{
        // post
        postMaterialComposition,
        //get
        getMaterialComposition,
        //del
        delMaterialComposition,
        //put
        putMaterialComposition,
    }
}

export default useProductionServices