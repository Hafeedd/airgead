import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"

const useStaffAttendanceServices = () => {
   const axios = useAxiosPrivate()

   const getAllStaffAttendance =async(data)=>{
    const response = await axios.get('master/staff/all_staffattendance/',{params:data})
    return response.data
   }
   const postBulkUploadAttendance = async(data)=>{
      const response = await axios.post(`master/staff/staff_attendance/bulk_upload/`,data)
      return response.data 
   }

   const postStaffAttendance = async(data,id)=>{
    const response = await axios.post(`master/staff/attendance/${id}/`,data)
    return response.data
   }
   const getStaffAttendance = async(id)=>{
    const response = await axios.put(`master/staff/attendence/create/update/${id}/`)
    return response.data
   }
   return {
    getAllStaffAttendance,
    postStaffAttendance,
    getStaffAttendance,
    postBulkUploadAttendance,
   }
}
export default useStaffAttendanceServices