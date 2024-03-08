import React, { useEffect, useState } from 'react'
import ChartOfAccEntry from './components/ChartOfAccEntry'
import ChartOfAccTable from './components/ChartOfAccTable'
import { useReportsServices } from '../../../services/reports/reports'
import './chartOfAcc.css'

const ChartOfAccount = () => {
   const {getChartOfAccount} = useReportsServices()
   const [accountChart, setAccountChart] = useState([])
   const [params, setParams] = useState(
      {
         to_date: null,
         types: null,
         groups: null
      }
   )

   useEffect (()=>{
      getData()
   },[params])

   const getData = async ()=>{
      try{
         const response = await getChartOfAccount(params)
         if (response.success){
            setAccountChart(response.data)
         }
      }
      catch(err){}
   }
   return (
      <div>
         <div className="item_add">
            <div className="itemList_header row mx-0">
               <div className="page_head ps-4 d-flex justify-content-between">
                  <div>
                     <div className="fw-600 fs-5">Chart of Accounts</div>
                     <div className="page_head_items mb-2 mt-2">
                        <div
                /* onClick={()=>navigate("/stock-reports")}  */ className={`page_head_customer active`}
                        >
                           Chart of Accounts
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
               <ChartOfAccEntry/>
               <ChartOfAccTable {...{accountChart,params, setParams}}/>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ChartOfAccount