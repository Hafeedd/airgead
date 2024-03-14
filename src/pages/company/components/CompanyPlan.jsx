import { TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export const CompanyPayment = (props) => {
  const { setActive, companyId, setCompanyId } = props;
  const [showModules, setShowModules] = useState(false)
  const [moduleCodeList, setModuleCodeList] = useState([])
  const [companyPlan, setCompanyPlan] = useState({
    renewal_date: null,
    renewal_time: null,
    extended_date: null,
    staff_limit: null,
    modules: [],
  });

  const companyModules = [
    { name: 'Purchase', code: 100, icon: 'https://icons.foxa.in/media/icons/cart-shopping-fast.svg', primary: 'YES' },
    { name: 'Sales', code: 101, icon: 'https://icons.foxa.in/media/icons/point-of-sale-bill.svg', primary: 'YES' },
    { name: 'Purchase Return', code: 102, icon: 'https://icons.foxa.in/media/icons/cart-minus.svg', paretn: 100, primary: 'YES' },
    { name: 'Sales Return', code: 103, icon: 'https://icons.foxa.in/media/icons/undo.svg', parent: 101, primary: 'YES' },
    { name: 'Payment', code: 104, icon: 'https://icons.foxa.in/media/icons/document-signed_p9I0WXo.svg', primary: 'YES' },
    { name: 'Receipt', code: 105, icon: 'https://icons.foxa.in/media/icons/point-of-sale-bill.svg', primary: 'YES' },
    { name: 'Stock Journal', code: 106, icon: 'https://icons.foxa.in/media/icons/document-signed_p9I0WXo.svg', primary: 'YES' },
    { name: 'Account Journal', code: 107, icon: 'https://icons.foxa.in/media/icons/document-signed_p9I0WXo.svg', primary: 'YES' },
    { name: 'Staff', code: 108, icon: 'https://icons.foxa.in/media/icons/document-signed_p9I0WXo.svg', primary: 'YES' },
    { name: 'Staff Attendance', code: 109, icon: 'https://icons.foxa.in/media/icons/document-signed.svg', parent: 108, primary: 'YES' },
    { name: 'Payroll', code: 110, icon: 'https://icons.foxa.in/media/icons/cost-per-lead_11336391.png', parent: 108, primary: 'YES' },
    { name: 'Cheque Register', code: 111, icon: 'https://icons.foxa.in/media/icons/cost-per-lead_11336391.png', primary: 'YES' },
    { name: 'Production', code: 112, icon: 'https://icons.foxa.in/media/icons/product-management_12525462.png', primary: 'YES' }
  ]

  const handleChange = (e,date_name) => {
    const name = e?.target?.name;
    let value = e?.target?.value;
    // console.log(name,value)
    if (date_name==="renewal_time") {
      setCompanyPlan((data) => ({ ...data, renewal_time: dayjs(e).format('hh:mm') }));
    }else if(date_name){
      console.log(dayjs(e).format('DD/MM/YYYY'))
      setCompanyPlan((data) => ({ ...data, [date_name]: dayjs(e).format('DD/MM/YYYY') }));
    }
    else if (value === "") setCompanyPlan((data) => ({ ...data, [name]: null }));
    else setCompanyPlan((data) => ({ ...data, [name]: value }));
  };

  const handleModuleSelection = (data) => {
    let tempList = [...moduleCodeList]
    let ind = tempList.findIndex(item => item === data.code)
    if (ind > -1) tempList.splice(ind, 1)
    else tempList.push(data.code)

    setModuleCodeList([...tempList])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(companyPlan)
  }

  return (
    <form onSubmit={handleSubmit} className="company-details-cont row justify-content-between mx-0 my-2 p-0">
      <div className="comp-details-cont-1 col-5 col-6 border rounded-2">
        <DatePicker
          slotProps={{ textField: { size: 'small' } }}
          name="renewal_date"
          value={companyPlan.renewal_date?dayjs(companyPlan.renewal_date).format('DD/MM/YYYY'):null}
          onChange={(val)=>handleChange(val,'renewal_date')}
          className="company-input-field my-3"
          size="small"
          id="outlined-basic"
          label="Renewal Date"
          variant="outlined"
        />
        <TimePicker
          slotProps={{ textField: { size: 'small' } }}
          name="renewal_time"
          // value={companyPlan.renewal_time}
          value={companyPlan.renewal_time?dayjs(companyPlan.renewal_time, 'HH:mm') : null}
          format="HH:mm"
          onChange={(val)=>handleChange(val,'renewal_time')}
          className="company-input-field my-3"
          size="small"
          id="outlined-basic"
          label="Renewal Time"
          variant="outlined"
        />
        <DatePicker
          slotProps={{ textField: { size: 'small' } }}
          name="extended_date"
          value={companyPlan.extended_date?dayjs(companyPlan.extended_date).format('DD/MM/YYYY'):null}
          onChange={(val)=>handleChange(val,'extended_date')}
          className="company-input-field my-3"
          size="small"
          id="outlined-basic"
          label="Extension Date"
          variant="outlined"
        />
        <TextField
          slotProps={{ textField: { size: 'small' } }}
          type="number"
          name="staff_limit"
          value={companyPlan.staff_limit}
          onChange={handleChange}
          className="company-input-field my-3"
          size="small"
          id="outlined-basic"
          label="Staff Limit"
          variant="outlined"
        />
      </div>
      <div className="comp-details-cont-1 col-5 col-6 border rounded-2">
        <div className="d-flex align-items-center gap-3 fs-5">
          Modules{" "}
          <div onClick={() => setShowModules(true)} className="company-plan-btn btn module">Choose Modules</div>{" "}
        </div>
        <div className="module-cont">
          {companyModules.map(data => {

            return moduleCodeList.findIndex(item => item === data.code) > -1 && <div onClick={() => handleModuleSelection(data)}
              className={`comp-module-item active`}>
              <img src={data.icon} width={'25rem'} alt='module_image' />
              {data.name}
            </div>
          })}</div>
      </div>
      <div className="w-100 row mx-0 justify-content-end gap-3 pe-3 pt-3">
        <div
          onClick={() => setActive((data) => (data > 1 ? data - 1 : data))}
          className="company-add-btn clear btn col-1 col-2"
        >
          Previous
        </div>
        <button
          // onClick={() => setActive((data) => (data < 3 ? data + 1 : data))}
          // onClick={handleSubmit}
          type="submit"
          className="company-add-btn next btn col-1 col-2"
        >
          Next &nbsp;&nbsp;{">"}
        </button>
      </div>
      <Modal
        show={showModules}
        centered
        size="lg"
        onHide={() => setShowModules(false)}
      >
        <div className='comp-plan-module-modal'>
          <div className='module-items'>
            {companyModules.map(data => <div onClick={() => handleModuleSelection(data)}
              className={`comp-module-item ${moduleCodeList.findIndex(item => item === data.code) > -1 && 'active'}`}>
              <img src={data.icon} width={'25rem'} alt='module_image' />
              {data.name}
            </div>)}
          </div>
          <div onClick={() => setShowModules(false)} className="btn comp-module-btn px-5 fs-5">Done</div>
        </div>
      </Modal>
    </form>
  );
};
