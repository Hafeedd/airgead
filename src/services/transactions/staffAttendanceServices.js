import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"

const useStaffAttendanceServices = () => {
   const axios = useAxiosPrivate()

   const getAllStaffAttendance =async(data)=>{
    const response = await axios.get('master/staff/all_staffattendance/?activity_code=1418',{params:data})
    return response.data
   }
   const postBulkUploadAttendance = async(data)=>{
      const response = await axios.post(`master/staff/staff_attendance/bulk_upload/?activity_code=1443`,data)
      return response.data 
   }

   const postStaffAttendance = async(data,id)=>{
    const response = await axios.post(`master/staff/attendance/${id}/?activity_code=1419`,data)
    return response.data
   }
   const getStaffAttendance = async(id)=>{
    const response = await axios.put(`master/staff/attendence/create/update/${id}/?activity_code=1420`)
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