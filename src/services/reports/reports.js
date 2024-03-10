import axios from "../../api/axios";
// // import useStaffServices from "../master/staffServices"

export const useReportsServices = () => {
  const getStockLedger = async (params) => {
    const response = await axios.get("/reports/stock_ledger/view/", {
      params: { ...params },
    });
    return response.data;
  };

  const getAccLedger = async (params, data) => {
    const response = await axios.post(
      "/reports/ledger_report/view/",
      data,
      { params: params }
    );
    return response?.data;
  };

  const getOutstanding = async (params) => {
    const response = await axios.get(
      "/reports/user/outstanding_report/",
      { params: params }
    );
    return response?.data;
  };

  const getSalesBook = async (params) => {
    const response = await axios.get("/reports/sales_report/view/", {
      params: params,
    });
    return response?.data;
  };

  const getSaleRegister = async (params) => {
    const response = await axios.get(
      "/reports/sales_register/report/view/",
      { params: params }
    );
    return response?.data;
  };

  const getDayBook = async (params) => {
    const response = await axios.get("/reports/daybook_report/view/", {
      params: params,
    });
    return response?.data;
  };

  const getTaxReport = async (params) => {
    const response = await axios.get("/reports/tax_report/report/", {
      params: params,
    });
    return response?.data;
  };

  const getCashBook = async (params) => {
    const response = await axios.get("/reports/cashbook/report/", {
      params: params,
    });
    return response?.data;
  };

  const getStaffAttendance = async (params) => {
    const response = await axios.get(
      "/reports/staff_attendance/report/",
      { params: params }
    );
    return response?.data;
  };

  const getStaffSalary = async (params) => {
    const response = await axios.get(
      "/reports/staff/staff_salary/payroll/report/",
      { params: params }
    );
    return response?.data;
  };

  const getItemWiseProfit = async (params) => {
    const response = await axios.get(
      "/reports/item_wise/profit/report/",
      { params: params }
    );
    return response?.data;
  };

  const getPurchaseBook = async (params) => {
    const response = await axios.get("/reports/purchase_report/view/", {
      params: params,
    });
    return response?.data;
  };

  const getPurchaseRegister = async (params) => {
    const response = await axios.get(
      "/reports/purchase_register/report/view/",
      { params: params }
    );
    return response?.data;
  };

  const getStockJournalReport = async (params) => {
    const response = await axios.get("/reports/stock_journal/report/", {
      params: params,
    });
    return response?.data;
  };

  const getBarcodeRegReport = async (params) => {
    const response = await axios.get(
      "/reports/barcode/register/report/",
      { params: params }
    );
    return response?.data;
  };

  const getItemHistory = async (id, params) => {
    const response = await axios.get(
      `/reports/item/item_report/${id}/`,
      { params: params }
    );
    return response?.data;
  };

  const getBillWiseProfit = async (params) => {
    const response = await axios.get(
      "/reports/bill_wise/profit/report/",
      { params: params }
    );
    return response?.data;
  };

  const getStockValueReport = async (params) => {
    const response = await axios.get("reports/stoke/value/report/", {
      params: params,
    });
    return response?.data;
  };

  const getBillWiseLedger = async (params) => {
    const response = await axios.get(
      "/reports/billwise_ledger/report/",
      { params: params }
    );
    return response?.data;
  };

  const getConsolidateCashbook = async (params) => {
    const response = await axios.get(
      "/reports/consolidated/cashbook/report/",
      { params: params }
    );
    return response?.data;
  };

  const getProductionRegister = async (params) => {
    const response = await axios.get(
      "production/production/production_register/",
      { params: params }
    );
    return response?.data;
  };

  const getTrialBalance = async (params) => {
    const response = await axios.get(
      "/reports/trial_balance/report/",
      { params: params }
    );
    return response?.data;
  };

  const getGroupTrialBalance = async (params) => {
    const response = await axios.get(
      "/reports/group/headwise/balancesheet/report/",
      { params: params }
    );
    return response?.data;
  };

  const getBalanceSheet = async (params) => {
    const response = await axios.get(
      "/reports/balance_sheet/report/",
      { params: params }
    );
    return response?.data;
  };

  const getGroupBalanceSheet = async (params) => {
    const response = await axios.get(
      "/reports/group/headwise/balancesheet/report/",
      { params: params }
    );
    return response?.data;
  };


  const getTaridProfitLoss = async (params) => {
    const response = await axios.get(
      "/reports/profit/loss/report/",
      { params: params }
    );
    return response?.data;
  };

  return {
    getStockLedger,
    getAccLedger,
    getOutstanding,
    getSalesBook,
    getSaleRegister,
    getDayBook,
    getTaxReport,
    getCashBook,
    getStaffAttendance,
    getStaffSalary,
    getItemWiseProfit,
    getPurchaseBook,
    getPurchaseRegister,
    getStockJournalReport,
    getBarcodeRegReport,
    getItemHistory,
    getBillWiseProfit,
    getStockValueReport,
    getBillWiseLedger,
    getConsolidateCashbook,
    getProductionRegister,
    getTrialBalance,
    getGroupTrialBalance,
    getBalanceSheet,
    getGroupBalanceSheet,
    getTaridProfitLoss,
  };
};
