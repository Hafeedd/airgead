import React, { useState, useEffect } from 'react'
import TrialBalanceTopside from './components/TrialBalanceTopside'
import TrialBalanceBottom from './components/TrialBalanceBottom'
import './components/trialBalance.css'
import { useReportsServices } from '../../../services/reports/reports'

const TrialBalance = () => {
    const [params, setParams] = useState({to_date:new Date()?.toISOString()?.slice(0, 10)}
    )
    const {getTrialBalance} = useReportsServices()
    const [trialBalance, setTrialBalance] = useState([])
    
    useEffect(()=>{
        getData()
    },[params.to_date])

    const getData = async () => {
        try{
            const date = {to_date:params.to_date?.split('-')?.reverse()?.join('-')}
            const response = await getTrialBalance(date)
            if (response.success){
                setTrialBalance(response.data)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    // const getData = async () => {
    //     const response = await getTrialBalance(params)
    //     let tempList = []
    //     if (response?.success){
    //         response.data.map(item =>{
    //             tempList.push(item)
    //         })
    //         setTrialBalance(tempList)
    //     }
    //     return response.data
    // }

 

    return (
        <>
            <div className="item_add">
                <div className="itemList_header row mx-0">
                    <div className="page_head ps-4 d-flex justify-content-between">
                        <div>
                            <div className="fw-600 fs-5">Trial Balance</div>
                            <div className="page_head_items mb-2 mt-2">
                                <div
                /* onClick={()=>navigate("/stock-reports")}  */ className={`page_head_customer active`}
                                >
                                    Trial Balance
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
                       <TrialBalanceTopside {...{params, setParams}}/>
                       <TrialBalanceBottom {...{trialBalance}}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrialBalance