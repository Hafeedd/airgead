import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"

const useAccountServices = () => {
  const axios = useAxiosPrivate()
    
// POST Services--------------------------------------------------------------
  // Account Group
  const postAccountGroup = async(data) =>{
    const response = await axios.post('master/account_group/created/?activity_code=1432', data)
    return response.data
  }

  // Account Create
  const postAccountCreate = async(data) =>{
    const response = await axios.post('master/account/created/?activity_code=1083', data)
    return response.data
  }

    
// PUT Services--------------------------------------------------------------
  // Account Edit
  const putAccountEdit = async(id, data) =>{
    const response = await axios.put(`master/account/updated/${id}/?activity_code=1084`, data)
    return response.data
  }

  // Account Group Update
  const putAccountGroup = async(id, data) =>{
    const response = await axios.put(`master/account_group/updated/${id}/?activity_code=1434`, data)
    return response.data
  }

// GET Services--------------------------------------------------------------

  // Account Group
  const getAccountGroup = async() =>{
    const response = await axios.get('master/account_group/created/?activity_code=1431')
    return response.data
  }
 

  // Account List
  const getAccountList = async() =>{
    const response = await axios.get('master/account/created/?activity_code=1081')
    return response.data
  }

  // Account List
  const getAllAccountList = async() =>{
    const response = await axios.get('master/all_user/accounts') // activity_code ?
    return response.data
  }


// DELETE Services--------------------------------------------------------------
  // Account Group
  const deleteAccountGroup = async(id) =>{
    const response = await axios.delete(`master/account_group/updated/${id}/?activity_code=1435`)
    return response.data
  }
 
  // Account
  const deleteAccount = async(id) =>{
    const response = await axios.delete(`master/account/updated/${id}/?activity_code=1085`)
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
