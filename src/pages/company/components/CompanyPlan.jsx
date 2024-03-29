import { TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useCompanyServices } from "../../../services/controller/companyServices";
import Swal from "sweetalert2";
import { companyModules } from "../data/initialData";
import { useNavigate } from "react-router";

export const CompanyPayment = (props) => {
  const { setActive, companyId, moduleCodeList, setModuleCodeList } = props;
  const [showModules, setShowModules] = useState(false)
  const [loading, setLoading] = useState(false)
  const [companyPlan, setCompanyPlan] = useState({
    renewal_date: null,
    renewal_time: null,
    extended_date: null,
    staff_limit: null,
    modules: [],
  });

  const navigate = useNavigate()

  const { postCompanyPlan } = useCompanyServices()

  const handleChange = (e, date_name) => {
    const name = e?.target?.name;
    let value = e?.target?.value;
    if (date_name === "renewal_time") {
      setCompanyPlan((data) => ({ ...data, renewal_time: dayjs(e).format('hh:mm') }));
    } else if (date_name) {
      console.log(dayjs(e).format('YYYY-MM-DD'))
      setCompanyPlan((data) => ({ ...data, [date_name]: dayjs(e).format('YYYY-MM-DD') }));
    }
    else if (value === "") setCompanyPlan((data) => ({ ...data, [name]: null }));
    else setCompanyPlan((data) => ({ ...data, [name]: value }));
  };

  const handleModuleSelection = (data) => {
    let tempList = [...moduleCodeList]
    let filteredList = []
    companyModules.forEach(item => {
      if ((item.code === data.code || item.code === data.parent)||(data.code === item.parent)) {
        filteredList.push({ code:item.code,parent:item.parent })
      }
    })
    // console.log(filteredList.every(i=>tempList.findIndex(x=>x.code==i.code)>-1))  
    if(filteredList.some(i=>tempList.findIndex(x=>x.code==i.code)>-1) && !data?.parent){
      tempList = tempList.filter(x=>filteredList.findIndex(i=>i.code===x.code)==-1)
    }else if(tempList.some(i=>i.code==data.code)&& data?.parent){
      tempList = tempList.filter(x=>x.code!==data.code)
    }else{
      tempList = [...tempList,...filteredList]
    }
    
    setModuleCodeList([...tempList])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (moduleCodeList?.length < 0) {
      Swal.fire('Warning', "Please select at least 1 module.", 'warning')
      return 0
    }
    try {
      let tempCompanyPlan = {
        ...companyPlan,
        modules: moduleCodeList.map(data => ({ code: data.code, "is_active": true }))
      }
      setLoading(true)
      const response = await postCompanyPlan(companyId, tempCompanyPlan)
      if (response.success) {
        Swal.fire('Success', '', 'success')
        navigate('/')
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
      let message = "Something went wrong. Please try again later"
      if (typeof err?.response?.data?.error === "object")
        message = Object.values(err.response.data.error)[0]
      Swal.fire('Error', message, 'error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="company-details-cont row justify-content-between mx-0 my-2 p-0">
      <div className="comp-details-cont-1 col-5 col-6 border rounded-2">
        <DatePicker
          slotProps={{ textField: { size: 'small', required: true } }}
          name="renewal_date"
          value={companyPlan.renewal_date ? dayjs(companyPlan.renewal_date).format('YYYY-MM-DD') : null}
          format="DD/MM/YYYY"
          onChange={(val) => handleChange(val, 'renewal_date')}
          className="company-input-field my-3"
          label="Renewal Date"
          
          variant="outlined"
        />
        <TimePicker
          slotProps={{ textField: { size: 'small', required: true } }}
          name="renewal_time"
          value={companyPlan.renewal_time ? dayjs(companyPlan.renewal_time, 'HH:mm') : null}
          format="HH:mm"
          onChange={(val) => handleChange(val, 'renewal_time')}
          className="company-input-field my-3"
          label="Renewal Time"
          variant="outlined"
        />
        <DatePicker
          slotProps={{ textField: { size: 'small', required: true } }}
          name="extended_date"
          value={companyPlan.extended_date ? dayjs(companyPlan.extended_date).format('YYYY-MM-DD') : null}
          format="DD/MM/YYYY"
          onChange={(val) => handleChange(val, 'extended_date')}
          className="company-input-field my-3"
          label="Extension Date"
          variant="outlined"
        />
        <TextField
          // required
          slotProps={{ textField: { size: 'small' } }}
          type="number"
          name="staff_limit"
          value={companyPlan.staff_limit}
          onChange={handleChange}
          className="company-input-field my-3"
          size="small"
          label="Staff Limit"
          variant="outlined"
        />
      </div>
      <div className="comp-details-cont-1 col-5 col-6 border rounded-2">
        <div className="d-flex align-items-center gap-3 fs-5">
          Modules{" "}
          <div onClick={() => setShowModules(true)} className="company-plan-btn btn module">Choose Modules</div>{" "}
        </div>
        <div className="module-cont w-100">
          {companyModules.map(data => {

            return moduleCodeList.findIndex(item => item.code === data.code) > -1 && <div onClick={() => handleModuleSelection(data)}
              className={`comp-module-item active`}>
              <img src={data.icon} width={'25rem'} alt='' />
              {data.name}
            </div>
          })}</div>
      </div>
      <div className="w-100 row mx-0 justify-content-end gap-3 pe-3 pt-3">
        <div
          onClick={() => setActive(1)}
          className="company-add-btn clear btn col-1 col-2"
        >
          Previous
        </div>
        <button
          type="submit"
          disabled={loading}
          className="company-add-btn next btn col-1 col-2"
        >
          Done {/* &nbsp;&nbsp;{">"} */}
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
              className={`comp-module-item ${moduleCodeList.findIndex(item => item.code === data.code) > -1 && 'active'}`}>
              <img src={data.icon} width={'25rem'} alt='' />
              <div className="text-center">{data.name}</div>
            </div>)}
          </div>
          <div onClick={() => setShowModules(false)} className="btn comp-module-btn px-5 fs-5">Done</div>
        </div>
      </Modal>
    </form>
  );
};
