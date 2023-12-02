import React, { useEffect, useRef, useState } from "react";
import { FiCheckSquare, FiXCircle, FiMinusCircle } from "react-icons/fi";
import { BsCircleHalf } from "react-icons/bs";
import left from "../../../../assets/icons/left.png";
import right from "../../../../assets/icons/right.png";
import searchIcon from "../../../../assets/icons/search.png";
import { Modal } from "react-bootstrap";

const StaffAttendanceDetails = (props) => {
  const {
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
  } = props;
  const [show,setShow] = useState(false)
  const today = new Date().getDate();

  const tableRef = useRef(null);
  useEffect(() => {
    const thElement = tableRef.current.querySelector(
      `th:nth-child(${today + 1})`
    );
    if (thElement) {
      thElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [today]);

  const handleLeft = () => {
    setMonth((m) => (m > 0 ? m - 1 : 11));
    setYear((y) => (month === 0 ? y - 1 : y));
    let a = new Date(year, month, 1);
    let w1 = a.toDateString();
    setStartDate(w1.slice(8, 10));
    let b = new Date(year, month + 1, 0);
    let w2 = b.toDateString();
    setEndDate(w2.slice(8, 10));
  };

  const handleRight = () => {
    setMonth((m) => (m < 11 ? m + 1 : 0));
    setYear((y) => (month === 11 ? y + 1 : y));
    let a = new Date(year, month, 1);
    let w1 = a.toDateString();
    setStartDate(w1.slice(8, 10));
    let b = new Date(year, month + 1, 0);
    let w2 = b.toDateString();
    setEndDate(w2.slice(8, 10));
  };

  const DateHeading = () => {
    let a = [];
    for (let i = 1; i < parseInt(endDate) + 1; i++) {
      a.push(
        today === i && month === new Date().getMonth() ? (
          <th
            className="border border-dark border-2"
            style={{ backgroundColor: "springgreen" }}
          >
            {i}
          </th>
        ) : (
          <th>{i}</th>
        )
      );
    }
    return a;
  };

  const TableDate = ()=>{
    let a = []
    for(let i = startDate ; i <= endDate ; i++){
      a.push(<td>
        {/* onClick={()=>console.log(i)} */}
        <FiMinusCircle onClick={()=>setShow(i)} size={20} className="me-2 mb-1" />
      </td>)
      }
      return a
  }
  const [present,setPresent]=useState(true)
  const MarkStaffAttendance =() =>{
    return(
      <>
       <div className="mx-5">
          <h2 className="text-center mt-4">Mark Attendance</h2>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <p className="m-0 p-0">Selected Date : {show}/{month+1}/{year} </p>
            <div className={`btn ${present?'btn-primary':'btn-secondary'}`} onClick={()=>setPresent(!present)}>Present</div>
          </div>

          <div>
            <div className="my-3">Work Type</div>
            <select name="work_type" className="btn btn-outline-secondary w-100 border border-secondary">
              <option value={1}>Work From Home</option>
              <option value={2}>Work From Office</option>
              <option value={3}>Field Work</option>
              <option value={4}>Hybrid Work</option>
            </select>
          </div>
          <div>
            <div className="my-3" >Leave Type</div>
            <div className="d-flex justify-content-between">
            <input type="radio" class="btn-check"  name="leave_type"  id="option1" />
            <label class="btn  btn-outline-secondary" for="option1">Before Noon</label>
            <input type="radio" class="btn-check"  name="leave_type"  id="option2" />
            <label class="btn  btn-outline-secondary" for="option2">After Noon</label>
            <input type="radio" class="btn-check"  name="leave_type"  id="option3"/>
            <label class="btn  btn-outline-secondary" for="option3">Full Day</label>
            </div>
          </div>
          <div>
            <div className="my-3">Narration</div>
            <div><textarea name="" cols="40" rows="6" className="rounded-1 border border-secondary px-2" style={{resize:"none"}}  placeholder="Type here..."></textarea></div>
          </div>

          <div className="row mt-4 mx-0">
            <span className="col-4"></span>
            <div className="col-3 col-4 btn btn-dark" onClick={()=>setShow(false)}>Exit</div>
            <span className="col-1"></span>
            <div className="col-3 col-4 btn btn-dark">Save</div>
          </div>
            
       </div>
      </>
    )
  }

  return (
    <div className="mx-0 px-0 fs-5">
      <b>Staff Attendance Details</b>
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
            <FiMinusCircle size={20} className="me-2 mb-1" /> Not Updated
          </span>
          <span>
            {startDate}-{endDate}
          </span>
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
              />
            </div>
          </div>
          <div className="col-3 choose-acc-btn rounded-2 text-light cursor py-0">
            Filter Account
          </div>
        </div>
      </div>
      <div
        style={{
          height: "29.5rem",
          width: "85rem",
          overflowX: "scroll",
          overflowY: "scroll",
        }}
        className="mt-2"
      >
        <table
          className="StaffTable w-100 p-0 m-0"
          style={{ tableLayout: "fixed" }}
          ref={tableRef}
        >
          <thead>
            <tr>
              <th>Name</th>
              {<DateHeading />}
            </tr>
          </thead>
          <tbody>
            {allStaff.length > 0 && 
            allStaff.map((data,i)=>
            {
              return(<tr>
                <td>{data.name}</td>
                <TableDate/>
              </tr>)
            })}
            
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={()=>setShow(false)} centered  className='d-flex justify-content-center' contentClassName="staffModal">
        <MarkStaffAttendance/>
      </Modal>
    </div>
   
  );
};

export default StaffAttendanceDetails;
