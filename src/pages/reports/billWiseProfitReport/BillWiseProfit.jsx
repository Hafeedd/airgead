import React, { useEffect, useState } from 'react'
import './billWiseProfit.css'
import BillWiseProfitEntry from './components/BillWiseProfitEntry'
import BillWiseProfitTable from './components/BillWiseProfitTable'
import {useReportsServices} from '../../../services/reports/reports';

const BillWiseProfit = () => {

    const [billWiseProfit, setBillWiseProfit] = useState([])
    const [params, setParams] = useState({
        from_date: new Date().toISOString().slice(0,10),
        to_date:new Date().toISOString().slice(0,10)
    })

    const {getBillWiseProfit} = useReportsServices()

    useEffect(()=>{
        getData()
    },[params])

    const getData = async () =>{
        try{
            const response = await getBillWiseProfit(params)
            if (response.success){
                setBillWiseProfit(response.data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    console.log(billWiseProfit)



    return (
        <div className="item_add">
            <div className="itemList_header row mx-0">
                <div className="page_head ps-4 d-flex justify-content-between">
                    <div>
                        <div className="fw-600 fs-5">Bill Wise Profit Report</div>
                        <div className="page_head_items mb-2 mt-2">
                            <div
                /* onClick={()=>navigate("/stock-reports")}  */ className={`page_head_customer active`}
                            >
                                Bill Wise Profit Report
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
                    <BillWiseProfitEntry {...{
                        params, setParams
                    }}/>
                    <BillWiseProfitTable {...{billWiseProfit, setBillWiseProfit}}/>
                </div>
            </div>
        </div>
    )
}

export default BillWiseProfit
