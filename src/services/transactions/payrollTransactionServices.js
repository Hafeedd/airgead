import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"

export const usePayrollTransactionServices = ()=>{
    const axios = useAxiosPrivate()

    const getAllStaffPayroll = async(params)=>{
        const response = await axios.get('/master/staff/staff_payroll/?activity_code=1421',{params:{...params}})
        return response?.data
    }
    
    const getPayRollBulk = async(params)=>{
        const response = await axios.get('/master/staff/staffpayroll/bulk/?activity_code=1446',{params:{...params}})
        return response?.data
    }
    const postPayRollBulk = async(data)=>{
        const response = await axios.post('/master/staff/staffpayroll/bulk/?activity_code=1422',data)
        return response?.data
    }
    const putPayRollBulk = async(data)=>{
        const response = await axios.put('/master/staff/staffpayroll/bulk/?activity_code=1423',data)
        return response?.data
    }
    const getPayRollList = async(params)=>{
        const response = await axios.get('/master/staff/payroll/list/?activity_code=1447',{params:{document_no:params}})
        return response?.data
    }

    const delPayRollList = async(params)=>{
        const response = await axios.delete('/master/staff/payroll/list/?activity_code=1424',{params:{document_no:params}})
        return response?.data
    }
    return{
        getAllStaffPayroll,
        postPayRollBulk,
        getPayRollBulk,
        getPayRollList,
        delPayRollList,
        putPayRollBulk,
    }
}