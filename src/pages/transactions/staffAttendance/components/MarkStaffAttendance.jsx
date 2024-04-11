import { useEffect } from "react";
import useStaffAttendanceServices from "../../../../services/transactions/staffAttendanceServices";

export const MarkStaffAttendance = (props) => {
    const {
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
        permissions,
    }=props;
    useEffect(()=>{
      getData()
    },[show])
    const {getStaffAttendance}=useStaffAttendanceServices();
    const getData =async()=>{
      try{
        if(!show.id)return null;
        let id
        let indexOfLeaveCount = show.leave_count.findLastIndex(x=>x.attendance_date==selectedDate)
        if(indexOfLeaveCount>=0){
          id = show.leave_count[indexOfLeaveCount].id
        }
        const response = await getStaffAttendance(id)
        setLeaveType(response?.data.leave_type)
        setTextArea(response?.data.narration)
        setWorkType(response?.data.fk_work_type)
      }catch(e){
        console.log(e)
      }
    }
    return (
      <>
        <div className="mx-5">
          <h2 className="text-center mt-4">Mark Attendance</h2>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <p className="m-0 p-0">
              Selected Date : {show.day}/{month + 1}/{year}{" "}
            </p>
            {/* <div
              className={`btn ${
                checkPresent ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => setCheckPresent(!checkPresent)}
            >{!checkPresent?'Leave':'Present' }
              
            </div> */}
            <div>
             
                  <input
                    type="radio"
                    id="presentRadio"
                    className="btn-check"
                    checked={checkPresent}
                    onChange={() => setCheckPresent(true)}
                  />
                  <label className="btn  btn-outline-secondary mx-1" for="presentRadio">
                    Present
                  </label >

                  <input
                    type="radio"
                    id="leaveRadio"
                    className="btn-check"
                    checked={!checkPresent}
                    onChange={() => setCheckPresent(false)}
                  />
                  <label className="btn  btn-outline-secondary" for="leaveRadio">
                  Leave
                  </label>
            </div>
          </div>
          {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
          <div>
            <div className="my-3">Work Type</div>
            <select
              // disabled={checkPresent}
              name="work_type"
              className="btn btn-outline-secondary w-100 border border-secondary"
              onChange={(e) => setWorkType(e.target.value)}
              value={workType}
            >
              <option value={1}>Work From Home</option>
              <option value={2}>Work From Office</option>
              <option value={3}>Field Work</option>
              <option value={4}>Hybrid Work</option>
            </select>
          </div>
          {checkPresent=== false && 
          <div>
            <div className="my-3">Leave Type</div>
            <div className="d-flex justify-content-between ">
              <input
                // disabled={checkPresent}
                checked={leaveType === "Before_Noon"}
                type="radio"
                className="btn-check"
                name="leave_type"
                id="option1"
                value="Before_Noon"
                onClick={(e) => setLeaveType(e.target.value)}
              />
              <label className="btn  btn-outline-secondary" for="option1">
                Before Noon
              </label>
              <input
                // disabled={checkPresent}
                checked={leaveType === "After_Noon"}
                type="radio"
                className="btn-check"
                name="leave_type"
                id="option2"
                value="After_Noon"
                onClick={(e) => setLeaveType(e.target.value)}
              />
              <label className="btn  btn-outline-secondary" for="option2">
                After Noon
              </label>
              <input
                // disabled={checkPresent}
                checked={leaveType === "Full_Day"}
                type="radio"
                className="btn-check"
                name="leave_type"
                id="option3"
                value="Full_Day"
                onClick={(e) => setLeaveType(e.target.value)}
              />
              
              <label className="btn  btn-outline-secondary" for="option3">
                Full Day
              </label>
            </div>
          </div> }
          
          <div>
            <div className="my-3">Narration</div>
            <div>
              <textarea
                // disabled={checkPresent}
                value={textArea||''}
                cols="40"
                rows="6"
                className="rounded-1 border border-secondary px-2"
                onChange={(e)=>{console.log("Textarea value:", e.target.value);setTextArea(e.target.value)}}
              />
            </div>
          </div>

          <div className="row mt-4 mx-0 mb-4">
            <span className="col-4"></span>
            <div
              className="col-3 col-4 btn btn-dark"
              onClick={() => setShow(false)}
            >
              Exit
            </div>
            <span className="col-1"></span>
            <button
              className="col-3 col-4 btn btn-dark"
              onClick={() => handleSingleAttendance(selectedDate, show)}
              disabled={!leaveType && !workType && permissions.includes(1420) ?true:false }
            >
              Save
            </button>
          </div>
        </div>
      </>
    );
  };