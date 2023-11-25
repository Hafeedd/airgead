import React, { useEffect, useState } from 'react'
import CashBookEntry from './components/CashBookEntry'
import CashBookTable from './components/CashBookTable'
import { useLocation, useNavigate } from "react-router";
import { Button } from 'react-bootstrap'
import './cashbook.css'
import { useReportsServices } from '../../../services/reports/reports';

const CashBook = () => {

    const [cashBookList, setCashBookList] = useState([])
    const [paramsToReport, setParamsToReport] = useState({
        from_date: (new Date().toISOString().slice(0, 10)),
        to_date: (new Date().toISOString().slice(0, 10)),
    })

    const navigate = useNavigate();
    const location = useLocation();

    const {getCashBook}= useReportsServices()

    useEffect(()=>{
        getData()
    },[])

    const getData = async()=>{
        try{
            const response = await getCashBook(paramsToReport)
            if (response.success){
                setCashBookList(response.data)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    console.log(cashBookList)

    return (
        <div className="item_add">
            <div className="itemList_header row mx-0">
                <div className="page_head ps-4 d-flex justify-content-between">
                    <div>
                        <div className="fw-600 fs-5">Cash Book</div>
                        <div className="page_head_items mb-2 mt-2">
                            <div
                /* onClick={()=>navigate("/stock-reports")}  */ className={`page_head_customer active`}
                            >
                                Details
                            </div>
                            
                            <div
                                onClick={()=>{
                                    navigate("/cashbook-details");
                                }}
                                className={`page_head_item ${location.pathname == "/cashbook-details" && "active"}`}
                            >
                                Details
                            </div>

                        </div>
                    </div>
                    <div className="d-flex px-0 align-items-center customer-add-btn">
                        {/* <div onClick={()=>{navigate("/customer-add");setToEdit(false)}} className="btn btn-primary add-btn px-0">+ &nbsp; Add Customer</div> */}
                    </div>

                    <div className='row col-4 d-flex align-items-center'>
                        <div className='col-6 px-2 '>
                            <button className='top-btn1 py-2'>Filter Account</button>
                        </div>
                        <div className='col-6 px-2'>
                            <button className='top-btn2 py-2 '>Column Settings</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-3">
            <div className="p-2 bg-light rounded-1">
                <CashBookEntry />
                <CashBookTable {...{cashBookList}}/>
            </div>
            </div>
        </div>
    )
}

export default CashBook