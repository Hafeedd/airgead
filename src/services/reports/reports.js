import { axiosPrivate } from "../../api/axios"
import useStaffServices from "../master/staffServices"

export const useReportsServices = () =>{
    
    const getStockLedger = async (params) =>{
        const response = await axiosPrivate.get('/reports/stock_ledger/view/',{params:{...params}})
        return response.data
    }
    
    const getAccLedger = async (params,data) =>{
        const response = await axiosPrivate.post('/reports/ledger_report/view/',data,{params:params})
        return response?.data
    }

    const getOutstanding = async (params) =>{
        const response = await axiosPrivate.get('/reports/user/outstanding_report/',{params:params})
        return response?.data
    }

    const getDayBook = async (params) =>{
        const response = await axiosPrivate.get('/reports/daybook_report/view/',{params:params})
        return response?.data
    }
  
    const getTaxReport = async (params) =>{
        const response = await axiosPrivate.get('/reports/tax_report/report/',{params:params})
        return response?.data
    }

    return{
        getStockLedger,
        getAccLedger,
        getOutstanding,
        getDayBook,
        getTaxReport,
    }
}
 