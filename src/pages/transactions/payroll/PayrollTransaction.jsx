import React, { useEffect, useState } from "react";
import PayrollTransactionDetails from "./components/PayrollTransactionDetails";
import "./PayrollTransaction.css";
import PayrollTransactionEdit from "./components/PayrollTransactionEdit";
import { useLocation } from "react-router";
import { usePayrollTransactionServices } from "../../../services/transactions/payrollTransactionServices";
const PayrollTransaction = () => {
  const location = useLocation().pathname;
  const year = new Date().getFullYear();
  const month = new Date().getMonth(); // 0,1,2,3,4,5,6,7,8,9,10,11
  // const startDate = new Date(year, month - 1, 1).toDateString().slice(8, 10);
  // const endDate = new Date(year, month, 0).toDateString().slice(8, 10);
  const previousMonth = month === 0 ? 11 : month - 1;
  const month_based_year = month === 0 ? year - 1 : year;
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  
  // const [fromDate, setFromDate] = useState()
  //   month === 0
  //     ? `${year - 1}-${12}-${startDate}`
  //     : `${year}-${previousMonth<10?previousMonth+'0'+1:previousMonth+1}-${startDate}`
  // );
  // const [toDate, setToDate] = useState()
  //   month === 0
  //     ? `${year - 1}-${12}-${endDate}`
  //     : `${year}-${previousMonth<10?previousMonth+'0'+1:previousMonth+1}-${endDate}`
  // );


  const pad = (value) => value < 10 ? `0${value}` : value;
  const firstDate = `${month_based_year}-${pad(previousMonth + 1)}-01`;
  const lastDay = new Date(month_based_year, previousMonth + 1, 0).getDate();
  const lastDate = `${month_based_year}-${pad(previousMonth + 1)}-${pad(lastDay)}`;
  const [fromDate, setFromDate] = useState(firstDate)
  const [toDate, setToDate] = useState(lastDate)
  const [paramsToReport, setParamsToReport] = useState({
    from_date: fromDate,
    end_date: toDate,
  });

  const [paramsToReportFull, setParamsToReportFull] = useState({
    start_date: fromDate,
    end_date: toDate,
  });
  const { getAllStaffPayroll, getPayRollBulk } =
    usePayrollTransactionServices();

  const [payrollCode, setPayrollCode] = useState("");
  const [payrollData, setPayrollData] = useState([]);
  const [fullPayRoll, setFullPayroll] = useState([]);
  const [edit, setEdit] = useState();
  const getFullData = async () => {
    try {
      const response = await getPayRollBulk(paramsToReportFull);
      setFullPayroll(response?.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getData = async () => {
    try {
      const response = await getAllStaffPayroll(paramsToReport);
      if (response?.success) {
        setPayrollCode(response.data.code);
        setPayrollData(response.data.serializer);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleResetAll = () =>{
    setPayrollCode('')
    setPayrollData([])
    setFullPayroll([])
    setEdit(false)
  }

  useEffect(() => {
    setParamsToReport({ from_date: fromDate, end_date: toDate });
  }, [fromDate, toDate]);
  
  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div>
              <div className="fw-600 fs-5">Pay Roll</div>
              <div className="page_head_items mb-2 mt-2">
                <div className={`page_head_customer active`}>Pay Roll</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-0 p-3">
        <div className="bg-light p-2">
          {location === "/pay-roll" ? (
            <PayrollTransactionDetails
              {...{
                setPayrollCode,
                setPayrollData,
                setFullPayroll,
                setPayrollData,
                date,
                setDate,
                fromDate,
                setFromDate,
                toDate,
                setToDate,
                getData,
                payrollData,
                payrollCode,
                handleResetAll,
                edit,
                setEdit,
              }}
            />
          ) : (
            <PayrollTransactionEdit
              {...{
                fromDate,
                setFromDate,
                toDate,
                setToDate,
                getData,
                getFullData,
                fullPayRoll,
                setParamsToReportFull,
                edit,
                setEdit,
                setFullPayroll,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PayrollTransaction;
