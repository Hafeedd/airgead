import React, { useEffect, useRef, useState } from "react";
import { FiCheckSquare, FiXCircle, FiMinusCircle } from "react-icons/fi";
import { BsCircleHalf } from "react-icons/bs";
import left from "../../../../assets/icons/left.png";
import right from "../../../../assets/icons/right.png";
import searchIcon from "../../../../assets/icons/search.png";
import { Modal } from "react-bootstrap";
import useStaffAttendanceServices from "../../../../services/transactions/staffAttendanceServices";
import Swal from "sweetalert2";
import { MarkStaffAttendance } from "./MarkStaffAttendance";
import FilterStaffAttendance from "./FilterStaffAttendance";

const StaffAttendanceDetails = (props) => {
  const {
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
  } = props;
  const [present, setPresent] = useState(false);
  const [checkPresent, setCheckPresent] = useState();
  const [workType, setWorkType] = useState();
  const [leaveType, setLeaveType] = useState();
  const [textArea, setTextArea] = useState("");
  const [show, setShow] = useState(false);
  const [dateShow, setDateShow] = useState(false);
  const [filterShow, setFilterShow] = useState(false);
  const today = new Date().getDate();
  const tableRef = useRef(null);
  const [property, setProperty] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("all");
  const [tempStaffList, setTempStaffList] = useState([]);
  const [searchedList, setSearchedList] = useState([]);

  useEffect(() => {
    const thElement = tableRef?.current?.querySelector(
      `th:nth-child(${today + 1})`
    );
    if (thElement) {
      thElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [today]);

  useEffect(()=>{handleFilterStaff()},[allStaff])

  const handleFilterStaff= ()=>{
    let staffList = [];
    if (selectedProperty != "all") {
      staffList = allStaff?.filter(
        (staff) => staff.fk_designation == selectedProperty
      );
    } else staffList = [...allStaff] 
    
    setTempStaffList(staffList);
  }

  const { postBulkUploadAttendance, postStaffAttendance} =
    useStaffAttendanceServices();

  const handlePresentAllAttendance = async (date) => {
    let staff_list = allStaff.map((x) => ({ id: x.id }));
    let submitData = {
      staff_list: staff_list,
      is_present: present,
      attendance_date: date,
    };
    if (submitData) {
      let response = await postBulkUploadAttendance(submitData);
      if (!response?.success) {
        Swal.fire("Error", "Oops Something went wrong");
      } else {
        setDateShow(false);
        setPresent(false);
        getData();
      }
    }
  };


  const handleSearch = async (e) => {
    try {
      let tempData, tempList = allStaff;
      if (allStaff) {
        let value = e.target.value.toLocaleLowerCase();
        if (value != "") {
          if (allStaff.length > 0) {
            tempData = tempList?.filter((x) => {
              let searchInString = `${x.name?.toLocaleLowerCase()}`;
              let search = searchInString?.includes(value);
              if (search) {
                return true;
              }
            });
            setSearchedList(tempData);
            setTempStaffList(searchedList)
          }
        } else {
          setSearchedList(allStaff);
          setTempStaffList(allStaff)
        }
      }
    } catch {}
  };

  const handleLeft = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prevYear) => prevYear - 1);
    } else {
      setMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleRight = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prevYear) => prevYear + 1);
    } else {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };

  useEffect(() => {
    updateDateRange();
  }, [month, year]);

  const updateDateRange = () => {
    const firstDay = new Date(year, month, 1).toLocaleDateString('en-US', { day: '2-digit' });
    const lastDay = new Date(year, month + 1, 0).toLocaleDateString('en-US', { day: '2-digit' });
    setStartDate(firstDay);
    setEndDate(lastDay);
  };

  const DateHeading = () => {
    let a = [];
    for (let i = 1; i < parseInt(endDate) + 1; i++) {
      a.push(
        today === i &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear() ? (
          <th
            className="border border-secondary border-1"
            style={{ backgroundColor: "#15ac9a "}}
            onClick={() => setDateShow(i)}
          >
            {i}
          </th>
        ) : (
          <th onClick={() => setDateShow(i)}>{i}</th>
        )
      );
    }
    return a;
  };

  const TableDate = (data) => {
    let a = [];
    for (let i = 1; i <= parseInt(endDate); i++) {
      let b;
      let entry;
      let selectedleavetype;
      data.data.leave_count.map((x) => {
        if (parseInt(x.attendance_date?.slice(8, 10)) == i) {
          entry = x.is_present;
          selectedleavetype = x.leave_type;
        }
      });
      if (entry) {
        b = (
          <td onClick={() => setShow({ ...data.data, day: i })}>
            <FiCheckSquare
              size={20}
              className="me-2 mb-1"
              style={{ color: "#15bd02" }}
            />
          </td>
        );
      } else {
        if (selectedleavetype === "Full_Day") {
          b = (
            <td onClick={() => setShow({ ...data.data, day: i })}>
              <FiXCircle size={20} className="me-2 mb-1 text-danger" />
            </td>
          );
        } else if (selectedleavetype === "After_Noon") {
          b = (
            <td onClick={() => setShow({ ...data.data, day: i })}>
              <BsCircleHalf
                size={20}
                className="me-2 mb-1"
                style={{ color: "#2ec213" }}
              />
            </td>
          );
        } else if (selectedleavetype === "Before_Noon") {
          b = (
            <td onClick={() => setShow({ ...data.data, day: i })}>
              <BsCircleHalf
                style={{ transform: "rotate(180deg)", color: "#2ec213" }}
                size={20}
                className="me-2 mb-1"
              />
            </td>
          );
        } else {
          b = (
            <td onClick={() => setShow({ ...data.data, day: i })}>
              <FiMinusCircle size={20} className="me-2 mb-1 text-secondary" />
            </td>
          );
        }
      }
      a.push(b);
    }
    return a;
  };

  const handleSingleAttendance = async (date, show) => {
    const data = {
      is_present: checkPresent,
      leave_type: leaveType,
      narration: textArea,
      fk_work_type: workType,
      attendance_date: date,
    };
    const response = await postStaffAttendance(data, show?.id);
    if (response?.success) {
      Swal.fire({ text: response?.message, icon: "success", timer: 1000 });
      getData();
      setLeaveType("");
      setTextArea("");
      setWorkType("");
      setShow(false);
    } else {
      Swal.error("error", "Attendance Not Updated");
    }
  };
  const selectedDate = `${year}-${month + 1< 10 ? ('0'+(month+1)):(month+1)}-${show?.day < 10 ? "0" + show.day : show.day}`;
  console.log("hello.....",selectedDate);
  const handleCheckIsPresent = () => {
    let select = show?.leave_count?.filter(
      (x) => x?.attendance_date == selectedDate
    )[
      show?.leave_count?.filter((x) => x?.attendance_date == selectedDate)
        ?.length - 1
    ]?.is_present;
    setCheckPresent(select ? true : false);
    return select;
  };
  useEffect(() => {
    handleCheckIsPresent();
  }, [show]);

  const MarkAllStaffAttendance = () => {
    return (
      <div className="mx-5">
        <h2 className="text-center mt-4">Set Attendance </h2>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <p className="m-0 p-0 me-4">
            Selected Date : {dateShow < 10 ? "0" + dateShow : dateShow}/
            {month + 1}/{year}
          </p>
          <div
            className={`btn ${present ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setPresent(!present)}
          >
            Present
          </div>
        </div>
        <div className="mt-4 mx-0  mb-4 d-flex justify-content-end">
          <div
            className="col-3 me-2 btn btn-dark"
            onClick={() => setDateShow(false)}
          >
            Exit
          </div>
          <div
            onClick={() =>
              handlePresentAllAttendance(`${year}-${month + 1}-${dateShow}`)
            }
            className="col-3 btn btn-dark"
          >
            Save
          </div>
        </div>
      </div>
    );
  };
  

  return (
    <div className="mx-0 stock-jdetails-cont p-3">
      <b className="fs-5">Staff Attendance Details</b>
      <div className="col-12 d-flex justify-content-center align-items-md-center mx-0 mt-3">
        <div
          className="col-4 col-5 d-flex justify-content-end"
          onClick={handleLeft}
        >
          {" "}
          <img
            src={left}
            alt=""
            style={{ width: "3rem", height: "3rem" }}
          />{" "}
        </div>
        <div className="col-3 text-center">
          <h2>
            {months[month]} {year}
          </h2>{" "}
        </div>
        <div className="col-4 col-5" onClick={handleRight}>
          {" "}
          <img
            src={right}
            alt=""
            style={{ width: "3rem", height: "3rem" }}
          />{" "}
        </div>
      </div>
      <div className="row mt-4 mx-0 d-flex align-items-center">
        <div className="col-6 d-flex justify-content-between">
          <span>
            <FiCheckSquare
              size={20}
              className="me-2 mb-1"
              style={{ color: "#2ec213" }}
            />{" "}
            Present
          </span>
          <span>
            <BsCircleHalf
              size={20}
              className="me-2 mb-1"
              style={{ color: "#2ec213" }}
            />{" "}
            Half Day{" "}
          </span>
          <span>
            <FiXCircle size={20} className="me-2 mb-1 text-danger" /> Absent
          </span>
          <span>
            <FiMinusCircle size={20} className="me-2 mb-1 text-secondary" /> Not Updated
          </span>
          {/* <span>
            {month}-{year}-{startDate}-{endDate}
          </span> */}
        </div>
        <div className="col-6 d-flex align-items-center ">
          <span className="col-5"></span>
          <div className="col-4 p-2 stock-ledger-search d-flex mx-0">
            <div
              className="item_seach_bar_cont rounded-2 col-12"
              style={{ height: "2rem" }}
            >
              <img src={searchIcon} className="search_img  mx-0" alt="" />
              <input
                className="item_search_bar rounded-2 border-0 py-1"
                placeholder="Search"
                type="text"
                onChange={handleSearch} 
              />
            </div>
          </div>
          <div
            className="col-3 choose-acc-btn rounded-2 text-light cursor py-0"
            onClick={() => setFilterShow(true)}
          >
            Filter Account
          </div>
        </div>
      </div>
      <div  
        className="px-0 w-100 mx-0"  id="staff-table-cont"
      >
      <div   
       className="staff-table-cont px-0" 
      >
        <table
          className="StaffTable p-0 m-0 px-0"
          ref={tableRef}
        >
          <thead>
            <tr>
              <th style={{zIndex:10}}>Name</th>
              {<DateHeading />}
            </tr>
          </thead>
          <tbody>
            {tempStaffList.length > 0 &&
              tempStaffList.map((data, i) => {
                return (
                  <tr>
                    <td>{data.name}</td>
                    <TableDate data={data} />
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        className="d-flex justify-content-center"
        contentclassName="staffModal"
      >
        <MarkStaffAttendance
          {...{
            month,
            year,
            checkPresent,
            setCheckPresent,
            setWorkType,
            workType,
            setLeaveType,
            textArea,
            setTextArea,
            setShow,
            handleSingleAttendance,
            selectedDate,
            show,
            leaveType,

          }}
        />
      </Modal>
      <Modal
        show={dateShow}
        onHide={() => {
          setPresent(false);
          setDateShow(false);
        }}
        centered
        className="d-flex justify-content-center"
        contentclassName="staffModal2"
      >
        <MarkAllStaffAttendance />
      </Modal>
      <Modal
        show={filterShow}
        onHide={() => {
          setFilterShow(false);
        }}
        centered
        className="d-flex justify-content-center"
        contentclassName="staffModal3"
      >
        <FilterStaffAttendance
          {...{ property, setProperty, setSelectedProperty, selectedProperty,handleFilterStaff }}
        />
      </Modal>
    </div>
  );
};

export default StaffAttendanceDetails;
