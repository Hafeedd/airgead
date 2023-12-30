import { axiosPrivate } from "../../api/axios"

const useStaffAttendanceServices = () => {
   const getAllStaffAttendance =async(data)=>{
    const response = await axiosPrivate.get('master/staff/all_staffattendance/',data)
    return response.data
   }
   const postBulkUploadAttendance = async(data)=>{
      const response = await axiosPrivate.post(`master/staff/staff_attendance/bulk_upload/`,data)
      return response.data 
   }

   const postStaffAttendance = async(data,id)=>{
    const response = await axiosPrivate.post(`master/staff/attendance/${id}/`,data)
    return response.data
   }
   const getStaffAttendance = async(id)=>{
    const response = await axiosPrivate.put(`master/staff/attendence/create/update/${id}/`)
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