import React, { useEffect, useState } from "react";
import "./StaffAttendance.css";
import StaffAttendanceDetails from "./components/StaffAttendanceDetails";
import useStaffAttendanceServices from "../../../services/transactions/staffAttendanceServices";

const StaffAttendance = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [startDate, setStartDate] = useState(
    new Date(year, month, 1).toDateString().slice(8, 10)
  );
  const [endDate, setEndDate] = useState(
    new Date(year, month + 1, 0).toDateString().slice(8, 10)
  );
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
  console.log(year, month, startDate, endDate);
  const { getAllStaffAttendance } = useStaffAttendanceServices();
  const getData = async () => {
    try {
      const paramsToReport = {
        from_date: new Date().toISOString().slice(0, 8) + "0" + startDate,
        to_date: new Date().toISOString().slice(0, 8) + endDate,
      };
      const response = await getAllStaffAttendance(paramsToReport);
      if (response?.success) {
        setAllStaff(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, [startDate]);
  return (
    <div className="item_add">
      <div className="itemList_header row mx-0 mb-3">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div>
            <div className="fw-600 fs-5">Staff Attendance</div>
            <div className="page_head_items mb-1">
              <div className={`page_head_item active`}>Details</div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="row mt-3 mx-0 rounded-1 w-100 bg-light">
          <div className="w-100 mb-3 mt-2">
            <StaffAttendanceDetails
              {...{
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                months,
                month,
                setMonth,
                year,
                setYear,
                allStaff,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffAttendance;
