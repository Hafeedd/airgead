import './stockLedger.css'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { ReportDetails } from './components/ReportDetails';
import { useReportsServices } from "../../../services/reports/reports";
import { StockTable } from "./components/StockTable";

export const StockLedger = () => {
    const [stockList, setStockList] = useState([])
    const [paramsToReport, setParamsToReport] = useState({
      from_date:(new Date().toISOString().slice(0,10)),
      to_date:(new Date().toISOString().slice(0,10)),
      item_code:null,
    })
  
    const {getStockLedger, batchWiseStockReport} = useReportsServices()
  
    useEffect(()=>{
      getData()
    },[paramsToReport,])
  
    const getData = async () =>{
      try{
        const response = await getStockLedger(paramsToReport)
        const response2 = await batchWiseStockReport(paramsToReport)        
        if(response2.success || true){
          setStockList(response2.data)
        }
      }catch(err){
        console.log(err)
      }
    }

    const navigate = useNavigate()

  return (
    <div className='item_add'>
    <div className="itemList_header row mx-0">
        <div className="page_head ps-4 d-flex justify-content-between">
            <div>
            <div className='fw-600 fs-5'>Stock Ledger</div>
            <div className='page_head_items mb-2 mt-2'>
                <div onClick={()=>navigate("/stock-reports")} className={`page_head_customer active`}>Details</div>
               
            </div>
            </div>
            <div className="d-flex px-0 align-items-center customer-add-btn">
                {/* <div onClick={()=>{navigate("/customer-add");setToEdit(false)}} className="btn btn-primary add-btn px-0">+ &nbsp; Add Customer</div> */}
            </div>
        </div>
    </div>
        <div className='p-3'>
        <div className="stock-jdetails-cont col-12 p-1 ps-3 rounded-1 w-100 bg-light h-100 pe-4">
            <ReportDetails from={"stock"} {...{
            stockList, setStockList,
            paramsToReport, setParamsToReport,}}/>
            <StockTable {...{
            stockList, setStockList,
            paramsToReport, setParamsToReport,
        }}/>
        </div>
        </div>
</div>
  )
}
