import React, { useEffect, useState } from 'react'
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";

const TraidProfitLossTable = (props) => {

    const { profitLossData, params } = props
    const [stockValue, setStockValue] = useState()
    const [value, setValue] = useState(0.0)
    const [newValue, setNewValue] = useState()
    const [openingStockBal, setOpeningStockBal] = useState(0.0)
    const [tableValue, setTableValue] = useState({
        total_income: 0.0,
        total_expense: 0.0,
        diff_amount: 0.0
    })

    useEffect(() => {
        if (newValue?.account_details?.length > 0) {
            const totalIncome = newValue?.account_details.reduce((a, b) => b.account_type == "INCOME" ? a + b.closing_balance : a, 0) + (value > 0 ? value : 0.0)
            const totalExpense = newValue?.account_details.reduce((a, b) => b.account_type == "EXPENSE" ? a + b.closing_balance : a, 0) + (value < 0 ? value : 0.0)
            const diffAmount = totalIncome - totalExpense
            setTableValue(data => ({ ...data, total_income: totalIncome?.toFixed(2), total_expense: totalExpense?.toFixed(2), diff_amount: diffAmount?.toFixed(2) }))
        }
        
    }, [newValue, value, params])
    console.log(tableValue)
    useEffect(() => {
        setOpeningStockBal(profitLossData?.opening_stock)
        if (stockValue == "fifo") {
            setValue(profitLossData?.fifo_closing_value)
        }
        else if (stockValue == "avgCost") {
            setValue(profitLossData?.average_cost_method)
        }
        else {
            setValue(profitLossData?.closing_stock_value)
        }
    }, [stockValue, profitLossData])

    const handleChange = (data) => {
        if (data.target.name == "stock-value") {
            setStockValue(data.target.value)
        }
        if (data.target.name == "btnOk") {
            setNewValue(profitLossData)
        }
    }
    console.log(newValue)
    return (
        <div>
            <div className='bg-black mt-3 d-flex justify-content-between rounded-top border-bottom border-2'>
                <div className='col-8 ms-2 d-flex justify-content-between'>

                    <div className='d-flex align-items-center'>
                        <p className='text-white mt-3'>Opening Stock Balance</p>
                        <p className='bg-white ms-2 px-5 py-1 rounded'>{openingStockBal | 0}</p>
                    </div>
                    <div className='d-flex align-items-center'>
                        <p className='text-white mt-3'>Closing Stock Balance</p>
                        <p className='bg-white ms-2 px-5 py-1 rounded'>{value | 0}</p>
                    </div>

                    <div className='d-flex align-items-center ms-3'>

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

            <div className='row'>
                <div className='col pe-1' style={{ height: '31rem', overflow: 'hidden', overflowY: 'scroll' }}>
                    <table className='table table-striped border border-5 border-dark'>
                        <thead>
                            <tr className='bal-sheet-table-head'>
                                <th>Income</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                            {
                                newValue?.account_details?.length > 0 &&
                                newValue?.account_details?.map((data) => {
                                    return (data?.account_type == "INCOME") && (
                                        <>
                                            <tr>
                                                <td className='text-start '>{data?.account_name}</td>
                                                <td className='text-start'>{newValue?.closing_stock_account_name ==  data?.account_name? value.toFixed(2) : data?.closing_balance.toFixed(2)}</td>

                                            </tr>
                                        </>
                                    )
                                })
                            }
                            <tr>
                                <td className='text-start bg-danger text-white'>LOSS</td>
                                <td className='text-start bg-danger text-white'>{tableValue.diff_amount < 0 ? tableValue.diff_amount : "0.00"}</td>
                            </tr>

                            <tr style={{ position: "sticky", bottom: "0" }}>
                                <td className='bg-primary text-white' colSpan={2}>TOTAL INCOME: {((+tableValue?.total_income) + (+tableValue.diff_amount < 0 ? +tableValue.diff_amount:0.0)).toFixed(2)}</td>
                            </tr>

                        </tbody>

                    </table>
                </div>

                <div className='col ps-1' style={{ height: '31rem', overflow: 'hidden', overflowY: 'scroll' }}>
                    <table className='table table-striped border border-5 border-dark p-2'>
                        <thead>
                            <tr className='bal-sheet-table-head'>
                                <th>Expanse</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                newValue?.account_details?.length > 0 &&
                                newValue?.account_details?.map((data) => {
                                    return (data?.account_type == "EXPENSE") && (
                                        <>
                                            <tr>
                                                <td className='text-start'>{data?.account_name}</td>
                                                <td className='text-start'>{data?.closing_balance.toFixed(2)}</td>

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
                                <td className='bg-primary text-white' colSpan={2}>TOTAL EXPANSE: {+tableValue.total_expense + (tableValue.diff_amount > 0 ? Math.abs(+tableValue?.diff_amount) :0)}</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default TraidProfitLossTable