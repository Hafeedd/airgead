import React, { useEffect, useState } from 'react'
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";
// import { useReportsServices } from '../../../services/reports/reports';

const GroupBalanceTable = (props) => {
    const { groupList } = props
    const [stockValue, setStockValue] = useState()
    const [value, setValue] = useState(0.00)
    const [newValue, setNewValue] = useState()
    const [diffValue, setDiffValue] = useState([])
    // console.log(groupList.ser)
    var total_asset = 0;
    var total_liability = 0;
    console.log(stockValue)

    // const [tableValue, setTableValue] = useState({
    //     total_asset : 0.0,
    //     total_liability: 0.00,
    //     diff_amount: 0.00,
    // })

    // useEffect(()=>{
    //     if(groupList?.account_details?.length>0){
    //         const totalAsset = groupList.ser.account.reduce((a,b)=>b.acc_group === "ASSET" ? a+b.closing_balance:a,0)
    //         const totalLiab = groupList.account_details.reduce((a,b)=>b.acc_group === "LIABILITY" ? a+b.closing_balance:a,0)
    //         setTableValue(data=>({...data,total_asset:totalAsset?.toFixed(2),total_liability:totalLiab?.toFixed(2)}))
    //     }
    // },[groupList])

    useEffect(() => {

        if (stockValue == "fifo") {
            setValue(groupList?.fifo_closing_value)
        }
        else if (stockValue == "avgCost") {
            setValue(groupList?.average_cost_value)
        }
        else {
            setValue(groupList?.closing_stock_value)
        }
    }, [stockValue, groupList])

    const handleChange = (data) => {
        if (data.target.name == "stock-value") {
            setStockValue(data.target.value)
        }
        if (data.target.name == "btnOk") {
            setNewValue(groupList)
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
            <div className='row'>
                <div className='col pe-1' style={{ height: '31rem', overflow: 'hidden', overflowY: 'scroll' }}>
                    <table border={3} className='table table-hover'>
                        <thead>
                            <tr className='bal-sheet-table-head'>
                                <th>Asset</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                newValue?.ser?.length > 0 &&
                                newValue?.ser.map((data) => {

                                    var total_amt = 0;
                                    total_asset = total_asset + total_amt
                                    return (data?.account_type == "ASSET" && data?.account?.length > 0) && (
                                        <>
                                            <tr>
                                                <td style={{ backgroundColor: "lightblue", position: "sticky", top: "36px" }} className='text-start' colSpan={5}>{data?.name}</td>

                                            </tr>
                                            {
                                                data?.account?.map((acc) => {
                                                    total_amt = total_amt + acc?.closing_balance;

                                                    total_asset = total_asset + acc?.closing_balance;
                                                    return (<tr>
                                                        <td className='text-start'>{acc?.name || ''}</td>
                                                        {/* <td className='text-start'>{acc?.closing_balance?.toFixed(2) || 0.0}</td> */}
                                                        <td className='text-start'>{newValue?.closing_stock_account_name == acc?.name ? value.toFixed(2) : acc?.closing_balance?.toFixed(2)}</td>
                                                    </tr>
                                                    )
                                                })

                                            }
                                            <tr>
                                                <td style={{ backgroundColor: "linen" }} className='gp-bal-table-btm' colSpan={2}>Total Amount: {data?.name == "CURRENT ASSET" ? (total_amt + value).toFixed(2) : total_amt.toFixed(2)}</td>
                                            </tr>
                                        </>
                                    )


                                })
                            }
                            <tr>
                                <td colSpan={2} className='bg-danger text-white'>LOSS: {(Math.abs(total_asset + value) - total_liability) < 0 ? (Math.abs(total_asset + value) - total_liability).toFixed(2) : 0.0}</td>
                            </tr>
                            <tr>
                                <td style={{position:"sticky",bottom:"0"}} colSpan={2}>TOTAL ASSET: {newValue?.ser?.length > 0?(total_asset+(Math.abs(total_asset + value) - total_asset)).toFixed(2):"0.00"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='col ps-1' style={{ height: '30rem', overflow: 'hidden', overflowY: 'scroll' }}>
                    <table border={3} className='table table-hover'>
                        <thead>
                            <tr className='bal-sheet-table-head'>
                                <th>Liability</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                newValue?.ser?.length > 0 ?
                                    newValue?.ser.map((data) => {
                                        var total_amt = 0
                                        return (data?.account_type == "LIABILITY" && data?.account?.length > 0) && (
                                            <>
                                                <tr>
                                                    <td style={{ backgroundColor: "lightblue", position: "sticky", top: "36px" }} className='text-start' colSpan={5}>{data?.name}</td>

                                                </tr>
                                                {
                                                    data?.account?.length > 0 ?
                                                        data?.account.map((acc) => {
                                                            console.log("object")
                                                            total_amt = total_amt + acc?.closing_balance
                                                            total_liability = total_liability + acc?.closing_balance
                                                            return (
                                                                <tr>
                                                                    <td className='text-start'>{acc?.name || ''}</td>
                                                                    <td className='text-start'>{acc?.closing_balance.toFixed(2) || 0.0}</td>
                                                                </tr>
                                                            )
                                                        }) :
                                                        console.log("")
                                                }
                                                <tr>
                                                    <td style={{ backgroundColor: "linen" }} colSpan={2}>Total Amount: {total_amt.toFixed(2)}</td>
                                                </tr>



                                            </>
                                        )
                                    }) :
                                    console.log("no data")



                            }
                            <tr>
                                <td className='bg-success text-white' colSpan={2}>Profit : {newValue?.ser?.length > 0? ((Math.abs(total_asset + value) - total_liability) > 0 ? (Math.abs(total_asset + value) - total_liability).toFixed(2) : 0.0):"0.00"}</td>
                            </tr>
                            <tr>
                                <td style={{position:"sticky",bottom:"0"}} colSpan={2}>TOTAL LIABILITY: {newValue?.ser?.length > 0?(total_liability+(Math.abs(total_asset + value) - total_liability)).toFixed(2):"0.00"}</td>
                            </tr>

                        </tbody>

                    </table>
                </div>
             
            </div>

        </>
    )
}

export default GroupBalanceTable