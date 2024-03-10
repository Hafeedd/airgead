import React, { useEffect, useState } from 'react'
import './balanceSheet.css'
import BalanceSheetEntry from './components/BalanceSheetEntry'
import BalanceSheetTables from './components/BalanceSheetTables'
import { useReportsServices } from '../../../services/reports/reports'
import GroupBalanceTable from './components/GroupBalanceTable'
import BalanceSheetDetailsTable from './components/BalanceSheetDetailsTable'
import dropdown from 'semantic-ui-dropdown'



const BalanceSheet = () => {

    const { getBalanceSheet,getGroupBalanceSheet } = useReportsServices()
    const [dropDown, setDropDown] = useState('normal')
    const [balanceSheetData, setBalanceSheetData] = useState([])

    const [params, setParams] = useState([{
        "to_date": new Date()?.toISOString()?.slice(0, 10)
    }])

    useEffect(() => {
        getData()
    }, [params,dropDown,])

    const getData = async () => {
        try {
            const date = {
                [dropDown==="normal"?'to_date':'date']: params?.to_date?.split('-')?.reverse()?.join('-') || new Date()?.toISOString()?.slice(0, 10).split('-')?.reverse()?.join('-')
            }
            let response

            if (dropDown === "normal")
                response = await getBalanceSheet(date)
            else if (dropDown === "group"|| dropDown === "detail")
                response = await getGroupBalanceSheet(date)
            // else if (dropDown === "details")
            //     response = await getBalanceSheet(date)
            if (response.success) {
                setBalanceSheetData(response.data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="item_add">
            <div className="itemList_header row mx-0">
                <div className="page_head ps-4 d-flex justify-content-between">
                    <div>
                        <div className="fw-600 fs-5">{`${dropDown==="group"?'Group':dropDown==="detail"?"Detail":''} Balance Sheet`}</div>
                        <div className="page_head_items mb-2 mt-2">
                            <div
                /* onClick={()=>navigate("/stock-reports")}  */ className={`page_head_customer active`}
                            >
                               {`${dropDown==="group"?'Group':dropDown==="detail"?"Detail":''} Balance Sheet`}
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
                    <BalanceSheetEntry {...{ params, setParams, dropDown, setDropDown }} />
                    {dropDown === "normal" ?
                        <BalanceSheetTables {...{ balanceSheetData }} />
                        : dropDown === "group" ?
                            <GroupBalanceTable groupList={balanceSheetData} />
                            : dropDown === "detail" &&
                            <BalanceSheetDetailsTable details={balanceSheetData} />
                    }
                </div>
            </div>
        </div>
    )
}

export default BalanceSheet