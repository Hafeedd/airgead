 import { axiosPrivate } from "../../api/axios"

const useAccountServices = () => {
    
// POST Services--------------------------------------------------------------
  // Account Group
  const postAccountGroup = async(data) =>{
    const response = await axiosPrivate.post('master/account_group/created/', data)
    return response.data
  }

  // Account Ceate
  const postAccountCreate = async(data) =>{
    const response = await axiosPrivate.post('master/account/created/', data)
    return response.data
  }

    
// PUT Services--------------------------------------------------------------
  // Account Edit
  const putAccountEdit = async(id, data) =>{
    const response = await axiosPrivate.put(`master/account/updated/${id}/`, data)
    return response.data
  }


// GET Services--------------------------------------------------------------

  // Account Group
  const getAccountGroup = async() =>{
    const response = await axiosPrivate.get('master/account_group/created/')
    return response.data
  }

  // Account List
  const getAccountList = async() =>{
    const response = await axiosPrivate.get('master/account/created/')
    return response.data
  }

  // Account List
  const getAllAccountList = async() =>{
    const response = await axiosPrivate.get('master/all_user/accounts')
    return response.data
  }


// DELETE Services--------------------------------------------------------------
  // Account Group
  const deleteAccountGroup = async(id) =>{
    const response = await axiosPrivate.delete(`master/account_group/updated/${id}/`)
    return response.data
  }

  return {
    // POST APIS
    postAccountGroup,
    postAccountCreate,

    // PUT APIS
    putAccountEdit,

    // GET APIS
    getAllAccountList,
    getAccountGroup,
    getAccountList,
    
    // DELETE APIS
    deleteAccountGroup,
  }
}

export default useAccountServices
