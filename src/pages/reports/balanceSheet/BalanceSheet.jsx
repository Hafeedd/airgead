import React, { useState } from 'react'
import './balanceSheet.css'
import BalanceSheetEntry from './components/BalanceSheetEntry'
import BalanceSheetTables from './components/BalanceSheetTables'
import { useReportsServices } from '../../../services/reports/reports'


const BalanceSheet = () => {

    const {getBalanceSheet} = useReportsServices()

    const [balanceSheetData, setBalanaceSheetData] = useState([])

    const [params, setParams] = useState([{
        "from_date": null,
        "to_date": null
    }])
    return (
        <div className="item_add">
            <div className="itemList_header row mx-0">
                <div className="page_head ps-4 d-flex justify-content-between">
                    <div>
                        <div className="fw-600 fs-5">Balance Sheet</div>
                        <div className="page_head_items mb-2 mt-2">
                            <div
                /* onClick={()=>navigate("/stock-reports")}  */ className={`page_head_customer active`}
                            >
                                Balance Sheet
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
                    <BalanceSheetEntry {...{params, setParams}}/>
                    <BalanceSheetTables/>
                </div>
            </div>
        </div>
    )
}

export default BalanceSheet