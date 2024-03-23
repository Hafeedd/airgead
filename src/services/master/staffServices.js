import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"

const useStaffServices = () =>{
    const axios = useAxiosPrivate()

    //get staff education 
    //not using
    const getStaffEducation = async () =>{
        const response = await axios.get('/master/education/create/')
        return response.data
    }
    
    //get staff profession
    //not using
    const getStaffProfession = async () =>{
        const response = await axios.get('/master/profession/create/')
        return response.data
    }
   
    
    //get staff detail
    const getStaff = async () =>{
        const response = await axios.get('/master/staff/create/?activity_code=1315')
        return response.data
    }

    //post staff education
    const postStaffEducation = async (data) =>{
        const response = await axios.post('/master/education/create/?activity_code=1448',data)
        return response.data
    }
   
    //put staff education
    const putStaffEducation = async (id,data) =>{
        const response = await axios.put(`/master/education/update/${id}/?activity_code=1449`,data)
        return response.data
    }
    
    //post staff profession
    const postStaffProfession = async (data) =>{
        const response = await axios.post('/master/profession/create/?activity_code=1451',data)
        return response.data
    }
   
    //put staff profession
    const putStaffProfession = async (id,data) =>{
        const response = await axios.put(`/master/profession/update/delete/${id}/?activity_code=1452`,data)
        return response.data
    }
    
    //post staff
    const postStaff = async (data) =>{
        const response = await axios.post('/master/staff/create/?activity_code=1317',data)
        return response.data
    }
    //put staff
    const putStaff = async (id,data) =>{
        const response = await axios.put(`/master/staff/update/${id}/?activity_code=1318`,data)
        return response.data
    }
    
    //delete staff
    const deleteStaff = async (id) =>{
        const response = await axios.delete(`/master/staff/update/${id}/?activity_code=1319`)
        return response.data
    }
 
    //post staff payscale bulk upload
    const postStaffPayScale = async (data) =>{
        const response = await axios.post('/master/staff/staff_payscale_bulk/?activity_code=1340',data)
        return response.data
    }
    
    return{
        //get
        getStaffEducation, // not implemented
        getStaffProfession,// not implemented
        getStaff,

        //post
        postStaffPayScale,
        postStaffEducation,
        postStaffProfession,
        postStaff,

        //put
        putStaffProfession,
        putStaffEducation,
        putStaff,

        //delete
        deleteStaff,
    }
}

export default useStaffServices