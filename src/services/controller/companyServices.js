import useAxios from "../../hooks/axios/useAxios";
import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate";
import { handleNetworkError } from "../ErrorHandler/errorHandler";

export const useCompanyServices = () => {
  const axiosPrivate = useAxiosPrivate();
  const axios = useAxios();

  // register company
  const companyRegister = async (data) => {
    // try{
      const resp = await axiosPrivate.post("controller/company_register/", data,
      {headers:{'Content-Type': 'multipart/form-data'}});
      return resp.data;
    // }catch(err){
    //   console.log(err)
    //   handleNetworkError(err)
    // }
  };
  // get company List
  const getCompanyList = async () => {
    const resp = await axiosPrivate.get("controller/company/list/");
    return resp.data;
  };
  // get company full detials
  const getCompanyWithId = async (id) => {
    const resp = await axiosPrivate.get(`controller/company/${id}/`);
    return resp.data;
  };
  
  // update company detials
  const companyUpdate = async (id,data) => {
    const resp = await axiosPrivate.put(`controller/company/${id}/`,data,
    {headers:{'Content-Type': 'multipart/form-data'}});
    return resp.data;
  };

  // set company plan
  const postCompanyPlan = async (id,data) => {
    const resp = await axiosPrivate.post(`controller/company/${id}/plan_details/`, data);
    return resp.data;
  };
  // set company permission
  const postCompanyPermission = async (id,data) => {
    const resp = await axiosPrivate.post(`controller/company/${id}/permissions/`, data);
    return resp.data;
  };
  // delete company
  const deleteCompanyForController = async (id,data) => {
    const resp = await axiosPrivate.post(`controller/company/delete/${id}/`,data);
    return resp.data;
  };
  
  // set company permission
  const companyActiveDeactive = async (id) => {
    const resp = await axiosPrivate.post(`controller/company/${id}/activation_status/`);
    return resp.data;
  };
 
  // set company role creation
  const postCompanyRole = async (data) => {
    const resp = await axiosPrivate.post(`company/roles/`,data);
    return resp.data;
  };
  // get company role creation
  const getCompanyRole = async () => {
    const resp = await axiosPrivate.get(`company/roles/`);
    return resp.data;
  };
  // update company role creation
  const putCompanyRole = async (id,data) => {
    const resp = await axiosPrivate.get(`company/role/${id}/`,data);
    return resp.data;
  };

  return {
    postCompanyPlan,
    companyRegister,
    getCompanyList,
    getCompanyWithId,
    companyUpdate,
    postCompanyRole,
    postCompanyPermission,
    companyActiveDeactive,
    deleteCompanyForController,
    getCompanyRole,
    putCompanyRole,
  };
};
