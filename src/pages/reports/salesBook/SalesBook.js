import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router";
import { useReportsServices } from '../../../services/reports/reports';
import SalesBookList from './components/SalesBookEntry';
import SalesBookEntry from './components/SalesBookEntry';
import SalesBookTable from './components/SalesBookTable';
import SalesRegisterTable from './components/SalesRegisterTable';

const SalesBook = () => {
    const [salesBookList, setSalesBookList] = useState([])
    const [saleRegisterList, setSaleRegisterList] = useState([])
    const [show, setShow] = useState(false)
    const [colshow, setColShow] = useState(false)
    const [paramsToReport, setParamsToReport] = useState({
        from_date: (new Date().toISOString().slice(0, 10)),
        to_date: (new Date().toISOString().slice(0, 10)),
        salesman: null,
        billtype: null,
        customer: null,
        care_off: null
    })

    const navigate = useNavigate();
    const location = useLocation();

    const { getSalesBook, getSaleRegister } = useReportsServices()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const response = await getSalesBook(paramsToReport)
            if (response.success) {
                setSalesBookList(response.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    console.log(salesBookList)

    useEffect(()=>{
        getSalesRegisterData()
    }, [])

    const getSalesRegisterData = async ()=>{
        try{
            const response = await getSaleRegister(paramsToReport)
            if (response.sucess){
                setSaleRegisterList(response.data)
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
                        <div className="fs-5 py-2">{location.pathname == "/sale-register" && "active" ? "Sale Register" : "Sales Book"}</div>
                        <div className="page_head_items">
                            <div
                                onClick={() => {
                                    navigate("/sales-book");
                                }}
                                className={`page_head_item ${location.pathname == "/sales-book" && "active"
                                    }`}
                            >
                                Sales Book
                            </div>
                            <div
                                onClick={() => {
                                    navigate("/sale-register");
                                }}
                                className={`page_head_item ${location.pathname == "/sale-register" && "active"
                                    }`}
                            >
                                Sale Register
                            </div>

                        </div>
                    </div>

                    <div className='d-flex align-items-center h-100 me-2'>
                        <div className="p-2 me-2 choose-acc-btn rounded-2 text-light cursor" onClick={() => setShow(true)}>Filter Account</div>
                        <div className="p-2 choose-acc-btn rounded-2 text-light cursor " onClick={() => setColShow(true)}>Column Settings</div>
                    </div>
                </div>
            </div>
            <div className="p-3 mt-3">
                <div className="p-2 bg-light rounded-1">
                    {location.pathname == "/sale-register" && "active" ?
                        <>
                            <SalesBookEntry />
                            <SalesRegisterTable {...{
                                saleRegisterList
                            }} />
                        </> :
                        <><SalesBookEntry {...{
                            paramsToReport, setParamsToReport
                        }}
                        />
                            <SalesBookTable {...{
                                salesBookList
                            }} /></>}

                    <div className="row mt-3">
                        <div className="w-100 d-flex justify-content-end mb-3">
                            <div className="btn btn-dark col-1 col-2 py-0 me-2">Exit</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SalesBook