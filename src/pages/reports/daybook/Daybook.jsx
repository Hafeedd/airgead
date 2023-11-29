import './daybook.css'
import React, { useEffect, useState } from "react";
import { DaybookEntry } from "./components/DaybookEntry";
import { DayBookTable } from "./components/DayBookTable";
import { useReportsServices } from "../../../services/reports/reports";

export const Daybook = () => {
  const [dayBookList, setDayBookList] = useState([])
  const [params, setParams] = useState({
    from_date:null,
    to_date:null,
  })

  const {getDayBook} = useReportsServices()

  useEffect(()=>{
    getData()
  },[params, ])

  const getData = async () =>{
    try{
      const response = await getDayBook(params) 
      if(response.success){
        setDayBookList(response.data)
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div>
            <div className="fw-600 fs-5">Day Book</div>
            <div className="page_head_items mb-2 mt-2">
              <div
                /* onClick={()=>navigate("/stock-reports")}  */ className={`page_head_customer active`}
              >
                Details
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
            <DaybookEntry {...{params,setParams}}/>
            <DayBookTable {...{dayBookList}}/>
        </div>
      </div>
    </div>
  );
};
