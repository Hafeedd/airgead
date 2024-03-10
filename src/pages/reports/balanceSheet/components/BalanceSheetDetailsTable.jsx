import React, { useEffect, useState } from 'react'
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";

const BalanceSheetDetailsTable = (props) => {
    const { details } = props
    const [stockValue, setStockValue] = useState()
    const [value, setValue] = useState(0.00)
    const [newValue, setNewValue] = useState()
   

    // const [totalDebit, setTotalDebit] = useState()
    var totalDebit = 0.0
    var totalCredit = 0.0

    useEffect(() => {

        if (stockValue == "fifo") {
            setValue(details?.fifo_closing_value)
        }
        else if (stockValue == "avgCost") {
            setValue(details?.average_cost_value)
        }
        else {
            setValue(details?.closing_stock_value)
        }
    }, [stockValue, details,newValue])

    const handleChange = (data) => {
        if (data.target.name == "stock-value") {
            setStockValue(data.target.value)
        }
        if (data.target.name == "btnOk") {
            setNewValue(details)
        }
    }
    return (
        <>
            <div className='bg-black mt-3 d-flex justify-content-between rounded-top border-bottom border-2'>
                <div className='col-7 ms-2 d-flex justify-content-between'>

                    <div className='d-flex align-items-center'>
                        <p className='text-white mt-3'>Closing Stock Balance</p>
                        <p className='bg-white ms-2 px-5 py-1 rounded'>{value | 0}</p>
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

                    <div className='d-flex align-items-center ps-5'>
                        <button name='btnOk' onClick={handleChange} className='px-4 py-1 rounded'>Ok</button>
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
            <div style={{ height: '31rem', overflow: 'hidden', overflowY: 'scroll' }}>
                <table className='table'>
                    <thead>
                        <tr className='bal-sheet-table-head'>
                            <th>A/c Code</th>
                            <th>A/c Name</th>
                            <th>Debit</th>
                            <th>Credit</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {
                            newValue?.ser?.length > 0 &&
                            newValue?.ser.map((data) => {
                                console.log("halllo")
                                var total_debit = 0;
                                var total_credit = 0;
                                totalDebit = totalDebit + parseInt(data?.account?.reduce((a, b) => b.closing_balance > 0 ? a + b.closing_balance : a + 0, 0).toFixed(2))
                                totalCredit = totalCredit + parseInt(data?.account?.reduce((a, b) => b.closing_balance < 0 ? a + b.closing_balance : a + 0, 0).toFixed(2))
                                return (data?.account?.length > 0) && (
                                    <>
                                        <tr>
                                            <td style={{ backgroundColor: "lightblue", boxShadow: "0px 0px 5px black" }} className='text-start ' colSpan={4}>{data?.name}</td>

                                        </tr>
                                        {
                                            data?.account?.map((acc) => {
                                                total_debit = total_debit + (acc?.closing_balance > 0 ? acc?.closing_balance.toFixed(2) : 0.0)
                                                total_credit = total_credit + (acc?.closing_balance < 0 ? acc?.closing_balance.toFixed(2) : 0.0)
                                                return (
                                                    <tr>
                                                        <td className='text-start'>{acc?.code || ''}</td>
                                                        <td className='text-start'>{acc?.name || ''}</td>
                                                        <td className='text-start'>{newValue?.closing_stock_account_name == acc?.name ? value >0? value.toFixed(2):"" : acc?.closing_balance > 0 ? acc?.closing_balance.toFixed(2) : ""}</td>
                                                        <td className='text-start'>{newValue?.closing_stock_account_name == acc?.name ? value <0? value.toFixed(2):"" :acc?.closing_balance < 0 ? acc?.closing_balance.toFixed(2) : ""}</td>

                                                    </tr>
                                                )
                                            }

                                            )
                                        }
                                        <tr className='bal-sht-table-group-total'>
                                            <td colSpan={2}></td>
                                            <td className='text-start'>Total Debit: {(+(data?.account?.reduce((a, b) => b.closing_balance > 0 ? a + b.closing_balance : a + 0, 0))+(data?.name == "CURRENT ASSET"? value >0? value : 0.0 :0.0)).toFixed(2)}</td>
                                            <td className='text-start'>Total Credit: {(+data?.account?.reduce((a, b) => b.closing_balance < 0 ? a + b.closing_balance : a + 0, 0)+(data?.name == "CURRENT ASSET"? value <0? value : 0.0 :0.0)).toFixed(2)}</td>
                                        </tr>
                                        <tr><td className='p-1 m-0' colSpan={4}></td></tr>

                                    </>

                                )
                            })
                        }
                        <tr>
                            <td className='bg-dark text-white text-start' colSpan={4}>
                                {newValue ?((totalDebit+ (value >0? value:0)) - (Math.abs(totalCredit) + (value <0? value:0))) > 0 ? "PROFIT " + ((totalDebit+ (value >0? value:0)) - (Math.abs(totalCredit) + (value <0? value:0))).toFixed(2) : "LOSS " + ((totalDebit+ (value >0? value:0)) - (Math.abs(totalCredit) + (value <0? value:0))).toFixed(2) :"0.00"}
                            </td>
                        </tr>
                        <tr className='bal-sht-table-btm'>
                            <td colSpan={2}></td>
                            <td className='text-start'>All A/c Total Debit: {newValue?(totalDebit+ (value >0? value:0)).toFixed(2):"0.00"}</td>
                            <td className='text-start'>All A/c Total Credit: {newValue?(Math.abs(totalCredit) + (value <0? value:0)).toFixed(2):"0.00"}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default BalanceSheetDetailsTable