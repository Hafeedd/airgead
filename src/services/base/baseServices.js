import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate";

export const useBaseServices = () => {
    const axios = useAxiosPrivate()

    const getDashBoard = async (params) => {
        const response = await axios.get("dashboard/accounts/dashboard/?activity_code=1454",{
            params: {params_day:params},
        });
        return response?.data;
    };

    const postIdConfiguration = async (data)=>{
        const response = await axios.post('id_configurations/',data)
        return response.data
    }
  
    const getIdConfiguration = async (data)=>{
        const response = await axios.get('id_configurations/')
        return response.data
    }

    return{
        getDashBoard,
        postIdConfiguration,
        getIdConfiguration
    };


}