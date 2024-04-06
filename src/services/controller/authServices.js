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
    try{
    const resp = await axiosPrivate.get("auth/verify/?permissions=yes");
    return resp.data;
    }catch(err){
      return {data:null,code:err?.code,error:err?.response?.error||err?.response?.errors}
    }
  };

  const postEmailConfig = async (data) => {
    const resp = await axiosPrivate.post("email_config/", data);
    return resp.data;
  };

  const getEmailConfig = async () => {
    const resp = await axiosPrivate.get("email_config/");
    return resp.data;
  };

  const getAccount = async (data, params) => {
    const resp = await axios.post("password/reset/get_account/", data, {
      params: params,
    });
    return resp.data;
  };

  const verifyAccount = async (data, params) => {
    const resp = await axios.post("password/reset/verify_account/", data, {
      params: params,
    });
    return resp.data;
  };

  const resetAccount = async (data, params) => {
    const resp = await axios.post("password/reset/", data, { params: params });
    return resp.data;
  };

  return {
    register,
    loginAuth,
    verifyUser,
    logoutAuth,
    checkController,
    getAccount,
    verifyAccount,
    resetAccount,
    postEmailConfig,
    getEmailConfig,
  };
};
