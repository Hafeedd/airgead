import axios from "../../api/axios";

const useBaseServices = () => {
  const getAccOpClBalance = async (id) => {
    const res = await axios.get("/master/open_and_close/balance/" + id + "/");
    return res.data;
  };

  return {
    getAccOpClBalance,
  };
};

export default useBaseServices;
