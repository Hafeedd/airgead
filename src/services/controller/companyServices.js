import useAxios from "../../hooks/axios/useAxios";
import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate";

export const useCompanyServices = () => {
  const axiosPrivate = useAxiosPrivate();
  const axios = useAxios();

  // register company
  const companyRegister = async (data) => {
    const resp = await axiosPrivate.post("controller/company_register/", data,
    {headers:{'Content-Type': 'multipart/form-data'}});
    return resp.data;
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
    const resp = await axiosPrivate.put(`controller/company/${id}/`,data);
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

  return {
    postCompanyPlan,
    companyRegister,
    getCompanyList,
    getCompanyWithId,
    companyUpdate,
    postCompanyPermission,
  };
};
