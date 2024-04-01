import useAxios from "../../hooks/axios/useAxios";
import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate";
import { handleNetworkError } from "../ErrorHandler/errorHandler";

export const useAuthServices = () => {
  const axiosPrivate = useAxiosPrivate();
  const axios = useAxios();

  const register = async (data) => {
    const resp = await axios.post("controller/controller_register/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return resp.data;
  };

  const checkController = async () => {
    const resp = await axios.get("controller/controller_check/");
    return resp.data;
  };

  const loginAuth = async (data, params) => {
    const resp = await axios.post("auth/login/", data, { params: params });
    return resp.data;
  };
  const logoutAuth = async () => {
    const resp = await axiosPrivate.post("auth/logout/");
    return resp.data;
  };

  const verifyUser = async () => {
    // try{
    const resp = await axiosPrivate.get("auth/verify/?permissions=yes");
    return resp.data;
    // }catch(err){
    //     handleNetworkError(err)
    // }
  };

  const postEmailConfig = async (data) => {
    const resp = await axiosPrivate.post("email_config/", data);
    return resp.data;
  };

  const getEmailConfig = async () => {    
    const resp = await axiosPrivate.get("email_config/");
    return resp.data;
  };

  return {
    register,
    loginAuth,
    verifyUser,
    logoutAuth,
    checkController,
    postEmailConfig,
    getEmailConfig,
  };
};
