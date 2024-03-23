import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate";


const useBaseServices = () => {
  const axios = useAxiosPrivate()
 
  const getAccOpClBalance = async (id) => {
    const res = await axios.get("/master/open_and_close/balance/" + id + "/");
    return res.data;
  };

  const getCodeIdList = async () => {
    const res = await axios.get("/master/code_configurations/types/?activity_code=1444/");
    return res.data;
  };

  return {
    getAccOpClBalance,
    getCodeIdList,
  };
};

export default useBaseServices;
