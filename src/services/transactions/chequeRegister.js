import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"

const useChequeRegister = () => {
    const axios = useAxiosPrivate()

    //get cheque register
    const getChequeRegister = async(params) =>{
        const response = await axios.get('/transactions/check_register/created/?activity_code=1309', {params:params})
        return response.data
    }

    //post cheque register
    const postChequeRegister = async(data) =>{
        const response = await axios.post('/transactions/check_register/created/?activity_code=1310',data)
        return response.data
    }

    //put cheque register
    const putChequeRegister = async(id, data) =>{
        const response = await axios.put(`/transactions/check_register/update/${id}/?activity_code=1311`,data)
        return response.data
    }

    //put cheque register
    const putChequeRegisterReport = async(id, data) =>{
        const response = await axios.put(`/transactions/check_register/update_report/${id}/?activity_code=1351`,data)
        return response.data
    }

    //del cheque register
    const delChequeRegister = async(id, data) =>{
        const response = await axios.delete(`/transactions/check_register/update/${id}/?activity_code=1312`,data)
        return response.data
    }

    return{
        //post
        postChequeRegister,
        getChequeRegister,
        putChequeRegister,
        delChequeRegister,
        putChequeRegisterReport
    }
}

export default useChequeRegister;