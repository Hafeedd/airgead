import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate";

export const useBaseServices = () => {
    const axios = useAxiosPrivate()

    const getDashBoard = async (params) => {
        const response = await axios.get("dashboard/accounts/dashboard/?activity_code=1454",{
            params: {params_day:params},
        });
        return response?.data;
    };

    return{
        getDashBoard,
    };


}