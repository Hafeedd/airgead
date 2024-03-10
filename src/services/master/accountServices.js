 import axios from "../../api/axios"

const useAccountServices = () => {
    
// POST Services--------------------------------------------------------------
  // Account Group
  const postAccountGroup = async(data) =>{
    const response = await axios.post('master/account_group/created/', data)
    return response.data
  }

  // Account Ceate
  const postAccountCreate = async(data) =>{
    const response = await axios.post('master/account/created/', data)
    return response.data
  }

    
// PUT Services--------------------------------------------------------------
  // Account Edit
  const putAccountEdit = async(id, data) =>{
    const response = await axios.put(`master/account/updated/${id}/`, data)
    return response.data
  }

  // Account Group Update
  const putAccountGroup = async(id, data) =>{
    const response = await axios.put(`master/account_group/updated/${id}/`, data)
    return response.data
  }

// GET Services--------------------------------------------------------------

  // Account Group
  const getAccountGroup = async() =>{
    const response = await axios.get('master/account_group/created/')
    return response.data
  }
 

  // Account List
  const getAccountList = async() =>{
    const response = await axios.get('master/account/created/')
    return response.data
  }

  // Account List
  const getAllAccountList = async() =>{
    const response = await axios.get('master/all_user/accounts')
    return response.data
  }


// DELETE Services--------------------------------------------------------------
  // Account Group
  const deleteAccountGroup = async(id) =>{
    const response = await axios.delete(`master/account_group/updated/${id}/`)
    return response.data
  }
 
  // Account
  const deleteAccount = async(id) =>{
    const response = await axios.delete(`master/account/updated/${id}/`)
    return response.data
  }

  return {
    // POST APIS
    postAccountGroup,
    postAccountCreate,

    // PUT APIS
    putAccountEdit,
    putAccountGroup,

    // GET APIS
    getAllAccountList,
    getAccountGroup,
    getAccountList,
    
    // DELETE APIS
    deleteAccountGroup,
    deleteAccount,
  }
}

export default useAccountServices
