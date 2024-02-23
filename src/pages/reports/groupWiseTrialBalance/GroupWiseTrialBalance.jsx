import React, { useEffect, useState } from 'react'
import GroupTrialBalEntry from './components/GroupTrialBalEntry'
import GroupTrialBalTable from './components/GroupTrialBalTable'
import { useReportsServices } from '../../../services/reports/reports'

const GroupWiseTrialBalance = () => {
    const {getGroupTrialBalance} = useReportsServices()
    const [params, setParams] = useState({to_date:new Date()?.toISOString()?.slice(0,10)})
    const [groupTrialBal, setGroupTrialBal] = useState([])

    const getData = async () => {
        const date = {to_date:params.to_date?.split('-')?.reverse()?.join('-')}
        const response = await getGroupTrialBalance(date)
        if (response.success){
            setGroupTrialBal(response.data)
        }
    }

    useEffect(()=>{
        getData()
    },[params.to_date])
  return (
    <>
    <div className="item_add">
        <div className="itemList_header row mx-0">
            <div className="page_head ps-4 d-flex justify-content-between">
                <div>
                    <div className="fw-600 fs-5">Group Wise Balance Sheet</div>
                    <div className="page_head_items mb-2 mt-2">
                        <div
        /* onClick={()=>navigate("/stock-reports")}  */ className={`page_head_customer active`}
                        >
                            Group Wise Balance Sheet
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
                <GroupTrialBalEntry {...{params, setParams}}/>
                <GroupTrialBalTable {...{groupTrialBal}}/>
            </div>
        </div>
    </div>
</>
  )
}

export default GroupWiseTrialBalance