import { axiosPrivate } from "../../api/axios"

const useChequeRegister = () => {

    //get cheque register
    const getChequeRegister = async(params) =>{
        const response = await axiosPrivate.get('/transactions/check_register/created/', {params:params})
        return response.data
    }

    //post cheque register
    const postChequeRegister = async(data) =>{
        const response = await axiosPrivate.post('/transactions/check_register/created/',data)
        return response.data
    }

    //put cheque register
    const putChequeRegister = async(id, data) =>{
        const response = await axiosPrivate.put('/transactions/check_register/update/'+id+'/',data)
        return response.data
    }

    //put cheque register
    const putChequeRegisterReport = async(id, data) =>{
        const response = await axiosPrivate.put('/transactions/check_register/update_report/'+id+'/',data)
        return response.data
    }

    //del cheque register
    const delChequeRegister = async(id, data) =>{
        const response = await axiosPrivate.delete('/transactions/check_register/update/'+id+'/',data)
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