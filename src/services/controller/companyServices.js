import useAxios from "../../hooks/axios/useAxios";
import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate";
import { handleNetworkError } from "../ErrorHandler/errorHandler";

export const useCompanyServices = () => {
  const axiosPrivate = useAxiosPrivate();
  const axios = useAxios();

  // register company
  const companyRegister = async (data) => {
    try{
      const resp = await axiosPrivate.post("controller/company_register/", data,
      {headers:{'Content-Type': 'multipart/form-data'}});
      return resp.data;
    }catch(err){
      console.log(err)
      handleNetworkError(err)
    }
  };
  // get company
  const getCompanyRegister = async (data) => {
    const resp = await axiosPrivate.get("controller/company_register/", data);
    return resp.data;
  };
  // set company plan
  const postCompanyPlan = async (id,data) => {
    const resp = await axiosPrivate.post(`controller/company/${id}/plan_details/`, data);
    return resp.data;
  };

  return {
    postCompanyPlan,
    companyRegister,
    getCompanyRegister,
  };
};
