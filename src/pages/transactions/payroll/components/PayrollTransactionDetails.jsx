import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { MdMovieEdit } from "react-icons/md";
import { useNavigate } from "react-router";
import "sweetalert2";
import { usePayrollTransactionServices } from "../../../../services/transactions/payrollTransactionServices";
import Swal from "sweetalert2";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";
import { all } from "axios";
const PayrollTransactionDetails = (props) => {
  const {
    date,
    setDate,
    fromDate,
    setPayrollData,
    setFromDate,
    toDate,
    setToDate,
    getData,
    payrollData,
    handleResetAll,
    payrollCode,
    edit,
    setEdit,
    setPayrollCode,
    setFullPayroll,
  } = props;
  const navigate = useNavigate();

  const [totalSalary, setTotalSalary] = useState(0);
  const [narration, setNarration] = useState("Salary");

  const [ref1, setRef1] = useState(null);
  const [handleKeyDown1, formRef1] = useOnKey(ref1, setRef1,payrollData);

  useEffect(()=>{
    let totalS = 0
    if(payrollData.length>0){
      totalS = payrollData.reduce((a,b)=>parseFloat(a)+parseFloat(b.net_salary||0),0)
    }
    setTotalSalary(totalS)
  },[payrollData])

  useEffect(() => {
    if (edit) {
      let tempList = []
      console.log('Hello',edit);
      setPayrollCode(edit?.daybookpart_data?.voucher_number);
      
      edit?.payroll_data?.map(payData=>{
        let tempData = {
          id:payData.id,
          code: payData.staff_code,
          name:payData.staff_name,
          net_salary: payData.net_salary,
          leave_count: payData.leave_taken,
          leave_cut_amount:payData.leave_cut_amount,
          payscale:{
            pf:payData.pf,
            salary:payData.salary,
            esi:payData.esi,
            other:payData.other,
            allowed_leave:payData.allowed_leave,
            // leave_cut:payData.leave_cut,
            insurance:payData.insurance,
          },
        }
        setFromDate(payData.from_date);
        setToDate(payData.end_date);
        tempList?.push(tempData)
      })
      setPayrollData(tempList);
      }
    },[edit]);

    // const handleChange = (e, i) => {
    //   const tempPayData = [...payrollData];
    //   let changedData = tempPayData[i];
    
    //   if (e.target.name === 'leave_cut_amount') {
    //     const leaveCutAmount = Number(e.target.value);
    //     const netSalary = changedData.payscale.salary - leaveCutAmount;
    //     changedData = { ...changedData, [e.target.name]: leaveCutAmount, net_salary: netSalary };
    //   }
      
    //   else if (e.target.name.match(/net_salary|leave_count/)) {
    //     changedData = { ...changedData, [e.target.name]: e.target.value };
    //   } 
      
    //   else{
    //     const payScaleChange = { ...changedData.payscale, [e.target.name]: e.target.value };
    //     changedData = { ...changedData, payscale: payScaleChange };
    //   }
    
    //   let leaveCutAmount;
    //   if (e.target.name !== 'leave_cut_amount') {
    //     const allowedLeave = parseFloat(changedData.payscale?.allowed_leave) || 0;
    //     const leaveCount = parseFloat(changedData.leave_count) || 0;
    //     leaveCutAmount = allowedLeave >= leaveCount ? 0 : (leaveCount - allowedLeave) * parseFloat(changedData.payscale?.leave_cut || 0);
    //   }
    
    //   let netSalary;
    //   if (e.target.name !== "net_salary") {
    //     const allowedLeave = parseFloat(changedData.payscale?.allowed_leave) || 0;
    //     const leaveCount = parseFloat(changedData.leave_count) || 0;
    //     const leaveCut = allowedLeave >= leaveCount ? 0 : (leaveCount - allowedLeave) * parseFloat(changedData.payscale?.leave_cut || 0);
    //     netSalary = (parseFloat(changedData.payscale?.salary) || 0) - (leaveCut + parseFloat(changedData.leave_cut_amount || 0) + parseFloat(changedData.payscale?.pf || 0) + parseFloat(changedData.payscale?.esi || 0) + parseFloat(changedData.payscale?.insurance || 0) + parseFloat(changedData.payscale?.other || 0)) || 0;
    //   }
    //   console.log(changedData)
    //   tempPayData.splice(i, 1, { ...changedData, leave_cut_amount: leaveCutAmount, net_salary: netSalary });
    //   setPayrollData(tempPayData);
    // };

    const handleChange = (e, i) => {
      const tempPayData = [...payrollData];
      let changedData = tempPayData[i];
    
      if (e.target.name === 'leave_cut_amount') {
        const leaveCutAmount = Number(e.target.value);
        const payScaleChange =changedData.payscale
        const pf=parseFloat(payScaleChange.pf)||0
        const esi=parseFloat(payScaleChange.esi)||0
        const other=parseFloat(payScaleChange.other)||0
        const insurance =parseFloat(payScaleChange.insurance)||0
        const salary  = parseFloat(payScaleChange.salary)||0
        const netSalary = salary - (leaveCutAmount+pf+esi+other+insurance);
        changedData = { ...changedData, [e.target.name]: leaveCutAmount, net_salary: netSalary };
      } else if (e.target.name === 'net_salary') {
        changedData = { ...changedData, [e.target.name]: e.target.value};
      }else if (e.target.name === 'leave_count') {
        const leaveCount = Number(e.target.value);
        const salary=parseFloat(changedData.payscale.salary)||0
        const allowedLeave=parseFloat(changedData.payscale.allowed_leave)||0
        const leaveCutAmount= allowedLeave >= leaveCount ? 0 : (leaveCount - allowedLeave) * parseFloat(changedData.payscale.leave_cut || 0)
        const netSalary = salary - leaveCutAmount;
        changedData = { ...changedData, [e.target.name]: leaveCount,leave_cut_amount:leaveCutAmount, net_salary: netSalary };
      }else {
        const payScaleChange = { ...changedData.payscale, [e.target.name]: e.target.value };
        const allowedLeave=parseFloat(payScaleChange.allowed_leave)||0
        const leaveCount=parseFloat(changedData.leave_count)||0
        const leaveCutAmount= allowedLeave >= leaveCount ? 0 : (leaveCount - allowedLeave) * parseFloat(changedData.payscale.leave_cut || 0)
        const salary = parseFloat(payScaleChange.salary)||0
        const pf=parseFloat(payScaleChange.pf)||0
        const esi=parseFloat(payScaleChange.esi)||0
        const other=parseFloat(payScaleChange.other)||0
        const insurance =parseFloat(payScaleChange.insurance)||0
        const netSalary =  salary - (leaveCutAmount+pf+esi+other+insurance)
        changedData = { ...changedData, payscale: payScaleChange, net_salary: netSalary,leave_cut_amount: leaveCutAmount};
      }
    
      tempPayData.splice(i, 1, changedData);
      setPayrollData(tempPayData);
    };

    
  const { postPayRollBulk,putPayRollBulk } = usePayrollTransactionServices();

  const handleSave = async () => {
    const tempPayDataList = [];
    payrollData.map((data) => {
      const temp = {
        id: data.id,
        staff_code: data.code,
        staff_name: data.name,
        from_date: fromDate,
        end_date: toDate,
        salary: data.payscale?.salary,
        allowed_leave: data.payscale?.allowed_leave,
        leave_taken: data.leave_count,
        leave_cut_amount:data.leave_cut_amount,
        // leave_cut: data.payscale?.leave_cut,
        pf: data.payscale?.pf,
        esi: data.payscale?.esi,
        insurance: data.payscale?.insurance,
        other: data.payscale?.other,
        net_salary: data.net_salary,
      };
      tempPayDataList.push(temp);
    });
    let submitData = {
      narration: narration,
      date: date,
      staff_payroll_list: tempPayDataList,
    };
    if(edit){
      submitData = {
          date: date,
          payroll_list: tempPayDataList,
        }
      }

    if (!edit) {
      let response = await postPayRollBulk(submitData);
      if (!response?.success) {
        Swal.fire("Error", "Oops Something went wrong");
      } else {
        handleResetAll()
        Swal.fire("Success", "Successfully submitted");
        getData();
      }
    }else{
      let response = await putPayRollBulk(submitData);
      if (!response?.success) {
        Swal.fire("Error", "Oops Something went wrong");
      } else {
        handleResetAll()
        Swal.fire("Success", "Successfully Edited");
        getData();
      }
    }
  };

  // const formatDate = (date) => {
  //   let splitDate = date.split("-");
  //   let changedDate = []
  //   for( let i=2;i>=0;i--) {
  //     changedDate.push(splitDate[i])
  //   }
  //   let changedDateFormat = changedDate.join("/")
  //   console.log(changedDateFormat)
  //   return changedDateFormat;
  // };

  return (
    <div>
      <div>Payroll</div>
      <div className="col-12 d-flex justify-content-between align-items-center px-0 mx-0">
        <Form.Group
          className="col-4 ps-0 mx-0 d-flex align-items-start mt-1"
          style={{ paddingRight: "2rem" }}
        >
          <Form.Label className="col-2 purchase-input-label pb-1">
            Doc no.
          </Form.Label>
          <Form.Control
            required
            name="code"
            value={payrollCode || ""}
            className="purchase-input-text me-1"
            placeholder="Document number"
            type="text"
          />
          <div
            onClick={() => navigate("/pay-roll-edit")}
            className="col-1 p-0 bg-dark rounded-1 btn py-0 ms-1 text-light "
          >
            <MdMovieEdit size={18} className="mb-1 p-0" />
          </div>
        </Form.Group>
        <Form.Group className="col-4 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
          <Form.Label className="col-2 purchase-input-label pb-1">
            Date
          </Form.Label>
          <Form.Control
            onChange={(e) => setDate(e.target.value)}
            required
            name="date"
            value={date}
            className="purchase-input-text me-2"
            placeholder="Document number"
            type="date"
          />
        </Form.Group>
        <Form.Group className="col-4 px-0 pe-2 ps-0 mx-0 d-flex align-items-start mt-1">
          <Form.Label className="col-3 col-4 purchase-input-label pb-1 ps-2">
            Narration
          </Form.Label>
          <Form.Control
            onChange={(e) => setNarration(e.target.value)}
            required
            name="salesman"
            value={narration}
            className="purchase-input-text"
            placeholder="something"
            type="text"
          />
        </Form.Group>
      </div>
      <div className="my-2">Salary Date Allocation</div>
      <div className="d-flex justify-content-start align-items-center ">
        <Form.Group className="col-4 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
          <Form.Label className="col-2 purchase-input-label align-middle">
            From
          </Form.Label>
          <Form.Control
            onChange={(e) => setFromDate(e.target.value)}
            required
            name="from_date"
            value={fromDate}
            className="purchase-input-text me-2"
            placeholder="Document number"
            type="date"
            format="dd/mm/yyyy"
          />
        </Form.Group>
        <Form.Group className="col-4 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
          <Form.Label className="col-2 purchase-input-label align-middle">
            To
          </Form.Label>
          <Form.Control
            onChange={(e) => setToDate(e.target.value)}
            required
            name="to_date"
            value={toDate}
            className="purchase-input-text me-2"
            placeholder="Document number"
            type="date"
            format="dd/mm/yyyy"
          />
        </Form.Group>
        <div className="col-4 mx-0 px-0 px-2 mt-1">
          <div
            onClick={() => getData()}
            className="col-4 col-5 p-0 rounded-1 btn py-0 text-light w-100"
            style={{ backgroundColor: "#4A00A8" }}
          >
            Allocate
          </div>
          {/* <span className="col-3 col-4"></span>
          <div
            className="col-4 col-5 p-0 rounded-1 btn py-0 text-light d-flex justify-content-center align-items-center w-100 gap-2"
            style={{ backgroundColor: "#260551" }}
          >
            {" "}
            <div>Edit</div>
            <MdMovieEdit size={18} />
          </div> */}
        </div>
      </div>

      <div
        style={{
          height: "24rem",
          // width: "85rem",
          overflowX: "hidden",
          overflowY: "scroll",
        }}
        className="mt-3"
      >
        <table className="PayrollTable w-100" style={{tableLayout:'fixed'}}>
          <thead>
            <tr>
              <th>Staff Name</th>
              <th>Salary</th>
              <th>A.Leave</th>
              <th>Lv.Taken</th>
              <th>Lv.Cut</th>
              <th>PF</th>
              <th>ESI</th>
              <th>Insurance</th>
              <th>O.cut</th>
              <th>Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {(payrollData === undefined ||
              payrollData === null ||
              payrollData.length === 0) && (
              <tr>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>--</td>
              </tr>
            )}

            {payrollData?.length > 0 &&
              payrollData.map((data, i) => {
                // {console.log(data)}
                // let x=data.payscale?.leave_cut*(data.payscale?.allowed_leave-)
                return (
                  <tr key={i}  ref={(e)=>(formRef1.current[i] = e)}>
                    
                    <td>
                      {/* <input
                        onChange={(e) => handleChange(e, i)}
                        type="text"
                        name="name"
                        value={data.name}
                        disabled
                      /> */}
                      <div>
                        {data.name}
                      </div>
                    </td>
                    <td>
                      <input
                        onChange={(e) => handleChange(e, i)}
                        type="text"
                        name="salary"
                        value={data.payscale?.salary}
                        placeholder={
                          data.payscale?.salary ? data.payscale?.salary : "--"
                        }
                        onKeyDown={handleKeyDown1}
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) => handleChange(e, i)}
                        type="text"
                        name="allowed_leave"
                        value={data.payscale?.allowed_leave}
                        placeholder={
                          data.payscale?.allowed_leave
                            ? data.payscale?.allowed_leave
                            : "--"
                        }
                        onKeyDown={handleKeyDown1}
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) => handleChange(e, i)}
                        type="text"
                        name="leave_count"
                        value={data.leave_count}
                        placeholder={data.leave_count ? data.leave_count : "--"}
                        onKeyDown={handleKeyDown1}
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) => handleChange(e, i)}
                        type="text"
                        name="leave_cut_amount"
                        value={data.leave_cut_amount}
                        placeholder={
                          data.leave_cut_amount
                            ? data.leave_cut_amount
                            : "--"
                        }
                        onKeyDown={handleKeyDown1}
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) => handleChange(e, i)}
                        type="text"
                        name="pf"
                        value={data.payscale?.pf}
                        placeholder={data.payscale?.pf ? data.payscale?.pf : "--"}
                        onKeyDown={handleKeyDown1}
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) => handleChange(e, i)}
                        type="text"
                        name="esi"
                        value={data.payscale?.esi}
                        placeholder={
                          data.payscale?.esi ? data.payscale?.esi : "--"
                        }
                        onKeyDown={handleKeyDown1}
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) => handleChange(e, i)}
                        type="text"
                        name="insurance"
                        value={data.payscale?.insurance}
                        placeholder={
                          data.payscale?.insurance
                            ? data.payscale?.insurance
                            : "--"
                        }
                        onKeyDown={handleKeyDown1}
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) => handleChange(e, i)}
                        type="text"
                        name="other"
                        value={data.payscale?.other}
                        placeholder={
                          data.payscale?.other ? data.payscale?.other : "--"
                        }
                        onKeyDown={handleKeyDown1}
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) => handleChange(e, i)}
                        type="text"
                        name="net_salary"
                        value={data.net_salary}
                        placeholder={data.net_salary ? data.net_salary : "--"}
                        onKeyDown={handleKeyDown1}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={2} className="text-end">Total salary</td>
              {/* <td>Salary</td> */}
              <td>{totalSalary}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-2">
        <div
          className="col-1 btn me-3 text-light"
          style={{ backgroundColor: "#4A00A8" }}
        >
          {"<"}Previous
        </div>
        <div
          className="col-1 btn text-light"
          style={{ backgroundColor: "#4A00A8" }}
        >
          Next{">"}
        </div>
      </div>
      <div className="d-flex justify-content-end align-items-center">
        <div className="btn col-1 me-3 text-light bg-dark py-0 px-1"
        onClick={()=>handleResetAll()}>Reset</div>
        <div
          className="btn col-1 me-3 text-light bg-dark py-0 px-1"
          onClick={handleSave}
        >
          {edit?"Update":"Save"}
        </div>
      </div>
    </div>
  );
};

export default PayrollTransactionDetails;
