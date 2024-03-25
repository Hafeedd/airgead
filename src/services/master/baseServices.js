import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate";


const useBaseServices = () => {
  const axios = useAxiosPrivate()
 
  const getAccOpClBalance = async (id) => {
    const res = await axios.get("/master/open_and_close/balance/" + id + "/");
    return res.data;
  };

  const getCodeIdList = async () => {
    const res = await axios.get("/master/code_configurations/types/?activity_code=1444");
    return res.data;
  };

  const postCode = async (data) => {
    const res = await axios.post("/master/code/created/?activity_code=1445",data);
    return res.data;
  };

  const updateCode = async (id,data) => {
    const res = await axios.post(`/master/code/updated/${id}/?activity_code=1445`,data);
    return res.data;
  };

  return {
    getAccOpClBalance,
    getCodeIdList,
    postCode,
    updateCode
  };
};

export default useBaseServices;
