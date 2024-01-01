import React, { useEffect, useState } from 'react'
import CashBookEntry from './components/CashBookEntry'
import CashBookTable from './components/CashBookTable'
import { useLocation, useNavigate } from "react-router";
import { Button } from 'react-bootstrap'
import './cashbook.css'
import { useReportsServices } from '../../../services/reports/reports';
import ConsolidateCashbookTable from './components/ConsolidateCashbookTable';

const CashBook = () => {

    const [cashBookList, setCashBookList] = useState([])
    const [consolidateList, setConsolidateList] = useState([])
    const [params, setParams] = useState({
        from_date: (new Date().toISOString().slice(0, 10)),
        to_date: (new Date().toISOString().slice(0, 10)),
    })

    const navigate = useNavigate();
    const location = useLocation();

    const { getCashBook, getConsolidateCashbook } = useReportsServices()

    useEffect(() => {
        getData()
    }, [params])

    const getData = async () => {
        try {
            const response = await getCashBook(params)
            if (response.success) {
                setCashBookList(response.data)
            }
            const response1 = await getConsolidateCashbook(params) 
            if(response1.success){
              setConsolidateList(response1.data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    // console.log(cashBookList)
    // console.log(consolidateList);

    return (
      <div className="item_add">
        <div className="itemList_header row mx-0">
          <div className="page_head ps-4 d-flex justify-content-between">
            <div>
              <div className="fw-600 fs-5">
                {location.pathname == "/consolidate-cashbook" && "active"
                  ? "Consolidate"
                  : "Cash Book"}
              </div>
              <div className="page_head_items mb-2 mt-2">
                <div
                  onClick={() => {
                    navigate("/cashbook-report");
                  }}
                  className={`page_head_item ${
                    location.pathname === "/cashbook-report" && "active"
                  }`}
                >
                  Cash Book
                </div>
                <div
                  onClick={() => {
                    navigate("/consolidate-cashbook");
                  }}
                  className={`page_head_item ms-3 ${
                    location.pathname === "/consolidate-cashbook" && "active"
                  }`}
                >
                  Consolidate
                </div>
              </div>
            </div>
            <div className="d-flex px-0 align-items-center customer-add-btn">
              {/* <div onClick={()=>{navigate("/customer-add");setToEdit(false)}} className="btn btn-primary add-btn px-0">+ &nbsp; Add Customer</div> */}
            </div>

            <div className="row col-4 me-5 d-flex align-items-center">
              <div className="col-6 px-2 ">
                <button className="top-btn1 py-2">Filter Account</button>
              </div>
              <div className="col-6 px-2">
                <button className="top-btn2 py-2 ">Column Settings</button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 m-3 bg-light rounded-1">
          {location.pathname === "/consolidate-cashbook" && "active" ? (
            <>
              <CashBookEntry {...{ params, setParams }} />
              <ConsolidateCashbookTable {...{consolidateList, params}}/>
            </>
          ) : (
            <>
              <CashBookEntry {...{ params, setParams }} />
              <CashBookTable {...{ cashBookList, params }} />
            </>
          )}
        </div>
      </div>
    );
}

export default CashBook