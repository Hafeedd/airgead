import axios from "../../api/axios"

const useProductionServices = () =>{
    const postMaterialComposition = async(data) =>{
        const response = await axios.post('production/compositions/',data)
        return response.data
    }
    const getMaterialComposition = async() =>{
        const response = await axios.get('production/compositions/')
        return response.data
    }
    const putMaterialComposition =async(id,data)=>{
        const response = await axios.put(`production/composition/${id}/`,data)
        return response.data
    }
    const delMaterialComposition =async(id)=>{
        const response = await axios.delete(`production/composition/${id}/`)
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