import React, { useEffect, useState } from 'react'
import TraidProfitLossEntry from './components/TraidProfitLossEntry'
import TraidProfitLossTable from './components/TraidProfitLossTable'
import { useReportsServices } from '../../../services/reports/reports'

const TraidProfitLoss = () => {
    const [profitLossData, setProfitLossData] = useState()
    const {getTaridProfitLoss} = useReportsServices()
    const [params, setParams] = useState({
        from_date: new Date()?.toISOString()?.slice(0,10),
        to_date: new Date()?.toISOString()?.slice(0,10)
    })

    const getData = async () =>{
        try{
            const date = {

                to_from:params.from_date?.split('-')?.reverse()?.join('-'),
                to_date:params.to_date?.split('-')?.reverse()?.join('-'),
            }
            const response = await getTaridProfitLoss(date);
            if (response.success){
                setProfitLossData(response.data)
            }
        }
        catch(err){}
    }

    useEffect(()=>{
        getData()
    },[params])
    return (
        <>
            <div className="item_add">
                <div className="itemList_header row mx-0">
                    <div className="page_head ps-4 d-flex justify-content-between">
                        <div>
                            <div className="fw-600 fs-5">Traid Profit And Loss</div>
                            <div className="page_head_items mb-2 mt-2">
                                <div
                /* onClick={()=>navigate("/stock-reports")}  */ className={`page_head_customer active`}
                                >
                                    Traid Profit And Loss
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
                        <TraidProfitLossEntry {...{params, setParams}}/>
                        <TraidProfitLossTable {...{profitLossData, params}}/>

                    </div>
                </div>
            </div>
        </>
    )
}

export default TraidProfitLoss