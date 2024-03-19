import React, { useEffect, useState } from 'react'
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";

const BalanceSheetTables = (props) => {
    const { balanceSheetData } = props
    const [stockValue, setStockValue] = useState()

    const [value, setValue] = useState(0.00)
    var total_bal = 0;
    var countAsset = 0;
    const [newValue, setNewValue] = useState()
    const [tableValue, setTableValue] = useState({
        total_asset: 0.0,
        total_liability: 0.00,
        diff_amount: 0.00,
    })

    useEffect(() => {
        if (newValue?.account_details?.length > 0) {
            const totalAsset = newValue.account_details.reduce((a, b) => b.acc_group === "ASSET" ? a + b.closing_balance : a, 0) + (value > 0 ? value : 0.0)
            const totalLiab = newValue.account_details.reduce((a, b) => b.acc_group === "LIABILITY" ? a + b.closing_balance : a, 0) + (value < 0 ? value : 0.0)
            const diffAmount = totalAsset - totalLiab
            setTableValue(data => ({ ...data, total_asset: totalAsset?.toFixed(2), total_liability: totalLiab?.toFixed(2), diff_amount: diffAmount.toFixed(2) }))
        }
    }, [newValue])

    useEffect(() => {

        if (stockValue == "fifo") {
            setValue(balanceSheetData?.fifo)
            // console.log(balanceSheetData?.fifo.toFixed(2),"data")
        }
        else if (stockValue == "avgCost") {
            setValue(balanceSheetData?.average_cost_method)
        }
        else {
            setValue(balanceSheetData?.closing_stock_value)
        }

    }, [stockValue, balanceSheetData, tableValue])

    const handleChange = (data) => {
        if (data.target.name == "stock-value") {
            setStockValue(data.target.value)
        }
        if (data.target.name == "btnOk") {
            setNewValue(balanceSheetData)
        }

    }

    console.log(tableValue?.total_asset)

    return (
        <>
            <div className='bg-black mt-3 d-flex justify-content-between rounded-top border-bottom border-2'>
                <div className='col-7 ms-2 d-flex justify-content-between'>

                    <div className='d-flex align-items-center'>
                        <p className='text-white mt-3'>Stock Value Balance</p>
                        <p className='bg-white ms-2 px-5 py-1 rounded'>{value | 0.00}</p>
                    </div>

                    <div className='d-flex align-items-center '>
                        <p className='text-white pt-3 me-3'>stock value type </p>
                        <select value={stockValue} onChange={handleChange} className='py-1' name="stock-value" id="">
                            {/* <option value=""></option> */}
                            <option value="lastCost">Last Purchase cost</option>
                            <option value="fifo">FIFO</option>
                            <option value="avgCost">Average cost</option>
                        </select>
                    </div>

                    <div className='d-flex align-items-center'>
                        <button name='btnOk' onClick={handleChange} className='px-3 py-1 rounded'>ok</button>
                    </div>
                </div>
                <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
                    <div className="col-1 me-2">
                        <GrRefresh className="bg-light m-1 p-1 rounded-1" size={20} />
                    </div>
                    <div className="item_seach_bar_cont rounded-2 col-11 col-10">
                        <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
                        <input
                            className="item_search_bar rounded-2 border-0 py-1"
                            placeholder="Search"
                            type="text"
                        />
                    </div>
                </div>

            </div>
            <div className='d-flex'>
                <div className='w-100' style={{ height: '31rem', overflow: 'hidden', overflowY: 'scroll' }}>

                    <table className='table table-striped border border-5 border-dark'>
                        <thead>
                            <tr className='bal-sheet-table-head '>
                                {/* <th>Sn</th> */}
                                <th>Assets</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                newValue?.account_details?.length > 0 && 
                                newValue?.account_details?.map((data)=>{
                                    console.log(value)

                                    return(
                                        <>
                                        <tr className='bg-asset-color'>
                                            <td className=''></td>
                                            <td className=''>{value > 0 ? value.toFixed(2) : "0.00"}</td>
                                        </tr>
                                        </>
                                    )

                                }
                                    
                                )

                            } */}

                            {
                                newValue?.account_details?.length > 0 &&
                                newValue?.account_details?.map((data, i) => {
                                    // total_bal = total_bal + data?.closing_balance

                                    countAsset = countAsset + 1
                                    return data?.acc_group == "ASSET" && (
                                        <>
                                            <tr className='bg-asset-color'>
                                                {/* <td>{countAsset}</td> */}
                                                <td>{data?.account_name}</td>
                                                {/* <td>{ data?.closing_balance.toFixed(2)}</td> */}
                                                <td>{newValue?.closing_stock_account_name == data?.account_name? value.toFixed(2) : data?.closing_balance.toFixed(2)}</td>

                                            </tr>
                                        </>
                                    )
                                },
                                )
                            }

                            <tr>
                                <td className='text-start bg-danger text-white'>LOSS</td>
                                <td className='text-start bg-danger text-white'>{tableValue.diff_amount < 0 ? tableValue.diff_amount : "0.00"}</td>
                            </tr>

                            {/* <tr>
                                <td className='bg-danger text-white' colSpan={2}>LOSS:{tableValue.total_asset - tableValue.total_liability}</td>
                            </tr> */}
                            <tr style={{ position: "sticky", bottom: "0" }}>
                                <td className='bg-primary text-white' colSpan={2}>TOTAL ASSET: {(+tableValue.total_asset - (+tableValue.diff_amount < 0 ? +tableValue.diff_amount:0.0)).toFixed(2)}</td>
                            </tr>


                        </tbody>
                    </table>
                </div>

                <div className='w-100' style={{ height: '31rem', overflow: 'hidden', overflowY: 'scroll' }}>


                    <table className='table table-striped border border-5 border-dark '>
                        <thead>
                            <tr className='bal-sheet-table-head mb-1'>
                                {/* <th>Sn</th> */}
                                <th>Liability</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                         
                            {
                                newValue?.account_details?.length > 0 &&
                                newValue?.account_details?.map((data, i) => {
                                    return data?.acc_group == "LIABILITY" && (
                                        <>
                                            <tr className='bg-liability-color'>
                                                <td>{data.account_name}</td>
                                                <td>{data.closing_balance.toFixed(2)}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                            <tr>
                                <td className='text-start bg-success text-white'>PROFIT</td>
                                <td className='text-start bg-success text-white'>{tableValue.diff_amount > 0 ? tableValue.diff_amount : "0.00"}</td>
                            </tr>

                            <tr style={{ position: "sticky", bottom: "0" }}>
                                <td className='bg-primary text-white' colSpan={2}>TOTAL LIABILITY: {(+tableValue.total_liability - (+tableValue.diff_amount > 0 ? +tableValue.diff_amount:0.0)).toFixed(2)}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

        </>

    )
}

export default BalanceSheetTables