import { axiosPrivate } from "../../api/axios"

const useStaffAttendanceServices = () => {
   const getAllStaffAttendance =async(data)=>{
    const response = await axiosPrivate.get('master/staff/all_staffattendance/',data)
    return response.data
   }
   const postStaffAttendance = async(data,id)=>{
    const response = await axiosPrivate.post(`master/staff/attendence/create/update/${id}/`,data)
    return response.data
   }
   const putStaffAttendance = async(data,id)=>{
    const response = await axiosPrivate.put(`master/staff/attendence/create/update/${id}/`,data)
    return response.data
   }
   return {
    getAllStaffAttendance,
    postStaffAttendance,
    putStaffAttendance,
   }
}
export default useStaffAttendanceServices