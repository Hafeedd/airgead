import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate";
// import { handleNetworkError } from "../ErrorHandler/errorHandler";

export const useUserServices = () => {
  const axiosPrivate = useAxiosPrivate();

  const getUserList = async () => {
    const resp = await axiosPrivate.get("company/user/register/");
    return resp.data;
  };

  const postUserAdd = async (data) => {
    const resp = await axiosPrivate.post("company/user/register/",data,{headers:{'Content-Type': 'multipart/form-data'}});
    return resp.data;
  };

  
  const putUserAdd = async (id,data) => {
    const resp = await axiosPrivate.put(`company/user/${id}/`,data,{headers:{'Content-Type': 'multipart/form-data'}});
    return resp.data;
  };


  const delUserAdd = async(id)=>{
    const resp = await axiosPrivate.delete(`company/user/${id}/`);
    return resp.data;
  }

  const userActiveDeactive = async (id) => {
    const resp = await axiosPrivate.post(`company/user/activation/${id}/`);
    return resp.data;
  };

  const getUserRoles = async() =>{
    const resp = await axiosPrivate.get("company/roles/");
    return resp.data;
  }

  const getUserProfile = async()=>{
    const resp = await axiosPrivate.get('company/user/profile/');
    return resp.data;
  }

  const postSetPassword = async(data)=>{
    const resp = await axiosPrivate.post('company/user/password/change/',data);
    return resp.data;
  }

  const postSecurityQuestions = async(data)=>{
    const resp = await axiosPrivate.post('/security_questions/',data);
    return resp.data;
  }

  const getSecurityQuestions = async()=>{
    const resp = await axiosPrivate.get('/security_questions/');
    return resp.data;
  }

  const putUserProfile = async(data)=>{
    const resp = await axiosPrivate.put('company/user/profile/',data,{headers:{'Content-Type': 'multipart/form-data'}});
    return resp.data;
  }

  const putCompanyDetails = async(data)=>{
    const resp = await axiosPrivate.put('company/update/',data,{headers:{'Content-Type': 'multipart/form-data'}});
    return resp.data;
  }
  return {
    getUserList,
    postUserAdd,
    userActiveDeactive,
    getUserRoles,
    putUserAdd,
    delUserAdd,
    getUserProfile,
    postSetPassword,
    postSecurityQuestions,
    getSecurityQuestions,
    putUserProfile,
    putCompanyDetails,
  };
}
