import { axiosPrivate } from "../../api/axios"
// import useStaffServices from "../master/staffServices"

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

    const getSalesBook = async (params) =>{
        const response = await axiosPrivate.get('/reports/sales_report/view/',{params:params})
        return response?.data
    }

    const getSaleRegister = async (params)=>{
        const response = await axiosPrivate.get('/reports/sales_register/report/view/',{params:params})
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

    const getCashBook = async (params)=>{
        const response = await axiosPrivate.get('/reports/cashbook/report/',{params:params})
        return response?.data
    }

    const getItemWiseProfit = async (params)=>{
        const response = await axiosPrivate.get('/reports/item_wise/profit/report/',{params:params})
        return response?.data
    }

    const getPurchaseBook = async (params)=>{
        const response = await axiosPrivate.get('/reports/purchase_report/view/',{params:params})
        return response?.data
    }

    const getPurchaseRegister = async(params)=>{
        const response = await axiosPrivate.get('/reports/purchase_register/report/view/',{params:params})
        return response?.data
    }

    const getStockJournalReport = async(params)=>{
        const response = await axiosPrivate.get('/reports/stock_journal/report/',{params:params})
        return response?.data
    }

    const getBarcodeRegReport = async(params)=>{
        const response = await axiosPrivate.get('/reports/barcode/register/report/',{params:params})
        return response?.data
    }

    const getItemHistory = async(id,params)=>{
        const response = await axiosPrivate.get(`/reports/item_report/${id}/`,{params:params})
        return response?.data
    }

    return{
        getStockLedger,
        getAccLedger,
        getOutstanding,
        getSalesBook,
        getSaleRegister,
        getDayBook,
        getTaxReport,
        getCashBook,
        getItemWiseProfit,
        getPurchaseBook,
        getPurchaseRegister,
        getStockJournalReport,
        getBarcodeRegReport,
        getItemHistory,
    }
}
