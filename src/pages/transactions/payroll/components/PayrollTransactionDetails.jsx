import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { MdMovieEdit } from "react-icons/md";
import { useNavigate } from "react-router";
import "sweetalert2";
import { usePayrollTransactionServices } from "../../../../services/transactions/payrollTransactionServices";
import Swal from "sweetalert2";
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
  const [narration, setNarration] = useState("Salary");

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
          payscale:{
            pf:payData.pf,
            salary:payData.salary,
            esi:payData.esi,
            other:payData.other,
            allowed_leave:payData.allowed_leave,
            leave_cut:payData.leave_cut,
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

  const handleChange = (e, i) => {
    let tempPayData = [...payrollData];
    let changedData = tempPayData[i];
    if (e.target.name.match(/name|net_salary|leave_count/))
      changedData = { ...changedData, [e.target.name]: e.target.value };
    else {
      let payScaleChange = {
        ...changedData.payscale,
        [e.target.name]: e.target.value,
      };
      changedData = { ...changedData, payscale: payScaleChange };
    }

    let netSalary;
    if (e.target.name !== "net_salary") {
      netSalary =
        (parseFloat(changedData.payscale?.salary) || 0) -
          ((parseFloat(changedData.leave_count || 0) -
            parseFloat(changedData.payscale?.allowed_leave || 0)) *
            parseFloat(changedData.payscale?.leave_cut || 0) +
            parseFloat(changedData.payscale?.pf || 0) +
            parseFloat(changedData.payscale?.esi || 0) +
            parseFloat(changedData.payscale?.insurance || 0) +
            parseFloat(changedData.payscale?.other || 0)) || 0;
    }
    tempPayData.splice(i, 1, { ...changedData, net_salary: netSalary });
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
        leave_cut: data.payscale?.leave_cut,
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
          width: "85rem",
          overflowX: "hidden",
          overflowY: "scroll",
        }}
        className="mt-3"
      >
        <table className="PayrollTable w-100">
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
                return (
                  <tr key={i}>
                    <td>
                      <input
                        onChange={(e) => handleChange(e, i)}
                        type="text"
                        name="name"
                        value={data.name}
                      />
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
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) => handleChange(e, i)}
                        type="text"
                        name="leave_count"
                        value={data.leave_count}
                        placeholder={data.leave_count ? data.leave_count : "--"}
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) => handleChange(e, i)}
                        type="text"
                        name="leave_cut"
                        value={data.payscale?.leave_cut}
                        placeholder={
                          data.payscale?.leave_cut
                            ? data.payscale?.leave_cut
                            : "--"
                        }
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) => handleChange(e, i)}
                        type="text"
                        name="pf"
                        value={data.payscale?.pf}
                        placeholder={data.payscale?.pf ? data.payscale?.pf : "--"}
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
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) => handleChange(e, i)}
                        type="text"
                        name="net_salary"
                        value={data.net_salary}
                        placeholder={data.net_salary ? data.net_salary : "--"}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
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
