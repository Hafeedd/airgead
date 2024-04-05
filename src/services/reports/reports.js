import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate"

export const useReportsServices = () => {
  const axios = useAxiosPrivate()
  
  const getStockLedger = async (params) => {
    const response = await axios.get("/reports/stock_ledger/view/?activity_code=1313", {
      params: { ...params },
    });
    return response.data;
  };

  const getAccLedger = async (params, data) => {
    const response = await axios.post(
      "/reports/ledger_report/view/?activity_code=1314",
      data,
      { params: params }
    );
    return response?.data;
  };

  const getOutstanding = async (params) => {
    const response = await axios.get(
      "/reports/user/outstanding_report/?activity_code=1436",
      { params: params }
    );
    return response?.data;
  };

  const getSalesBook = async (params) => {
    const response = await axios.get("/reports/sales_report/view/?activity_code=1429", {
      params: params,
    });
    return response?.data;
  };

  const getSaleRegister = async (params) => {
    const response = await axios.get(
      "/reports/sales_register/report/view/?activity_code=1429",
      { params: params }
    );
    return response?.data;
  };

  const getDayBook = async (params) => {
    const response = await axios.get("/reports/daybook_report/view/?activity_code=1425", {
      params: params,
    });
    return response?.data;
  };

  const getTaxReport = async (params) => {
    const response = await axios.get("/reports/tax_report/report/?activity_code=1342", {
      params: params,
    });
    return response?.data;
  };

  const getCashBook = async (params) => {
    const response = await axios.get("/reports/cashbook/report/?activity_code=1343", {
      params: params,
    });
    return response?.data;
  };

  const getStaffAttendance = async (params) => {
    const response = await axios.get(
      "/reports/staff_attendance/report/?activity_code=1353",
      { params: params }
    );
    return response?.data;
  };

  const getStaffSalary = async (params) => {
    const response = await axios.get(
      "/reports/staff/staff_salary/payroll/report/?activity_code=1354",
      { params: params }
    );
    return response?.data;
  };

  const getItemWiseProfit = async (params) => {
    const response = await axios.get(
      "/reports/item_wise/profit/report/?activity_code=1345",
      { params: params }
    );
    return response?.data;
  };

  const getPurchaseBook = async (params) => {
    const response = await axios.get("/reports/purchase_report/view/?activity_code=1346", {
      params: params,
    });
    return response?.data;
  };

  const getPurchaseRegister = async (params) => {
    const response = await axios.get(
      "/reports/purchase_register/report/view/?activity_code=1346",
      { params: params }
    );
    return response?.data;
  };

  const getStockJournalReport = async (params) => {
    const response = await axios.get("/reports/stock_journal/report/?activity_code=1344", {
      params: params,
    });
    return response?.data;
  };

  const getBarcodeRegReport = async (params) => {
    const response = await axios.get(
      "/reports/barcode/register/report/?activity_code=1347",
      { params: params }
    );
    return response?.data;
  };

  const getItemHistory = async (id, params) => {
    const response = await axios.get(
      `/reports/item/item_report/${id}/?activity_code=1348`,
      { params: params }
    );
    return response?.data;
  };

  const getBillWiseProfit = async (params) => {
    const response = await axios.get(
      "/reports/bill_wise/profit/report/?activity_code=1430",
      { params: params }
    );
    return response?.data;
  };

  const getStockValueReport = async (params) => {
    const response = await axios.get("reports/stoke/value/report/?activity_code=1352", {
      params: params,
    });
    return response?.data;
  };

  const getBillWiseLedger = async (params) => {
    const response = await axios.get(
      "/reports/billwise_ledger/report/?activity_code=1349",
      { params: params }
    );
    return response?.data;
  };

  const getConsolidateCashbook = async (params) => {
    const response = await axios.get(
      "/reports/consolidated/cashbook/report/?activity_code=1343",
      { params: params }
    );
    return response?.data;
  };

  const getProductionRegister = async (params) => {
    const response = await axios.get(
      "production/production/production_register/?activity_code=1355",
      { params: params }
    );
    return response?.data;
  };

  const getTrialBalance = async (params) => {
    const response = await axios.get(
      "/reports/trial_balance/report/?activity_code=1356",
      { params: params }
    );
    return response?.data;
  };

  const getGroupTrialBalance = async (params) => {
    const response = await axios.get(
      "/reports/groupwise/trialbalance/report/?activity_code=1357",
      { params: params }
    );
    return response?.data;
  };

  const getBalanceSheet = async (params) => {
    const response = await axios.get(
      "/reports/balance_sheet/report/?activity_code=1358",
      { params: params }
    );
    return response?.data;
  };

  const getGroupBalanceSheet = async (params) => {
    const response = await axios.get(
      "/reports/group/headwise/balancesheet/report/?activity_code=1359",
      { params: params }
    );
    return response?.data;
  };


  const getTaridProfitLoss = async (params) => {
    const response = await axios.get(
      "/reports/profit/loss/report/?activity_code=1361",
      { params: params }
    );
    return response?.data;
  };

  const getChartOfAccount = async (params) => {
    const response = await axios.get(
      "/reports/chart/account/?activity_code=1362",
      { params: params }
    );
    return response?.data;
  };

  const batchWiseStockReport = async (params) => {
    const response = await axios.get(
      "/reports/batch/stock_ledger/?activity_code=1472",
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
    getChartOfAccount,
    batchWiseStockReport
  };
};
