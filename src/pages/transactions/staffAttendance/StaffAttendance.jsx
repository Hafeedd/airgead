import React, { useEffect, useState } from "react";
import "./StaffAttendance.css";
import StaffAttendanceDetails from "./components/StaffAttendanceDetails";
import useStaffAttendanceServices from "../../../services/transactions/staffAttendanceServices";

const StaffAttendance = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [startDate, setStartDate] = useState(new Date(year, month+1, 1).toDateString().slice(8, 10));
  const [endDate, setEndDate] = useState(new Date(year, month, 0).toDateString().slice(8, 10));


  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [allStaff, setAllStaff] = useState([]);

  const { getAllStaffAttendance } = useStaffAttendanceServices();

  const getData = async () => {
    try {
      const paramsToReport = {
        from_date:  year+'-'+((parseInt(month)+1)<10?'0'+(parseInt(month)+1).toString(): (parseInt(month)+1).toString() )+'-'+startDate,
        end_date: year+'-'+((parseInt(month)+1)<10?'0'+(parseInt(month)+1).toString(): (parseInt(month)+1).toString() )+'-'+endDate,
      };
      console.log("params",paramsToReport)
      const response = await getAllStaffAttendance(paramsToReport);
      if (response?.success) {
        console.log("get all",response.data);
        setAllStaff(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log("useEffect")
    getData();
  }, [startDate,endDate,month,year]);
  return (
    <div className="item_add">
      <div className="itemList_header row mx-0 my-0 mb-o pb-0">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div>
              <div className="fw-600 fs-5">Staff Attendance</div>
              <div className="page_head_items mb-2 mt-2">
                <div className={`page_head_customer active`}>
                  Staff Attendance
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 py-3 ">
        <div className="stock-jdetails-cont p-3">
              <StaffAttendanceDetails
                {...{
                  startDate,
                  endDate,
                  months,
                  month,
                  setMonth,
                  year,
                  setYear,
                  allStaff,
                  getData,
                  setAllStaff,
                  setStartDate,
                  setEndDate,
                }}
              />
        </div>
      </div>
    </div>
  );
};

export default StaffAttendance;
