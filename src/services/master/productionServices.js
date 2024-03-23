import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"

const useProductionServices = () =>{
    const axios = useAxiosPrivate()

    const postMaterialComposition = async(data) =>{
        const response = await axios.post('production/compositions/?activity_code=1363',data)
        return response.data
    }
    const getMaterialComposition = async() =>{
        const response = await axios.get('production/compositions/?activity_code=1455')
        return response.data
    }
    const putMaterialComposition =async(id,data)=>{
        const response = await axios.put(`production/composition/${id}/?activity_code=1364`,data)
        return response.data
    }
    const delMaterialComposition =async(id)=>{
        const response = await axios.delete(`production/composition/${id}/?activity_code=1365`)
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