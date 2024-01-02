import React, { useEffect, useState } from 'react'
import StaffAttendanceReport from './components/StaffAttendanceReport'
import StaffSalaryReport from './components/StaffSalaryReport'
import "./StaffSalaryAttendance.css";
import { useReportsServices } from '../../../services/reports/reports';
import { useLocation, useNavigate } from 'react-router';
import { Form, Modal } from "react-bootstrap";
import { BsFiletypePdf, BsWhatsapp } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
import { TfiEmail, TfiPrinter } from "react-icons/tfi";
import searchIcon from "../../../assets/icons/search.png";
import StaffAttendanceModal from './components/StaffAttendanceModal';


const StaffSalaryAttendance = () => {
  const [show,setShow]=useState(false)
  const [staffAttendance,setStaffAttendance]=useState()
  const [staffSalary,setStaffSalary]=useState()
  const [paramsToReport,setParamsToReport] = useState({
    from_date:(new Date().toISOString().slice(0,10)),
    to_date:(new Date().toISOString().slice(0,10)),
  })
  const navigate = useNavigate();
  const location = useLocation();

  const{getStaffAttendance,getStaffSalary}=useReportsServices()
  const getData =async()=>{
    try{
      const response = await getStaffAttendance(paramsToReport)
      if (response?.success){
        setStaffAttendance(response.data)
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (location.pathname === '/StaffAttendance'){
      getData();
    }else{
      getSalaryData();
    } 
  }, [paramsToReport]);

  const getSalaryData =async()=>{
    try{
      let data={}
      data.from_date=paramsToReport.from_date
      data.end_date=paramsToReport.to_date
      const response = await getStaffSalary(data)
      if (response?.success){
        setStaffSalary(response.data)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
      if (e.target.value === "") {
        setParamsToReport({ ...paramsToReport, [e.target.name]: null });
      } else {
        setParamsToReport({ ...paramsToReport, [e.target.name]: e.target.value });
      }
    };

    const [searchedList, setSearchedList] = useState([]);

    useEffect(() => {
        setSearchedList(location.pathname== "/StaffAttendance" ? staffAttendance :staffSalary);
    }, [staffAttendance,staffSalary]);

    const handleSearch = async (e) => {
        try {
        let tempData,
            tempList = location.pathname== "/StaffAttendance" ? staffAttendance :staffSalary;
        if (location.pathname== "/StaffAttendance" ? staffAttendance :staffSalary) {
            let value = e.target.value.toLocaleLowerCase();
            if (value != "") {
            if (location.pathname== "/StaffAttendance" ? staffAttendance.length > 0: staffSalary.length > 0 ) {
                tempData = tempList?.filter((x) => {
                console.log(x);
                let searchInString = `${
                    x.staff_name?.toLocaleLowerCase() +
                    x.staff_code?.toLocaleLowerCase() +
                    " " +
                    x.voucher_number?.toLocaleLowerCase()
                }`;
                let search = searchInString?.includes(value);
                if (search) {
                    return true;
                }
                });
                setSearchedList(tempData);
            }
            } else {
            setSearchedList(location.pathname== "/StaffAttendance" ? staffAttendance :staffSalary);
            }
        }
        } catch {}
    };
  return (
    <div className="item_add">
    <div className="itemList_header row mx-0">
      <div className="page_head ps-4 d-flex justify-content-between">
        <div>
          <div className="fw-600 fs-5">Staff Salary and Attendance Report</div>
          <div className="page_head_items mb-2 mt-2">
            <div
              /* onClick={()=>navigate("/stock-reports")}  */ className={`page_head_customer active`}
            >
             {location.pathname == "/StaffAttendance" && "active" ? "Staff Attendance Report" : "Staff Salary Report"} 
            </div>
          </div>
        </div>
        <div className="d-flex px-0 align-items-center customer-add-btn">
          {/* <div onClick={()=>{navigate("/customer-add");setToEdit(false)}} className="btn btn-primary add-btn px-0">+ &nbsp; Add Customer</div> */}
        </div>
      </div>
    </div>
    <div className="p-3">
      <div className="p-2 bg-light rounded-1 px-3">
      <div className="d-flex row mx-0 justify-content-start align-items-center">
                <div className="col-12 mt-1 d-flex justify-content-start px-0">
                    <div
                        style={{ background: "#4B4B4B" }}
                        className="reports-btn btn rounded-1 col-1 col-2 py-0 me-3 mx-0"
                    >
                        <BsFiletypePdf className="me-2 text-" size={18} />
                        PDF
                    </div>
                    <div
                        style={{ background: "#4B4B4B" }}
                        className="reports-btn btn rounded-1 col-1 col-2 py-0 me-3"
                    >
                        <RiFileExcel2Line className="me-2" size={18} />
                        Excel
                    </div>
                    <div
                        style={{ background: "#4B4B4B" }}
                        className="reports-btn btn rounded-1 col-1 col-2 py-0 me-3"
                    >
                        <TfiPrinter size={18} className="me-2 h-100" />
                        Print
                    </div>
                    <div
                        style={{ background: "#4B4B4B" }}
                        className="reports-btn btn rounded-1 col-1 col-2 py-0 me-3"
                    >
                        <TfiEmail size={18} className="me-2 h-100" />
                        Email
                    </div>
                    <div
                        style={{ background: "#4B4B4B" }}
                        className="reports-btn btn rounded-1 col-1 col-2 py-0"
                    >
                        <BsWhatsapp size={18} className="me-2 h-100" />
                        Whatsapp
                    </div>
                </div>
                <div className="row mt-2 col-12 mx-0 px-0">
                    <Form.Group className="col-3 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
                        <Form.Label className="col-2 purchase-input-label align-middle">
                            From
                        </Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="from_date"
                            value={
                            paramsToReport.from_date || new Date().toISOString.slice(0, 10)
                            }
                            className="purchase-input-text me-2"
                            placeholder="Document number"
                            type="date"
                        />
                    </Form.Group>
                    <Form.Group className="col-3 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
                        <Form.Label className="col-2 purchase-input-label align-middle">
                            Upto
                        </Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="to_date"
                            value={
                                paramsToReport.to_date || new Date().toISOString.slice(0, 10)
                            }
                            className="purchase-input-text me-2"
                            placeholder="Document number"
                            type="date"
                        />
                    </Form.Group>
                </div>
            </div>
            <div>
                <div className='d-flex justify-content-start mt-2'>
                    <div className={`py-3 px-3 rounded-top-2 ${location.pathname == "/StaffAttendance" ? 'TabHead' : 'border border-secondary'  }`}
                                onClick={() => {
                                    navigate("/StaffAttendance");
                                    setSearchedList('');
                                    setStaffAttendance('');
                                    paramsToReport.from_date=(new Date().toISOString().slice(0,10));
                                    paramsToReport.to_date=(new Date().toISOString().slice(0,10));
                                }}
                            >Staff Attendance</div>
                    <div className={`py-3 px-3 rounded-top-2 ${location.pathname == "/StaffSalary" ? 'TabHead' : 'border border-secondary'  }`}
                    onClick={() => {
                      navigate("/StaffSalary");
                      setSearchedList('');
                      setStaffSalary('');
                      paramsToReport.from_date=(new Date().toISOString().slice(0,10));
                      paramsToReport.to_date=(new Date().toISOString().slice(0,10));
                  }}
                    >Staff Salary</div>
                </div>
                <div className='rounded-end-2 rounded-bottom-0 ' style={{backgroundColor:'black'}}>
                    <div className='d-flex justify-content-end'>
                        <div className="col-2 col-3 p-2 stock-ledger-search d-flex align-items-center me-1">
                            <div className="item_seach_bar_cont rounded-2 col-12">
                                <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
                                <input
                                    onChange={handleSearch}
                                    className="item_search_bar rounded-2 border-0 py-1"
                                    placeholder="Search"
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                </div>
               {location.pathname == "/StaffAttendance" ? <StaffAttendanceReport {...{staffAttendance,searchedList,setShow,show}}/>:
                <StaffSalaryReport  {...{staffSalary,searchedList}}/>}
            </div>
      </div>
    </div>
    <Modal show={show} centered size='md' onHide={() => setShow(false)}>
        <StaffAttendanceModal {...{show}}/>
    </Modal>
  </div>
  )
}

export default StaffSalaryAttendance