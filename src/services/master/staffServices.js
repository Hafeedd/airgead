import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"

const useStaffServices = () =>{
    const axios = useAxiosPrivate()

    //get staff education
    const getStaffEducation = async () =>{
        const response = await axios.get('/master/education/create/')
        return response.data
    }
    
    //get staff profession
    const getStaffProfession = async () =>{
        const response = await axios.get('/master/profession/create/')
        return response.data
    }
   
    
    //get staff profession
    const getStaff = async () =>{
        const response = await axios.get('/master/staff/create/')
        return response.data
    }

    //post staff education
    const postStaffEducation = async (data) =>{
        const response = await axios.post('/master/education/create/',data)
        return response.data
    }
   
    //put staff education
    const putStaffEducation = async (id,data) =>{
        const response = await axios.put('/master/education/update/'+id+'/',data)
        return response.data
    }
    
    //post staff profession
    const postStaffProfession = async (data) =>{
        const response = await axios.post('/master/profession/create/',data)
        return response.data
    }
   
    //put staff profession
    const putStaffProfession = async (id,data) =>{
        const response = await axios.put('/master/profession/update/delete/'+id+'/',data)
        return response.data
    }
    
    //post staff
    const postStaff = async (data) =>{
        const response = await axios.post('/master/staff/create/',data)
        return response.data
    }
    //put staff
    const putStaff = async (id,data) =>{
        const response = await axios.put('/master/staff/update/'+id+'/',data)
        return response.data
    }
    
    //delete staff
    const deleteStaff = async (id) =>{
        const response = await axios.delete('/master/staff/update/'+id+'/')
        return response.data
    }
 
    //post staff payscale bulk upload
    const postStaffPayScale = async (data) =>{
        const response = await axios.post('/master/staff/staff_payscale_bulk/',data)
        return response.data
    }
    
    return{
        //get
        getStaffEducation,
        getStaffProfession,
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