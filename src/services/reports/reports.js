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

    const getCashBook = async (params)=>{
        const response = await axiosPrivate.get('/reports/cashbook/report/',{params:params})
        return response?.data
    }

    const getItemWiseProfit = async (params)=>{
        const response = await axiosPrivate.get('/reports/item_wise/profit/report/',{params:params})
        return response?.data
    }

    return{
        getStockLedger,
        getAccLedger,
        getOutstanding,
        getCashBook,
        getItemWiseProfit,
    }
}
